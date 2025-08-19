import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-hackathon-lightblue/40 px-4 py-24">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-6 text-hackathon-blue">404</h1>
        <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
          Oops! The page you were looking for doesn’t exist or has moved.
        </p>
        <a href="/" className="inline-block bg-hackathon-pink text-white px-6 py-3 rounded-full text-sm md:text-base font-medium hover:bg-hackathon-blue transition-colors duration-300">
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
