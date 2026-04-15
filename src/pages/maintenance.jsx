// src/pages/MaintenancePage.jsx
import React from "react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          😕 Oops! This Offer Has Ended
        </h1>
        <p className="text-gray-600 mb-6">
          This offer is no longer available.
          <br />
          It expired on:
        </p>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-lg font-semibold text-red-600">
            15th March, 2026
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Stay tuned for more exciting offers coming your way! ✨
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;