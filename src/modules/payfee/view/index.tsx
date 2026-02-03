"use client";

import { useState } from "react";

import {
  useGetTransactionStatusQuery,
  useMakePaymentMutation,
  useMakePaymentWithRedirectMutation,
} from "@/redux/api/parents";
import { useGetParentDashboardQuery } from "@/redux/api/parents";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCountdown } from "@/hooks/use-countdown-timer";
import { useDVAStorage } from "@/hooks/use-dva-storage";
import { DVAPaymentContent } from "../components/dva-payment-modal";
import { BankIcon, CardIcon } from "@/icons";
import { StudentSkeletonGrid } from "../loader";

export default function PayFeesView() {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "transfer">(
    "card",
  );
  const [expandedMethod, setExpandedMethod] = useState<
    "card" | "transfer" | null
  >("card");

  const { dvaDetails, isLoading, saveDVA, clearDVA } = useDVAStorage();
  const { data: transactionStatus } = useGetTransactionStatusQuery(
    {
      reference: dvaDetails?.transaction_reference || "",
    },
    {
      skip: !dvaDetails?.transaction_reference,
      pollingInterval: 3000,
    },
  );


  const countdownState = useCountdown(dvaDetails?.expires_at || "", () => {
    clearDVA();
  });

  const currentUser = useSelector(
    (state: RootState) => state.authState.currentUser,
  );
  const { data, isLoading: isParentDashboardLoading } =
    useGetParentDashboardQuery();
  const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();
  const [makePaymentWithRedirect, { isLoading: isPayingWithRedirect }] =
    useMakePaymentWithRedirectMutation();

  // http://localhost:3000/pay-fees?reference=TRX-BATCH-1770140907276-29479
  const isPayable =
    (data?.data?.students ?? [])
      .flatMap(student => student.items ?? [])
      .length > 0;

  const totalPayableAmount = data?.data?.students.reduce((acc, student) => {
    return acc + student.totalOutstanding;
  }, 0);

  const handlePayment = async () => {
    if (!data?.data) return;

    try {
      if (expandedMethod === "card") {
        const response = await makePaymentWithRedirect({
          studentIds: (data?.data?.students ?? [])
            .filter(student => (student.items?.length ?? 0) > 0)
            .map(student => student.id),
          paymentItemIds: data?.data?.students
            .flatMap((student) => student.items)
            .map((item) => item.paymentItemId),
          callbackUrl: `${window.location.origin}/pay-fees`,
        }).unwrap();
        window.location.href = response?.data?.paymentUrl;
        console.log(response, "card");
      } else {
        const response = await makePayment({
          studentIds: data?.data?.students.map((student) => student.id) || [],
          paymentItemIds: data?.data?.students
            .flatMap((student) => student.items)
            .map((item) => item.paymentItemId),
          email: String(currentUser?.email),
          duration: 1,
        }).unwrap();
        saveDVA(response?.data?.dva || null);
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };


  const transferContent = dvaDetails ? (
    <div className="border-t border-gray-200 bg-gray-50 p-6 animate-in">
      <DVAPaymentContent
        dvaDetails={dvaDetails}
        isExpired={countdownState.isExpired}
        isModal={false}
      />
    </div>
  ) : (
    <div className="border-t border-gray-200 bg-gray-50 p-6 animate-in">
      <p className="text-gray-600 text-center py-4 mb-4">
        Generate a Virtual Account to proceed with the transfer payment.
      </p>
      <div className="text-center">
        <button
          onClick={handlePayment}
          disabled={isPaying}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isPaying ? "Processing..." : "Generate Virtual Account"}
        </button>
      </div>
    </div>
  );

  const GenerateAccountContent = (
    <div className="border-t border-gray-200 bg-gray-50 p-6 animate-in">
      <p className="text-gray-600 text-center py-4 mb-4">
        Generate a Virtual Account to proceed with the transfer payment.
      </p>
      <div className="text-center">
        <button
          onClick={handlePayment}
          disabled={isPaying}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isPaying ? "Processing..." : "Generate Virtual Account"}
        </button>
      </div>
    </div>
  );

  if (isParentDashboardLoading) {
    return <StudentSkeletonGrid />
  }


  if (!isPayable) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 font-bold text-lg text-center">You do not have any outstanding payment</p>
      </div>
    );
  }

  return (
    <div className=" mt-6">
      {isParentDashboardLoading ? (
        <StudentSkeletonGrid />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {data?.data?.students?.map((student) => {
            const itemsPayable = student.items.length > 0;
            if (!itemsPayable) return null;
            return (
              <div
                key={student.id}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <p className="font-bold border-b pb-2 mb-2">
                  {student.firstName} {student.lastName}
                </p>

                <div className="text-gray-600 mb-4">
                  {student.items?.map((item, idx) => (
                    <div className="flex justify-between" key={idx}>
                      <span>{item.name}:</span>
                      <span>₦{item.amount?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <p className="text-green-600 font-bold text-sm">
                  Total: ₦{student.totalOutstanding.toLocaleString()}
                </p>
              </div>
            )
          })}
        </div>
      )}

      <div className="">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#555555] mb-4 font-sans">
            Pay Now with one of the below Payment Method
          </h2>

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
                {`Pay With Card`}
              </span>
            </button>

            {expandedMethod === "card" && (
              <div className="border-t border-gray-200 bg-gray-50 p-6 animate-in">
                <p className="text-gray-600 text-center py-4">
                  <div className="text-center">
                    <button
                      onClick={handlePayment}
                      disabled={isPayingWithRedirect}
                      className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {isPayingWithRedirect ? "Processing..." : `Make Payment ₦${totalPayableAmount?.toLocaleString()}`}
                    </button>
                  </div>
                </p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {/* Bank Transfer Option */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  setSelectedMethod("transfer");
                  setExpandedMethod(
                    expandedMethod === "transfer" ? null : "transfer",
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

              {expandedMethod === "transfer" &&
                (dvaDetails ? transferContent : GenerateAccountContent)}
            </div>
          </div>
        </div>

        {/* <PaymentSummaryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </div>
    </div>
  );
}
