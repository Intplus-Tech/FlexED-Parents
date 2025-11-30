import React from "react";

const DashbaordLoader = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-lg w-32 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-lg w-48 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-28" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-24" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashbaordLoader;
