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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {students.map((student) => {
        const itemsPayable = student.items.length > 0;
        return (
          <div
            key={student.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Student Info */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={student.image || `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=702DFF&color=fff&size=128&bold=true`}
                alt={student.firstName}
                width={72}
                height={72}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="px-2">
                <h3 className="font-semibold text-gray-900 underline text-xl">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-gray-600 text-sm">
                  {student.class?.name || "Not Assigned"}
                </p>
              </div>
            </div>

            {itemsPayable && (
              <div>
                <div className="space-y-4 mb-6 border-t border-gray-200 px-4 py-4">
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


                <button
                  onClick={() => onPayNow(student)}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors mb-3"
                >
                  Pay Now ({formatCurrency(student.totalOutstanding ?? 0)})
                </button>
              </div>
            )}

          </div>
        )
      })}
    </div>
  );
}
