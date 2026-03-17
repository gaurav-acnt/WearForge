import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="w-full border-b bg-white">
      
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link to="/" className="text-lg sm:text-xl font-bold">
          WearForge
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>

          {user && (
            <Link to="/orders" className="hover:underline">
              My Orders
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          )}

          {user && (
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="border px-3 py-1 rounded hover:bg-black hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t">
          
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>

          {user && (
            <Link to="/orders" onClick={() => setMenuOpen(false)}>
              My Orders
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}

          {user && (
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="border px-3 py-2 rounded text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-black text-white px-3 py-2 rounded text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border px-3 py-2 rounded hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
