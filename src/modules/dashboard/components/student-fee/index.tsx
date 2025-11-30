import { Users } from "lucide-react";
import Image from "next/image";

interface StudentFee {
  studentId: string;
  studentName: string;
  class: string;
  totalTermFee: string;
  amountPaid: string;
  balanceRemaining: string;
  dueDate: string;
  status: "paid" | "pending";
  image?: string;
}

interface StudentFeesProps {
  fees: StudentFee[];
}

export function StudentFees({ fees }: StudentFeesProps) {
  return (
    <div className="space-y-4">
      {fees.map((fee) => {
        const isPaid = fee.status === "paid";
        const balanceAmount = fee.balanceRemaining.replace(/[^\d]/g, "");
        const isFullyPaid = balanceAmount === "0";

        return (
          <div
            key={fee.studentId}
            className="bg-white border border-gray-200 rounded-lg px-3 py-6 transition-shadow 2xl:text-xl!"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Left: Avatar and Name */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 shrink-0">
                <img
                  src={
                    fee.image ||
                    "/placeholder.svg?height=56&width=56&query=student avatar"
                  }
                  alt={fee.studentName}
                  className="w-14 h-14 rounded-full"
                />
                <p className="font-semibold text-[#474747] text-base">
                  {fee.studentName}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Users className="w-5 h-5 text-[#474747]" />
                <span className="text-sm 2xl:text-xl!  text-gray-900">
                  {fee.class}
                </span>
              </div>

              <div className="hidden lg:block text-right shrink-0">
                <p className=" text-[#474747]">Due Date</p>
                <p className="  2xl:text-xl! text-red-600">{fee.dueDate}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center justify-between gap-12 md:gap-16 flex-6 text-sm">
                <div className="flex flex-col lg:flex-row gap-2">
                  <p className=" text-[#474747] 2xl:text-xl!">Total Term Fee</p>
                  <p className=" text-[#474747] 2xl:text-xl!">
                    {fee.totalTermFee}
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <p className=" text-gray-500 2xl:text-xl!">Amount Paid</p>
                  <p className=" text-green-600 2xl:text-xl!">
                    {fee.amountPaid}
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <p className=" text-gray-500 2xl:text-xl!">
                    Balance Remaining
                  </p>
                  <p
                    className={`font-semibold 2xl:text-xl! ${
                      isFullyPaid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {fee.balanceRemaining}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-end">
                <button
                  className={`font-semibold 2xl:text-xl!  py-3 px-10 rounded-lg transition-colors text-sm whitespace-nowrap shrink-0 ${
                    isFullyPaid
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                  disabled={isFullyPaid}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
