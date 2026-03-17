import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Your cart is empty
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Go to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Your Cart
        </h1>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="bg-white border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              <div>
                <p className="font-semibold text-base sm:text-lg">
                  {item.name}
                </p>

                <p className="text-sm text-gray-600">
                  Design ID: {item.designId}
                </p>

                <p className="font-semibold mt-1">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    navigate(`/editor/${item.productId}`)
                  }
                  className="w-full sm:w-auto px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    removeFromCart(item.productId)
                  }
                  className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white mt-6 p-4 sm:p-5 rounded-lg shadow-sm">
          
          <div className="flex justify-between font-semibold text-base sm:text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            
            <button
              onClick={clearCart}
              className="w-full sm:w-auto border px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Clear Cart
            </button>

            <button
              onClick={() =>
                navigate(`/checkout/${cart[0].productId}`)
              }
              className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;