import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      
      
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 bg-gray-100">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Design Your Own Clothes
        </h1>

        <p className="text-gray-600 max-w-md sm:max-w-xl text-sm sm:text-base mb-6 sm:mb-8">
          Create custom T-shirts, hoodies, and more with live preview.
          Upload images, add text, and order your personalized clothing.
        </p>

   
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          
          <Link
            to="/products"
            className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition duration-200"
          >
            Start Designing
          </Link>

          {!user && (
            <Link
              to="/register"
              className="w-full sm:w-auto border border-black px-6 py-3 rounded hover:bg-black hover:text-white transition duration-200"
            >
              Create Account
            </Link>
          )}
        </div>
      </section>

      
    
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        
        <div className="border p-5 sm:p-6 rounded text-center hover:shadow-md transition">
          <h3 className="font-semibold text-base sm:text-lg mb-2">
            Live Customization
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Design your clothes in real-time with text and image tools.
          </p>
        </div>

        <div className="border p-5 sm:p-6 rounded text-center hover:shadow-md transition">
          <h3 className="font-semibold text-base sm:text-lg mb-2">
            Print-Safe Designs
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Designs are restricted to printable areas for perfect results.
          </p>
        </div>

        <div className="border p-5 sm:p-6 rounded text-center hover:shadow-md transition">
          <h3 className="font-semibold text-base sm:text-lg mb-2">
            Easy Ordering
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Save your design and place orders in just a few clicks.
          </p>
        </div>
      </section>

     
    
      <section className="bg-black text-white text-center px-4 sm:px-6 py-12 sm:py-16">
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready to Create Something Unique?
        </h2>

        <Link
          to="/products"
          className="inline-block mt-4 bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition duration-200"
        >
          Customize Now
        </Link>
      </section>
    </div>
  );
};

export default Home;