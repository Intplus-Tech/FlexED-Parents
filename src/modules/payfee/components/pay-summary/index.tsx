"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PaymentSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentSummaryModal({
  isOpen,
  onClose,
}: PaymentSummaryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Payment Summary
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  Chiamaka Adebayo
                </p>
                <p className="text-sm text-gray-600 mb-2">(SSS 3)</p>
                <p className="text-xl font-bold text-purple-600">₦750,000</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  Aisha Mohammed
                </p>
                <p className="text-sm text-gray-600 mb-2">(SSS 1)</p>
                <p className="text-xl font-bold text-purple-600">₦750,000</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  Musa Mohammed
                </p>
                <p className="text-sm text-gray-600 mb-2">(SSS 1)</p>
                <p className="text-xl font-bold text-purple-600">₦750,000</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                      Fee Category
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900">
                      Chiamaka
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900">
                      Aisha
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900">
                      Musa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      School fee
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦856,000
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦856,000
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦856,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      Music
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦180,000
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦180,000
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦180,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      After School
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦180,000
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦180,000
                    </td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">
                      ₦180,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
