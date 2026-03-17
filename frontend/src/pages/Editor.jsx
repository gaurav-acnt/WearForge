import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";

import Canvas from "../components/editor/Canvas";
import Toolbar from "../components/editor/Toolbar";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const canvasRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [activeSide, setActiveSide] = useState("front");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);

        if (!isMounted) return;

        setProduct(data.product);
        setFinalPrice(Number(data.product.basePrice) || 0);
      } catch (err) {
        console.error("Failed to load product", err);
        alert("Failed to load product");
        navigate("/");
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const addText = () => canvasRef.current?.addText();
  const uploadImage = (file) => canvasRef.current?.addImage(file);
  const undo = () => canvasRef.current?.undo();
  const redo = () => canvasRef.current?.redo();
  const saveDesign = () => canvasRef.current?.saveDesign();

  const enableDrawing = () => canvasRef.current?.enableDrawing();
  const disableDrawing = () => canvasRef.current?.disableDrawing();
  const deleteSelected = () => canvasRef.current?.deleteSelected();
  const bringForward = () => canvasRef.current?.bringForward();
  const sendBackward = () => canvasRef.current?.sendBackward();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <div className="bg-white shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-semibold">
          {product.name}
        </h2>
        <p className="text-sm sm:text-base font-medium">
          ₹{finalPrice}
        </p>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        
        <div className="bg-white border-b lg:border-b-0 lg:border-r p-3 sm:p-4 lg:w-72 sticky top-0 z-10">
          <Toolbar
            addText={addText}
            uploadImage={uploadImage}
            undo={undo}
            redo={redo}
            saveDesign={saveDesign}
            finalPrice={finalPrice}
            activeSide={activeSide}
            setActiveSide={setActiveSide}
            enableDrawing={enableDrawing}
            disableDrawing={disableDrawing}
            deleteSelected={deleteSelected}
            bringForward={bringForward}
            sendBackward={sendBackward}
          />
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-3 sm:p-4">
            <Canvas
              ref={canvasRef}
              product={product}
              setFinalPrice={setFinalPrice}
              navigate={navigate}
              activeSide={activeSide}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Editor;