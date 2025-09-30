// src/pages/MaintenancePage.jsx
import React from "react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🚧 Under Maintenance
        </h1>
        <p className="text-gray-600 mb-6">
          Our services are currently undergoing scheduled maintenance.
          <br />
          We’ll be back online by:
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <p className="text-lg font-semibold text-purple-700">
            1st October, 3:00 PM
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Thank you for your patience and understanding. 🙏
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
