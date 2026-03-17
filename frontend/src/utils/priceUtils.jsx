export const calculateDesignArea = (canvasJSON) => {
  if (!canvasJSON || !canvasJSON.objects) return 0;

  let totalArea = 0;

  canvasJSON.objects.forEach((obj) => {
   
    if (obj.name === "printArea") return;

    const width = (obj.width || 0) * (obj.scaleX || 1);
    const height = (obj.height || 0) * (obj.scaleY || 1);

    totalArea += width * height;
  });

  return totalArea;
};

export const calculatePrice = ({ basePrice, designArea, hasImage }) => {
  let price = basePrice;

  price += designArea * 0.002;

  if (hasImage) {
    price += 50;
  }

  return Math.round(price);
};
