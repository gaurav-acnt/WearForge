import { useEffect, useState } from "react";
import api from "../utils/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-600 text-sm sm:text-base">
          Loading orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <p className="text-gray-600 text-sm sm:text-base">
          No orders found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          My Orders
        </h2>

        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                
                <p className="font-semibold text-sm sm:text-base">
                  Status:{" "}
                  <span
                    className={`capitalize px-2 py-1 rounded text-xs sm:text-sm font-medium ${
                      o.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : o.status === "failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </p>

                <p className="text-sm sm:text-base font-medium">
                  ₹{o.totalPrice}
                </p>
              </div>

              {o.status === "failed" && (
                <p className="text-red-500 text-sm mt-3">
                  Payment failed. Please retry.
                </p>
              )}

              {o.status === "paid" && (
                <p className="text-green-600 text-sm mt-3">
                  Payment successful ✅
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;