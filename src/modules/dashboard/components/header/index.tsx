import React from "react";
import { HeaderSkeleton } from "../skeleton-loader/skeleton-loader";

interface HeaderProps {
  studentCount: number;
  totalOutstanding: number;
  currentTermStatus: number;
  isLoading: boolean;
}

export default function Header({
  studentCount,
  totalOutstanding,
  currentTermStatus,
  isLoading,
}: HeaderProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const percentagePaid =
    studentCount > 0 ? Math.round((currentTermStatus / studentCount) * 100) : 0;

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-3xl p-8 text-white">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Section: Student Count and Add Button */}
        <div className="flex items-end gap-6">
          <div>
            <p className="text-lg font-semibold opacity-90">MY STUDENTS</p>
            <p className="text-6xl font-bold mt-2">{studentCount}</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-900 transition-colors">
            Add Students
            <span className="text-xl">+</span>
          </button>
        </div>

        {/* Right Section: Metrics */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Total Outstanding Card */}
          <div className="bg-white/95 text-gray-700 rounded-2xl p-6 min-w-80 backdrop-blur-sm">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Total Outstanding Balance
                </p>
                <p className="text-3xl font-bold text-red-500 mt-2">
                  {formatCurrency(totalOutstanding)}
                </p>
                <button className="mt-4 border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Pay Now
                </button>
              </>
            )}
          </div>

          {/* Current Term Fee Status Card */}
          <div className="bg-white/95 text-gray-700 rounded-2xl p-6 min-w-80 backdrop-blur-sm">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Current Term Fee Status
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ₦0 <span className="text-xl">({percentagePaid}%)</span>
                </p>
                <button className="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors cursor-not-allowed opacity-70">
                  Pay Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
