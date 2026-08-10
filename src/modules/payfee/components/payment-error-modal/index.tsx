"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface DuplicateDetail {
  studentId?: string;
  paymentItemId?: string;
  message?: string;
}

interface PaymentErrorDetails {
  message: string;
  duplicates: DuplicateDetail[];
}

/** Pulls a readable message (and any per-item detail list) out of whatever
 * shape RTK Query hands back for a failed mutation. */
export function getPaymentErrorDetails(error: unknown): PaymentErrorDetails {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (error as any)?.data;

  const message =
    data?.message ||
    "Something went wrong while processing this payment. Please try again.";

  const duplicates: DuplicateDetail[] = Array.isArray(data?.errors?.duplicates)
    ? data.errors.duplicates
    : [];

  return { message, duplicates };
}

interface PaymentErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: unknown;
}

export function PaymentErrorModal({
  isOpen,
  onClose,
  error,
}: PaymentErrorModalProps) {
  const { message, duplicates } = getPaymentErrorDetails(error);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900 pt-1.5">
              Payment Could Not Be Completed
            </DialogTitle>
          </div>
          <DialogClose className="text-gray-400 hover:text-gray-600 transition-colors" />
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <p className="text-sm text-gray-600">{message}</p>

          {duplicates.length > 0 && (
            <ul className="bg-red-50 border border-red-100 rounded-xl divide-y divide-red-100 overflow-hidden">
              {duplicates.map((dup, idx) => (
                <li key={idx} className="px-4 py-2.5 text-sm text-red-700">
                  {dup.message ||
                    "A payment is already in progress for this fee item."}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
