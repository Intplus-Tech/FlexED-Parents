"use client";

import React from "react";
import { StudentCardsSkeleton } from "../skeleton-loader/skeleton-loader";
import { Student } from "@/@types/dashboard";

interface StudentCardsProps {
  students: Student[];
  onPayNow: (student: Student) => void;
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
            <img
              src={student.avatar || "/placeholder.svg"}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 underline text-lg">
                {student.name}
              </h3>
              <p className="text-gray-600 text-sm">{student.class}</p>
            </div>
          </div>

          {/* Fee Information */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Term Fee</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(student.termFee)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Amount Paid</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(student.amountPaid)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onPayNow(student)}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors mb-3"
          >
            Pay Now ({formatCurrency(student.balanceDue)})
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
