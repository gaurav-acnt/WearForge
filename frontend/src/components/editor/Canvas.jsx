import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { fabric } from "fabric";
import api from "../../utils/axios";
import {
  calculatePrice,
  calculateDesignArea,
} from "../../utils/priceUtils";
import createPrintArea from "./PrintArea";

const Canvas = forwardRef(
  ({ product, setFinalPrice, navigate, activeSide }, ref) => {
    const fabricCanvas = useRef(null);
    const hasImage = useRef(false);
    const isDrawing = useRef(false);

    const undoStack = useRef([]);
    const redoStack = useRef([]);

    const designs = useRef({
      front: null,
      back: null,
    });

    const prevSide = useRef("front");

    useEffect(() => {
      if (!product || fabricCanvas.current) return;

      const canvas = new fabric.Canvas("editor-canvas", {
        width: 500,
        height: 600,
        preserveObjectStacking: true,
      });

      fabricCanvas.current = canvas;

      fabric.Image.fromURL(
        product.baseImage,
        (img) => {
          img.scaleToWidth(500);
          img.selectable = false;
          img.evented = false;
          canvas.setBackgroundImage(
            img,
            canvas.renderAll.bind(canvas)
          );
        },
        { crossOrigin: "anonymous" }
      );

      const printArea = createPrintArea(product.printArea);
      canvas.add(printArea);
      canvas.printArea = printArea;

      canvas.on("object:added", handleCanvasChange);
      canvas.on("object:modified", handleCanvasChange);
      canvas.on("object:removed", handleCanvasChange);

      saveState();

      return () => {
        canvas.dispose();
        fabricCanvas.current = null;
      };
    }, [product]);

    useEffect(() => {
      const canvas = fabricCanvas.current;
      if (!canvas) return;

      designs.current[prevSide.current] = JSON.stringify(canvas.toJSON());

      canvas.getObjects().forEach((obj) => {
        if (obj.name !== "printArea") canvas.remove(obj);
      });

      const nextState = designs.current[activeSide];

      if (nextState) {
        canvas.loadFromJSON(nextState, () => {
          canvas.renderAll();
          updatePrice();
        });
      } else {
        saveState();
        updatePrice();
      }

      prevSide.current = activeSide;
    }, [activeSide]);

    const saveState = () => {
      const canvas = fabricCanvas.current;
      if (!canvas) return;
      undoStack.current.push(JSON.stringify(canvas.toJSON()));
      redoStack.current = [];
    };

    const handleCanvasChange = (e) => {
      if (e?.target?.name === "printArea") return;
      saveState();
      updatePrice();
    };


    const calculateDesignAreaForSide = (side) => {
      const state = designs.current[side];
      if (!state) return 0;
      return calculateDesignArea(JSON.parse(state));
    };

    const updatePrice = () => {
      const totalDesignArea =
        calculateDesignAreaForSide("front") +
        calculateDesignAreaForSide("back");

      const price = calculatePrice({
        basePrice: product.basePrice,
        designArea: totalDesignArea,
        hasImage: hasImage.current,
      });

      setFinalPrice(price);
    };


    const undo = () => {
      const canvas = fabricCanvas.current;
      if (!canvas || undoStack.current.length <= 1) return;

      const current = undoStack.current.pop();
      redoStack.current.push(current);

      canvas.loadFromJSON(
        undoStack.current[undoStack.current.length - 1],
        () => {
          canvas.renderAll();
          updatePrice();
        }
      );
    };

    const redo = () => {
      const canvas = fabricCanvas.current;
      if (!canvas || redoStack.current.length === 0) return;

      const next = redoStack.current.pop();
      undoStack.current.push(next);

      canvas.loadFromJSON(next, () => {
        canvas.renderAll();
        updatePrice();
      });
    };


    const enableDrawing = () => {
      const canvas = fabricCanvas.current;
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = "#000000";
      isDrawing.current = true;
    };

    const disableDrawing = () => {
      const canvas = fabricCanvas.current;
      canvas.isDrawingMode = false;
      isDrawing.current = false;
    };

    const deleteSelected = () => {
      const canvas = fabricCanvas.current;
      const obj = canvas.getActiveObject();
      if (!obj || obj.name === "printArea") return;
      canvas.remove(obj);
      canvas.renderAll();
    };

    const bringForward = () => {
      const canvas = fabricCanvas.current;
      const obj = canvas.getActiveObject();
      if (obj) canvas.bringForward(obj);
    };

    const sendBackward = () => {
      const canvas = fabricCanvas.current;
      const obj = canvas.getActiveObject();
      if (obj && obj.name !== "printArea")
        canvas.sendBackwards(obj);
    };


    useImperativeHandle(ref, () => ({
      addText() {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        const text = new fabric.IText("Your Text", {
          left: 100,
          top: 100,
          fontSize: 24,
          fill: "#000000",
        });

        
        text.set({
          textBaseline: "top"
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
      },

      addImage(file) {
        hasImage.current = true;
        const reader = new FileReader();
        reader.onload = () => {
          fabric.Image.fromURL(reader.result, (img) => {
            img.scaleToWidth(150);
            img.set({
              cornerStyle: "circle",
              cornerColor: "black",
              transparentCorners: false,
            });
            fabricCanvas.current.add(img);
            fabricCanvas.current.setActiveObject(img);
          });
        };
        reader.readAsDataURL(file);
      },

      undo,
      redo,
      enableDrawing,
      disableDrawing,
      deleteSelected,
      bringForward,
      sendBackward,

      async saveDesign() {
        const canvas = fabricCanvas.current;
        designs.current[activeSide] = JSON.stringify(canvas.toJSON());

        const blob = await (await fetch(canvas.toDataURL())).blob();
        const formData = new FormData();
        formData.append("previewImage", blob);
        formData.append("designJSON", JSON.stringify(designs.current));
        formData.append("productId", product._id);

        const { data } = await api.post("/designs", formData);

        const cartItem = {
          productId: product._id,
          name: product.name,
          price: calculatePrice({
            basePrice: product.basePrice,
            designArea:
              calculateDesignAreaForSide("front") +
              calculateDesignAreaForSide("back"),
            hasImage: hasImage.current,
          }),
          designId: data.designId,
          updatedAt: Date.now(),
        };

        const cart =
          JSON.parse(localStorage.getItem("cart")) || [];
        const newCart = [
          ...cart.filter(
            (i) => i.productId !== product._id
          ),
          cartItem,
        ];

        localStorage.setItem("cart", JSON.stringify(newCart));
        navigate("/cart");
      },
    }));

    return <canvas id="editor-canvas" />;
  }
);

export default Canvas;
