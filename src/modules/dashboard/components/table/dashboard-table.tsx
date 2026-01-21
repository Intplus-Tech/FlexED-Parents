import React from "react";
import { PaymentTableSkeleton } from "../skeleton-loader/skeleton-loader";
import { Payment } from "@/@types/dashboard";

interface PaymentTableProps {
  payments: Payment[];
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Last Payment</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Time / Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Amount Paid
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  % Remaining
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {payment.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment.transactionId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {payment.studentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment.class}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {formatCurrency(payment.amountPaid)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment.percentageRemaining}%
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-medium ${
                          payment.status === "Successful"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "Failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
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
