import React from "react";

const DashbaordMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-6">
        <p className="text-sm text-gray-600 mb-2">My Students</p>
        <p className="text-3xl font-normal ">
          <span className="text-green-500">3</span>{" "}
          <span className="text-2xl">Students</span>
        </p>
      </div>

      <div className="bg-white flex  items-center justify-between border border-gray-200 rounded-lg px-3 py-6">
        <div>
          <p className=" text-gray-600 mb-2">Total Outstanding Balance</p>
          <p className="text-3xl  text-red-600">4750000</p>
        </div>

        <button className=" text-purple-500 px-2 lg:px-4 py-2 border border-purple-600 hover:bg-purple-700  hover:text-white  text-sm transition-colors">
          Pay Now
        </button>
      </div>

      <div className="bg-white flex  items-center justify-between border border-gray-200 rounded-lg px-3 py-3">
        <div>
          <p className="text-sm text-gray-600 mb-2">Current Term Fee Status</p>
          <p className="text-3xl font-normal">0(100%)</p>
        </div>

        <button className=" px-2 lg:px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700  text-sm font-medium transition-colors cursor-not-allowed">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default DashbaordMetrics;
