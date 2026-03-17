import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] transition duration-200 flex flex-col">
      
      <div className="w-full h-44 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={product.baseImage}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col grow">
        
        <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm sm:text-base mb-3">
          ₹{product.basePrice}
        </p>

        <Link
          to={`/editor/${product._id}`}
          className="mt-auto w-full text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Customize
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
