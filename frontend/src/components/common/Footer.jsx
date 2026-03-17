import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
        
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            WearForge
          </h2>
          <p className="text-sm text-gray-400">
            Design your own custom clothing with ease.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-white transition">
                Orders
              </Link>
            </li>
            
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            Contact
          </h3>
          <p className="text-sm text-gray-400">
            Email: support@customwear.com
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Phone: +91 00000 00
          </p>
        </div>

      </div>


      <div className="border-t border-gray-700 text-center py-4 text-xs sm:text-sm text-gray-400 px-4">
        © {new Date().getFullYear()} WearForge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;