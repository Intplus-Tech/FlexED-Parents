"use client";

export function HeaderSkeleton() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-3xl p-8 text-white">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Section: Student Count Skeleton */}
        <div className="flex items-end gap-6">
          <div>
            <div className="h-5 bg-white/20 rounded w-24 mb-3 animate-pulse"></div>
            <div className="h-16 bg-white/20 rounded w-20 animate-pulse"></div>
          </div>
          <div className="h-10 bg-white/20 rounded-full w-32 animate-pulse"></div>
        </div>

        {/* Right Section: Metrics Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Total Outstanding Card Skeleton */}
          <div className="bg-white/95 text-gray-700 rounded-2xl p-6 min-w-80 backdrop-blur-sm">
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
            </div>
          </div>

          {/* Current Term Fee Status Card Skeleton */}
          <div className="bg-white/95 text-gray-700 rounded-2xl p-6 min-w-80 backdrop-blur-sm">
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          {/* Avatar and Info Skeleton */}
          <div className="flex items-center gap-4 mb-6 animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          {/* Fee Information Skeleton */}
          <div className="space-y-4 mb-6 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="animate-pulse">
            <div className="w-full h-11 bg-gray-200 rounded-xl mb-3"></div>
            <div className="w-full h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PaymentTableSkeleton() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 text-left">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                </th>
                {Array(7)
                  .fill(null)
                  .map((_, i) => (
                    <th key={i} className="px-6 py-4 text-left">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-6 py-4">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    {Array(7)
                      .fill(null)
                      .map((_, i) => (
                        <td key={i} className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
