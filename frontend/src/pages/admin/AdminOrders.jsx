import { useEffect, useState } from "react";
import api from "../../utils/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        alert("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          All Orders (Admin)
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-600 text-center">
            No orders found.
          </p>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm flex flex-col md:flex-row gap-4"
            >
              <div className="flex justify-center md:justify-start">
                {order.designId?.previewImage ? (
                  <img
                    src={order.designId.previewImage}
                    alt="Design Preview"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover border rounded"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center border text-sm rounded">
                    No Preview
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm sm:text-base">
                  <strong>Order ID:</strong> {order._id}
                </p>

                <p className="text-sm sm:text-base">
                  <strong>User:</strong>{" "}
                  {order.userId?.email || "N/A"}
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Product:</strong>{" "}
                  {order.productId?.name || "N/A"}
                </p>

                <p className="text-sm sm:text-base font-medium">
                  <strong>Total:</strong> ₹{order.totalPrice}
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`capitalize px-2 py-1 rounded text-xs sm:text-sm font-medium ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="mt-3 w-full sm:w-auto border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminOrders;
