import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) =>
      setProducts(res.data.products)
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200"
            >

              <div className="w-full h-52 sm:h-56 overflow-hidden">
                <img
                  src={p.baseImage}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-1">
                  {p.name}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  ₹{p.basePrice}
                </p>

                <Link
                  to={`/editor/${p._id}`}
                  className="block text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                  Customize
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Products;