import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Animated Illustration */}
      <div className="text-center w-[90%]">
        <h1 className="text-9xl font-bold animate-bounce">404</h1>
        <p className="mt-4 text-xl md:text-2xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-200">
          You might have the wrong address or the page may have moved.
        </p>
      </div>

      {/* Image or Illustration */}

      {/* Back to Home Button */}
      <button
        onClick={handleBackToHome}
        className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-md shadow-lg hover:bg-gray-100 hover:shadow-xl transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
