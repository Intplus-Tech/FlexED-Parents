"use client";

import { StudentDashboard } from "@/@types/parents";
import Image from "next/image";
import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  student: StudentDashboard | null;
  onClose: () => void;
}

export default function PaymentModal({
  isOpen,
  student,
  onClose,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !student) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const feeBreakdown = [
    { description: "Tuition Fee", amount: student.totalOutstanding * 0.6 },
    {
      description: "Administrative Fee",
      amount: student.totalOutstanding * 0.25,
    },
    { description: "Exam Fee", amount: student.totalOutstanding * 0.15 },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // alert(`Payment processed successfully for ${student.name}`);
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-linear-to-r from-purple-600 to-purple-500 text-white p-6 flex items-center justify-between border-b border-purple-400">
            <div>
              <h2 className="text-xl font-bold">Payment Details</h2>
              <p className="text-purple-100 text-sm">
                {student.firstName} {student.lastName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl font-bold hover:bg-purple-400 w-8 h-8 flex items-center justify-center rounded transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Student Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <Image
                src={"/placeholder.svg"}
                alt={student.firstName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {student?.firstName} {student?.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {student.class?.name || "Not Assigned"}
                </p>
              </div>
            </div>

            {/* Balance Summary */}
            <div className="bg-purple-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Term Fee</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(student.totalOutstanding)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(0)}
                </span>
              </div>
              <div className="border-t border-purple-200 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Balance Due</span>
                <span className="font-bold text-red-500 text-lg">
                  {formatCurrency(0)}
                </span>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Fee Breakdown
              </h3>
              <div className="space-y-2">
                {feeBreakdown.map((fee, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{fee.description}</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(fee.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Payment Method
              </h3>
              <div className="space-y-2">
                {["Bank Transfer", "Debit Card", "Mobile Money"].map(
                  (method, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        defaultChecked={index === 0}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700 font-medium">
                        {method}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-100 space-y-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay ${formatCurrency(student.totalOutstanding)}`
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
