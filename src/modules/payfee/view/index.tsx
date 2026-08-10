"use client";

import { useState, useEffect } from "react";
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
import { PaymentErrorModal } from "../components/payment-error-modal";
import { StudentSkeletonGrid } from "../loader";
import { CheckCircle2, Circle, User, Receipt, ShieldCheck } from "lucide-react";
import { showsuccess } from "@/utils/toast";

// Flat service fee shown to the parent for transparency — never sent to the
// backend, which computes the real chargeable amount from the selected items.
const SERVICE_FEE = 500;

export default function PayFeesView() {
  const [expandedMethod] = useState<"card" | "transfer" | null>("card");
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [paymentError, setPaymentError] = useState<unknown>(null);

  const { dvaDetails, saveDVA, clearDVA } = useDVAStorage();

  // Polling for bank transfer status
  useGetTransactionStatusQuery(
    { reference: dvaDetails?.transaction_reference || "" },
    { skip: !dvaDetails?.transaction_reference, pollingInterval: 3000 },
  );

  const countdownState = useCountdown(dvaDetails?.expires_at || "", () =>
    clearDVA(),
  );
  const currentUser = useSelector(
    (state: RootState) => state.authState.currentUser,
  );

  const { data, isLoading: isParentDashboardLoading } =
    useGetParentDashboardQuery();
  const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();
  const [makePaymentWithRedirect, { isLoading: isPayingWithRedirect }] =
    useMakePaymentWithRedirectMutation();

  const students = data?.data?.students ?? [];
  const isPayable =
    students.flatMap((student) => student.items ?? []).length > 0;

  useEffect(() => {
    if (students.length > 0 && !isInitialized) {
      const allIds = students.flatMap((s) =>
        s.items.map((i) => `${s.id}_${i.paymentItemId}`),
      );
      setSelectedItemIds(allIds);
      setIsInitialized(true);
    }
  }, [students, isInitialized]);

  const toggleItem = (itemId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const toggleStudent = (itemIds: string[]) => {
    const allSelected = itemIds.every((id) => selectedItemIds.includes(id));
    if (allSelected) {
      setSelectedItemIds((prev) => prev.filter((id) => !itemIds.includes(id)));
    } else {
      const toAdd = itemIds.filter((id) => !selectedItemIds.includes(id));
      setSelectedItemIds((prev) => [...prev, ...toAdd]);
    }
  };

  const totalPayableAmount = students.reduce((acc, student) => {
    const sum = student.items.reduce(
      (itemSum, item) =>
        selectedItemIds.includes(`${student.id}_${item.paymentItemId}`)
          ? itemSum + item.amount
          : itemSum,
      0,
    );
    return acc + sum;
  }, 0);

  const totalWithServiceFee = totalPayableAmount + SERVICE_FEE;

  const isAnySelected = selectedItemIds.length > 0;

  const handlePayment = async () => {
    if (!data?.data || !isAnySelected) return;

    try {
      // One entry per (student, paymentItem) pair — a student paying for 3
      // items appears 3 times, once per item.
      const paymentPairs = selectedItemIds.map((id) => {
        const [studentId, paymentItemId] = id.split("_");
        return { studentId, paymentItemId };
      });

      if (expandedMethod === "card") {
        const response = await makePaymentWithRedirect({
          payments: paymentPairs,
          callbackUrl: `${window.location.origin}/pay-fees`,
        }).unwrap();
        showsuccess("Redirecting you to a secure checkout...");
        window.location.href = response?.data?.paymentUrl;
      } else {
        const studentIdsToPay = Array.from(
          new Set(paymentPairs.map((p) => p.studentId)),
        );
        const itemIdsToPay = Array.from(
          new Set(paymentPairs.map((p) => p.paymentItemId)),
        );
        const response = await makePayment({
          studentIds: studentIdsToPay,
          paymentItemIds: itemIdsToPay,
          email: String(currentUser?.email),
          duration: 1,
        }).unwrap();
        saveDVA(response?.data?.dva || null);
        showsuccess("Virtual account generated — complete your transfer to pay.");
      }
    } catch (error) {
      console.error("Payment failed", error);
      setPaymentError(error);
    }
  };

  const transferContent = dvaDetails ? (
    <div className="border-t border-gray-100 bg-gray-50/50 p-6 animate-in fade-in">
      <DVAPaymentContent
        dvaDetails={dvaDetails}
        isExpired={countdownState.isExpired}
        isModal={false}
      />
    </div>
  ) : (
    <div className="border-t border-gray-100 bg-gray-50/50 p-6 animate-in fade-in flex flex-col items-center justify-center">
      <ShieldCheck className="w-12 h-12 text-purple-200 mb-3" />
      <p className="text-gray-500 text-center mb-5 max-w-sm">
        Securely generate a designated Virtual Account to proceed with your
        transfer payment.
      </p>
      <button
        onClick={handlePayment}
        disabled={isPaying || !isAnySelected}
        className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {isPaying ? "Generating Account..." : "Generate Virtual Account"}
      </button>
    </div>
  );

  const GenerateAccountContent = (
    <div className="border-t border-gray-100 bg-gray-50/50 p-6 animate-in fade-in flex flex-col items-center justify-center">
      <ShieldCheck className="w-12 h-12 text-purple-200 mb-3" />
      <p className="text-gray-500 text-center mb-5 max-w-sm">
        Securely generate a designated Virtual Account to proceed with your
        transfer payment.
      </p>
      <button
        onClick={handlePayment}
        disabled={isPaying || !isAnySelected}
        className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {isPaying ? "Generating Account..." : "Generate Virtual Account"}
      </button>
    </div>
  );

  if (isParentDashboardLoading) return <StudentSkeletonGrid />;

  if (!isPayable) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
          <Receipt className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">All Caught Up!</h2>
        <p className="text-gray-500 max-w-md">
          You do not have any outstanding fee payments at this time. Your wards
          are fully cleared.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8  mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Outstanding Fees
        </h1>
        <p className="text-gray-500 mt-2">
          Select the individual fee items you wish to pay for right now.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Fee Selection */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {students.map((student) => {
            if (student.items.length === 0) return null;

            const studentItemIds = student.items.map(
              (i) => `${student.id}_${i.paymentItemId}`,
            );
            const allSelected = studentItemIds.every((id) =>
              selectedItemIds.includes(id),
            );
            const someSelected = studentItemIds.some((id) =>
              selectedItemIds.includes(id),
            );

            return (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Student Header */}
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {student.items.length} pending{" "}
                        {student.items.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStudent(studentItemIds)}
                    className="flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-800 transition-colors bg-purple-50 px-3 py-1.5 rounded-lg"
                  >
                    {allSelected ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                </div>

                {/* Fee Items List */}
                <div className="divide-y divide-gray-50 p-2">
                  {student.items.map((item) => {
                    const uniqueId = `${student.id}_${item.paymentItemId}`;
                    const isSelected = selectedItemIds.includes(uniqueId);
                    return (
                      <div
                        key={uniqueId}
                        onClick={() => toggleItem(uniqueId)}
                        className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                          isSelected ? "bg-purple-50/50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <button
                            className={`shrink-0 transition-colors ${isSelected ? "text-purple-600" : "text-gray-300"}`}
                          >
                            {isSelected ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </button>
                          <div>
                            <p
                              className={`font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                            >
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Fee Reference ID:{" "}
                              {item.paymentItemId.slice(-6).toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`font-bold tracking-tight ${isSelected ? "text-purple-700" : "text-gray-900"}`}
                        >
                          ₦{item.amount?.toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Payment Summary & Checkout */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/40 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-900 text-white">
              <h2 className="text-lg font-semibold mb-1">Payment Summary</h2>
              <p className="text-gray-400 text-sm">
                Review your selection and checkout
              </p>
            </div>

            <div className="p-6 bg-gray-50/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">Selected Total</span>
                <span className="text-gray-900 font-semibold">
                  ₦{totalPayableAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">Service Fee</span>
                <span className="text-gray-900 font-semibold">
                  ₦{SERVICE_FEE.toLocaleString()}
                </span>
              </div>

              <div className="h-px w-full bg-gray-200 mb-4" />

              <div className="flex justify-between items-end mb-6">
                <span className="text-gray-500 font-medium">
                  Total Payable
                </span>
                <span className="text-4xl font-bold text-gray-900 tracking-tighter">
                  <span className="text-2xl text-gray-400 font-normal mr-1">
                    ₦
                  </span>
                  {totalWithServiceFee.toLocaleString()}
                </span>
              </div>

              <div className="h-px w-full bg-gray-200 mb-6" />

              <button
                onClick={handlePayment}
                disabled={isPayingWithRedirect || !isAnySelected}
                className="w-full py-3.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10">
                  {isPayingWithRedirect
                    ? "Processing Secure Gateway..."
                    : `Pay ₦${totalWithServiceFee.toLocaleString()} Now`}
                </span>
              </button>
            </div>

            {/* Render transfer details outside the button flow but inside the card to keep the summary isolated */}
            {expandedMethod === "transfer" && (
              <div className="border-t border-gray-100">
                {dvaDetails ? transferContent : GenerateAccountContent}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Payments are secured and encrypted
          </p>
        </div>
      </div>

      <PaymentErrorModal
        isOpen={paymentError !== null}
        onClose={() => setPaymentError(null)}
        error={paymentError}
      />
    </div>
  );
}
