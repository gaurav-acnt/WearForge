const calculatePrice = ({ basePrice, designArea, hasImage }) => {
  let price = basePrice;

  if (designArea > 30000) price += 100;
  if (hasImage) price += 50;

  return price;
};

module.exports = calculatePrice;
