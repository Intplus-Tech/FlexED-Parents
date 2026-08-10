"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle2, Circle, Loader2, PartyPopper } from "lucide-react";
import { useGetParentDashboardQuery } from "@/redux/api/parents";
import { usePayFromWalletMutation } from "@/redux/api/parent-wallet";
import { formatNaira } from "@/utils/functions";
import { showerror } from "@/utils/toast";

interface RedeemCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
}

export function RedeemCreditModal({
  isOpen,
  onClose,
  walletBalance,
}: RedeemCreditModalProps) {
  const { data: dashboardData } = useGetParentDashboardQuery(undefined, {
    skip: !isOpen,
  });
  const [payFromWallet, { isLoading }] = usePayFromWalletMutation();

  const [studentId, setStudentId] = useState<string>("");
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{
    totalApplied: number;
    walletBalance: number;
  } | null>(null);

  const students = dashboardData?.data?.students ?? [];
  const selectedStudent = students.find((s) => s.id === studentId);
  const items = selectedStudent?.items ?? [];

  const requestedTotal = useMemo(
    () => Object.values(allocations).reduce((sum, amount) => sum + (amount || 0), 0),
    [allocations],
  );

  const remainingWallet = walletBalance - requestedTotal;
  const canSubmit = requestedTotal > 0 && remainingWallet >= 0 && !isLoading;

  const handleClose = () => {
    setStudentId("");
    setAllocations({});
    setResult(null);
    onClose();
  };

  const toggleItem = (paymentItemId: string, outstanding: number) => {
    setAllocations((prev) => {
      const next = { ...prev };
      if (next[paymentItemId]) {
        delete next[paymentItemId];
      } else {
        const remainingBudget = Math.max(walletBalance - requestedTotal, 0);
        next[paymentItemId] = Math.min(outstanding, remainingBudget || outstanding);
      }
      return next;
    });
  };

  const updateAllocation = (paymentItemId: string, value: number, outstanding: number) => {
    setAllocations((prev) => ({
      ...prev,
      [paymentItemId]: Math.max(0, Math.min(value, outstanding)),
    }));
  };

  const handleSubmit = async () => {
    if (!studentId || requestedTotal <= 0) return;
    try {
      const res = await payFromWallet({
        studentId,
        allocations: Object.entries(allocations)
          .filter(([, amount]) => amount > 0)
          .map(([paymentItemId, amount]) => ({ paymentItemId, amount })),
      }).unwrap();
      setResult({
        totalApplied: res.data.totalApplied,
        walletBalance: res.data.walletBalance,
      });
    } catch (error: any) {
      showerror(error?.data?.message || "Failed to apply wallet credit");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Use Wallet Credit
          </DialogTitle>
          <DialogClose className="text-gray-400 hover:text-gray-600" />
        </DialogHeader>

        {result ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Credit Applied</h3>
            <p className="text-gray-500">
              {formatNaira(result.totalApplied)} was applied to the selected
              fees.
              {result.totalApplied < requestedTotal && (
                <span className="block text-amber-600 text-sm mt-1">
                  Some items owed less than you allocated, so only the amount
                  still due was applied.
                </span>
              )}
            </p>
            <p className="text-sm text-gray-400">
              Remaining wallet balance: {formatNaira(result.walletBalance)}
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5 mt-2">
            <p className="text-sm text-gray-500">
              Available credit:{" "}
              <span className="font-semibold text-gray-900">
                {formatNaira(walletBalance)}
              </span>
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Child
              </label>
              <select
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value);
                  setAllocations({});
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="">Select a child</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </select>
            </div>

            {studentId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outstanding Fees
                </label>
                {items.length === 0 ? (
                  <p className="text-sm text-gray-400 py-4 text-center">
                    No outstanding fees for this child.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {items.map((item) => {
                      const isSelected = item.paymentItemId in allocations;
                      return (
                        <div
                          key={item.paymentItemId}
                          className={`border rounded-xl p-3 transition-colors ${
                            isSelected
                              ? "border-purple-300 bg-purple-50/40"
                              : "border-gray-200"
                          }`}
                        >
                          <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleItem(item.paymentItemId, item.outstanding)}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isSelected ? (
                                <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Owed: {formatNaira(item.outstanding)}
                                </p>
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="mt-2 pl-7">
                              <input
                                type="number"
                                min={0}
                                max={item.outstanding}
                                value={allocations[item.paymentItemId] ?? 0}
                                onChange={(e) =>
                                  updateAllocation(
                                    item.paymentItemId,
                                    Number(e.target.value),
                                    item.outstanding,
                                  )
                                }
                                className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500">You&apos;re applying</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatNaira(requestedTotal)}
                </p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Applying..." : "Apply Credit"}
              </button>
            </div>
            {remainingWallet < 0 && (
              <p className="text-xs text-rose-600 text-right -mt-3">
                This exceeds your available wallet balance.
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
