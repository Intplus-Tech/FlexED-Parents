import { ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { LogoLoader } from "@/components/ui/logo-loader";
import { formatNaira, formatDate } from "@/utils/functions";
import {
  ParentWalletLedgerEntry,
  ParentWalletLedgerPagination,
  WalletLedgerReason,
  WalletLedgerType,
} from "@/@types/parent-wallet";

const REASON_COPY: Record<WalletLedgerReason, string> = {
  OVERPAYMENT: "You paid more than was owed",
  PAYMENT_APPLIED: "Credit used on a fee",
  REFUND: "Credit returned outside the platform",
  ADJUSTMENT: "Manual correction",
  OPENING_BALANCE: "Credit carried over before joining FlexEd",
};

interface LedgerSectionProps {
  entries: ParentWalletLedgerEntry[];
  pagination?: ParentWalletLedgerPagination;
  isLoading: boolean;
  typeFilter: WalletLedgerType | "";
  reasonFilter: WalletLedgerReason | "";
  onTypeFilterChange: (value: WalletLedgerType | "") => void;
  onReasonFilterChange: (value: WalletLedgerReason | "") => void;
  onPageChange: (page: number) => void;
}

export function LedgerSection({
  entries,
  pagination,
  isLoading,
  typeFilter,
  reasonFilter,
  onTypeFilterChange,
  onReasonFilterChange,
  onPageChange,
}: LedgerSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Wallet History</h2>
        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value as WalletLedgerType | "")}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All types</option>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
          </select>
          <select
            value={reasonFilter}
            onChange={(e) => onReasonFilterChange(e.target.value as WalletLedgerReason | "")}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All reasons</option>
            <option value="OVERPAYMENT">Overpayment</option>
            <option value="PAYMENT_APPLIED">Payment applied</option>
            <option value="REFUND">Refund</option>
            <option value="ADJUSTMENT">Adjustment</option>
            <option value="OPENING_BALANCE">Opening balance</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <LogoLoader size={40} />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 px-6">
          <p className="text-gray-500">No wallet activity yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Credit shows up here the moment you overpay a fee.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {entries.map((entry) => {
            const isCredit = entry.type === "CREDIT";
            return (
              <div
                key={entry._id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isCredit ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {isCredit ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {REASON_COPY[entry.reason] ?? entry.reason}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatDate(entry.createdAt, "DD MMM YYYY, h:mm A")}
                      {entry.student?.firstName &&
                        ` · ${entry.student.firstName} ${entry.student.lastName ?? ""}`}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={`font-bold ${isCredit ? "text-green-600" : "text-rose-600"}`}
                  >
                    {isCredit ? "+" : "-"}
                    {formatNaira(entry.amount)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Balance: {formatNaira(entry.balanceAfter)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
