import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <Link
            to="/admin/products"
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Manage Products
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Add, edit, and delete products
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Manage Orders
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              View and update customer orders
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;