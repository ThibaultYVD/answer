import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShield } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white p-4 w-full sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Answer</span>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              to="/rgpd" 
              className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-300"
            >
              <FiShield className="text-lg" />
              <span>RGPD</span>
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;