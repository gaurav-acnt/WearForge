import { useEffect, useState } from "react";
import api from "../../utils/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [creating, setCreating] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const createProduct = async () => {
    if (!name || !basePrice || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("basePrice", Number(basePrice));
    formData.append("image", image);
    formData.append(
      "printArea",
      JSON.stringify({
        x: 120,
        y: 140,
        width: 260,
        height: 300,
      })
    );

    try {
      setCreating(true);

      const { data } = await api.post("/products", formData);
      setProducts((prev) => [data.product, ...prev]);

      setName("");
      setBasePrice("");
      setImage(null);

      alert("Product created");
    } catch (err) {
      console.error("Create product failed:", err);
      alert(err.response?.data?.message || "Create failed");
    } finally {
      setCreating(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Admin Products
        </h1>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6">
          <h2 className="font-semibold text-lg mb-4">
            Add New Product
          </h2>

          <div className="grid gap-3">
            <input
              placeholder="Product Name"
              className="border p-3 rounded w-full focus:ring-2 focus:ring-black outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Base Price"
              type="number"
              className="border p-3 rounded w-full focus:ring-2 focus:ring-black outline-none"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button
              onClick={createProduct}
              disabled={creating}
              className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              {creating ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>

        {products.length === 0 && (
          <p className="text-gray-600 text-center">
            No products found.
          </p>
        )}

        <div className="grid gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-sm"
            >

              <div>
                <p className="font-semibold text-base sm:text-lg">
                  {p.name}
                </p>
                <p className="text-gray-600">₹{p.basePrice}</p>
              </div>

              <button
                onClick={() => deleteProduct(p._id)}
                className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;
