import { fabric } from "fabric";

const createPrintArea = (area, canvasWidth, canvasHeight) => {
  const printArea = new fabric.Rect({
    left: area.x * canvasWidth,
    top: area.y * canvasHeight,
    width: area.width * canvasWidth,
    height: area.height * canvasHeight,
    fill: "transparent",
    stroke: "red",
    strokeDashArray: [5, 5],
    selectable: false,
    evented: false,
  });

  printArea.name = "printArea";

  return printArea;
};

export default createPrintArea;
