import React from "react";
import { PaymentTableSkeleton } from "../skeleton-loader/skeleton-loader";
import { TransactionRow } from "@/@types/parents";
import { Receipt } from "lucide-react";

type PaymentStatus = "PAID" | "FAILED" | "PENDING";

interface StatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = "inline-block px-3 py-1 rounded-full font-medium";

  const normalizedStatus = status?.toUpperCase() as PaymentStatus | undefined;

  const variantClasses =
    normalizedStatus === "PAID"
      ? "bg-green-100 text-green-800"
      : normalizedStatus === "FAILED"
        ? "bg-red-100 text-red-800"
        : normalizedStatus === "PENDING"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-700";

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {normalizedStatus ?? status}
    </span>
  );
};

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative inline-block group ">
      {children}
      <div
        className="  pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white
                   opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-150 whitespace-nowrap z-20"
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
};

interface PaymentTableProps {
  payments: TransactionRow[];
  isLoading: boolean;
}

export default function PaymentTable({
  payments,
  isLoading,
}: PaymentTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return <PaymentTableSkeleton />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Payments</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {[
                  "Time/Date",
                  "Transaction ID",
                  "Student Name",
                  "Class",
                  "Amount Paid",
                  "% Remaining",
                  "Status",
                ]?.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Receipt className="w-8 h-8 text-gray-300" />
                      <p className="text-gray-500 font-medium">No payments yet</p>
                      <p className="text-gray-400 text-sm">
                        Your payment history will show up here once you make a payment
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment?.paymentItemId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {new Date(payment?.time).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-[100px]">
                      <Tooltip content={payment?.transactionId}>
                        <span className="block max-w-[100px] truncate cursor-pointer">
                          {payment?.transactionId}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                      {payment?.studentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment?.className}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {formatCurrency(payment.amountPaid)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment?.percentRemaining}%
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={payment?.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
