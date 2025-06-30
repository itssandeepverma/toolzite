import React from "react";
import { FaTools, FaClock, FaRocket } from "react-icons/fa";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8" style={{ marginTop: "110px" }}>
        <div className="text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
              <FaTools className="text-white text-5xl" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            We're working hard to bring you something amazing
          </p>

          {/* Description */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-gray-400 text-lg leading-relaxed">
              Our team is currently developing this feature with cutting-edge technology. 
              Stay tuned for updates and be among the first to experience what we're building.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center p-6 rounded-lg bg-gray-800 bg-opacity-50">
              <FaRocket className="text-green-400 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400">Cutting-edge features powered by the latest AI technology</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-800 bg-opacity-50">
              <FaClock className="text-blue-400 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Progress</h3>
              <p className="text-gray-400">We're making steady progress towards launch</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-800 bg-opacity-50">
              <FaTools className="text-purple-400 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-400">Ensuring the highest quality before release</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Go Back
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-gray-500 text-sm">
            <p>Have questions? Contact us at support@toolzite.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
