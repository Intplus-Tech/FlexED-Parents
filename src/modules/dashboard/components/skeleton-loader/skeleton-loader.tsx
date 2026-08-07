"use client";

import { LogoLoader } from "@/components/ui/logo-loader";

export function HeaderSkeleton() {
  return (
    <div className="bg-linear-to-br from-[#702DFF] to-[#5A1FE0] rounded-3xl px-6 py-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="h-6 bg-white/20 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded w-64 animate-pulse"></div>
        </div>
        <div className="h-11 bg-white/20 rounded-xl w-48 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white/10 border border-white/15 rounded-2xl p-5 h-24 flex items-center justify-center"
          >
            <LogoLoader size={36} />
          </div>
        ))}
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
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[220px]"
        >
          <LogoLoader size={48} />
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
              <tr>
                <td colSpan={7} className="px-6 py-12">
                  <div className="flex justify-center">
                    <LogoLoader size={48} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
