"use client";

import { StudentCardsSkeleton } from "../skeleton-loader/skeleton-loader";
import { StudentDashboard } from "@/@types/parents";
import Image from "next/image";

interface StudentCardsProps {
  students: StudentDashboard[];
  onPayNow: (student: StudentDashboard) => void;
  isLoading: boolean;
}

export default function StudentCards({
  students,
  onPayNow,
  isLoading,
}: StudentCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return <StudentCardsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          {/* Student Info */}
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={"/placeholder.svg"}
              alt={student.firstName}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 underline text-lg">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-gray-600 text-sm">
                {student.class?.name || "Not Assigned"}
              </p>
            </div>
          </div>

          {/* Fee Information */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Term Fee</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(student.totalOutstanding ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Amount Paid</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(0)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onPayNow(student)}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors mb-3"
          >
            Pay Now ({formatCurrency(student.totalOutstanding ?? 0)})
          </button>

          {/* View Details Link */}
          <button className="w-full text-purple-600 font-medium hover:text-purple-700 transition-colors">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
