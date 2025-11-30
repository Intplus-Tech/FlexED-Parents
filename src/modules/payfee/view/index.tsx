"use client";

import { useState, useEffect } from "react";
import { mockPaymentSummary, mockBankDetails } from "@/lib/mock-data";
import Link from "next/link";
import { BackIcon, BankIcon, CardIcon } from "@/icons";
import PayFeeLoader from "../loader";
import PaymentSummaryModal from "../components/pay-summary";

export default function PayFeesView() {
  const [selectedMethod, setSelectedMethod] = useState<"transfer" | "card">(
    "transfer"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMethod, setExpandedMethod] = useState<
    "transfer" | "card" | null
  >("transfer");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PayFeeLoader />;
  }

  return (
    <div className="">
      <div className="mb-8 flex items-center space-x-3">
        <h1 className="text-3xl font-bold text-gray-900">Payment Summary</h1>
      </div>

      {/* Payment Summary Cards */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-4 mb-6">
          <div className="flex items-center justify-center text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-purple-500  underline  font-medium text-sm text-center"
            >
              View Details
            </button>
          </div>

          {mockPaymentSummary.Chiamaka.map((payment, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sm text-gray-600 mb-1">{payment.name}</p>
              <p className="font-bold text-[#6E6B97]">{payment.amount}</p>
            </div>
          ))}

          {mockPaymentSummary.other.map((payment, idx) => (
            <div key={`other-${idx}`} className="text-center">
              <p className="text-sm text-gray-600 mb-1">{payment.name}</p>
              <p className="font-bold text-[#6E6B97]">{payment.amount}</p>
            </div>
          ))}

          <div className="">
            <div className="flex flex-col justify-between items-center">
              <span className="text-gray-700">Total Payable</span>
              <span className="text-2xl font-bold text-red-600">
                {mockPaymentSummary.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Pay Now with one of the below Payment Method
        </h2>

        <div className="space-y-4">
          {/* Bank Transfer Option */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => {
                setSelectedMethod("transfer");
                setExpandedMethod(
                  expandedMethod === "transfer" ? null : "transfer"
                );
              }}
              className="w-full p-6 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                checked={selectedMethod === "transfer"}
                onChange={() => setSelectedMethod("transfer")}
                className="w-5 h-5 accent-purple-600"
              />
              <BankIcon className="w-6 h-6 text-gray-600" />
              <span className="text-lg font-medium text-gray-900">
                Pay With Transfer
              </span>
            </button>

            {/* Expandable Details */}
            {expandedMethod === "transfer" && (
              <div className="border-t border-gray-200  p-6 space-y-6 animate-in">
                <div className=" flex gap-4">
                  <p className="text-sm text-gray-600 mb-2">Account Name:</p>
                  <p className="font-semibold text-gray-900">
                    {mockBankDetails.accountName}
                  </p>
                </div>
                <div className=" flex gap-4">
                  <p className="text-sm text-gray-600 mb-2">Bank Name:</p>
                  <p className="font-semibold text-gray-900">
                    {mockBankDetails.bankName}
                  </p>
                </div>
                <div className=" flex gap-4">
                  <p className="text-sm text-gray-600 mb-2">Account Number:</p>
                  <p className="font-semibold text-gray-900">
                    {mockBankDetails.accountNumber}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card Payment Option */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => {
                setSelectedMethod("card");
                setExpandedMethod(expandedMethod === "card" ? null : "card");
              }}
              className="w-full p-6 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                checked={selectedMethod === "card"}
                onChange={() => setSelectedMethod("card")}
                className="w-5 h-5 accent-purple-600"
              />
              <CardIcon className="w-6 h-6 text-gray-600" />
              <span className="text-lg font-medium text-gray-900">
                Pay With Card
              </span>
            </button>

            {expandedMethod === "card" && (
              <div className="border-t border-gray-200 bg-gray-50 p-6 animate-in">
                <p className="text-gray-600 text-center py-4">
                  Card payment gateway will be integrated here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <PaymentSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
