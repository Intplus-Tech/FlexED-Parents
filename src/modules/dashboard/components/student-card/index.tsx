"use client";

import { StudentCardsSkeleton } from "../skeleton-loader/skeleton-loader";
import { StudentDashboard } from "@/@types/parents";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

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

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
        <p className="text-gray-500">No students linked to your account yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {students.map((student) => {
        const totalFee = student.items.reduce((sum, item) => sum + item.amount, 0);
        const totalPaid = student.items.reduce((sum, item) => sum + item.paidSoFar, 0);
        const paidPercent = totalFee > 0 ? Math.round((totalPaid / totalFee) * 100) : 100;
        const hasOutstandingFees = student.items.length > 0 && student.totalOutstanding > 0;

        return (
          <div
            key={student.id}
            className="flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Student Info */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={student.image || `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=702DFF&color=fff&size=128&bold=true`}
                alt={student.firstName}
                width={72}
                height={72}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-100"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg truncate">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-gray-500 text-sm">
                  {student.class?.name || "Not Assigned"}
                </p>
              </div>
            </div>

            {hasOutstandingFees ? (
              <div className="flex flex-col flex-1">
                <div className="space-y-3 border-t border-gray-100 pt-4 mb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-gray-500 text-xs font-medium">Amount Paid</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(totalPaid)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs font-medium">Outstanding Balance</p>
                      <p className="text-lg font-bold text-red-500">
                        {formatCurrency(student.totalOutstanding ?? 0)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full transition-all"
                        style={{ width: `${Math.min(paidPercent, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      {paidPercent}% of term fee paid
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onPayNow(student)}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors mt-auto"
                >
                  Pay Now ({formatCurrency(student.totalOutstanding ?? 0)})
                </button>
              </div>
            ) : (
              <div className="flex flex-1 items-center gap-2 border-t border-gray-100 pt-4 text-green-600">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="text-sm font-semibold">All fees settled for this term</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
