import React from "react";
import { HeaderSkeleton } from "../skeleton-loader/skeleton-loader";
import { useRouter } from "next/navigation";

interface HeaderProps {
  studentCount: number;
  totalOutstanding: number;
  currentTermStatus: string;
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

  const router = useRouter();

console.log(currentTermStatus,"currentTermStatus");

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <div className="bg-linear-to-r from-[#702DFF] to-[#702DFF] rounded-3xl px-4  xl:px-6  py-8 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-4  items-start lg:items-center justify-between gap-8">
        {/* Left Section: Student Count and Add Button */}
        <div className="space-y-3 col-span-1">
            <p className="text-lg opacity-90">MY STUDENTS</p>
            <p className="text-xl md:text-4xl font-bold mt-2">{studentCount}</p>
            <p className="bg-black w-fit whitespace-nowrap text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-900 transition-colors">Add Student  <span className=" ml-8 text-xl h-5 w-5 flex items-center justify-center bg-white rounded-full text-black">+</span></p>
        </div>

        {/* Right Section: Metrics */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Total Outstanding Card */}
          <div className="bg-white/95 text-gray-700 rounded-2xl p-6 min-w-60 backdrop-blur-sm">
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
                {totalOutstanding>0 &&<button onClick={() => router.push("/pay-fees")} className="mt-4 border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Pay Now
                </button>}
              </>
            )}
          </div>

          {/* Current Term Fee Status Card */}
          <div className="bg-white/95 text-gray-700 rounded-2xl p-6 min-w-60 backdrop-blur-sm">
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
                  <span className="text-xl uppercase">{currentTermStatus}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
