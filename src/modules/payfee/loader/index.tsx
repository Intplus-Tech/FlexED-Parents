import React from "react";

const PayFeeLoader = () => {
  return (
    <div className="">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-lg w-40 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-lg w-56 animate-pulse" />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-6 bg-gray-200 rounded w-32" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-6 bg-gray-200 rounded w-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayFeeLoader;
