import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import paymentApi from "../utils/paymentApi";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const hasStartedPayment = useRef(false);

  const handlePayment = async () => {
    if (hasStartedPayment.current) return;
    hasStartedPayment.current = true;

    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        alert("Cart is empty");
        navigate("/cart");
        return;
      }

      const totalPrice = cart.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );

      const { data } = await paymentApi.post("/api/payment/create-order", {
        productId,
        totalPrice,
      });

      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        alert("Failed to load Razorpay SDK");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "WearForge",
        description: "Custom Clothing Order",
        order_id: data.razorpayOrderId,

        handler: async (response) => {
          try {
            await paymentApi.post("/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment successful 🎉");
            localStorage.removeItem("cart");
            navigate("/orders");
          } catch (err) {
            alert("Payment verification failed");
            navigate("/orders");
          }
        },

        modal: {
          ondismiss: async () => {
            await paymentApi.post("/api/payment/failed", {
              razorpay_order_id: data.razorpayOrderId,
              reason: "User closed payment window",
            });

            navigate("/orders");
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", async (response) => {
        await paymentApi.post("/api/payment/failed", {
          razorpay_order_id: response.error.metadata.order_id,
          reason: response.error.reason,
        });

        alert("Payment failed");
        navigate("/orders");
      });

      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
      navigate("/orders");
    }
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gray-100">
      
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center w-full max-w-sm sm:max-w-md">
        
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Redirecting to payment...
        </h2>

        <p className="text-gray-600 text-sm sm:text-base">
          Please wait while we connect you to the secure payment gateway.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
