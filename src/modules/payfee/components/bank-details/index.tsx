'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export interface BankDetail {
  label: string;
  value: string;
  isCopyable?: boolean;
}

interface BankDetailsProps {
  bankName: string;
  accountDetails: BankDetail[];
  isExpired?: boolean;
}

export function BankDetails({
  bankName,
  accountDetails,
  isExpired = false,
}: BankDetailsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, fieldLabel: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldLabel);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('[v0] Failed to copy:', err);
    }
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-opacity ${
        isExpired ? 'opacity-50' : ''
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
        <h2 className="text-lg font-bold text-primary-foreground">
          Bank Details
        </h2>
        <p className="text-primary-foreground/80 text-sm mt-1">{bankName}</p>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4 bg-card">
        {accountDetails.map((detail) => (
          <div key={detail.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {detail.label}
              </p>
              <p className="text-base font-semibold text-foreground mt-1 break-words font-mono">
                {detail.value}
              </p>
            </div>

            {detail.isCopyable !== false && (
              <button
                onClick={() => handleCopy(detail.value, detail.label)}
                disabled={isExpired}
                className="ml-2 shrink-0 p-2 hover:bg-primary/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Copy ${detail.label}`}
              >
                {copiedField === detail.label ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-primary" />
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {isExpired && (
        <div className="bg-destructive/5 border-t border-destructive/10 px-6 py-3">
          <p className="text-sm text-destructive font-medium">
            ⚠️ This payment has expired
          </p>
        </div>
      )}
    </div>
  );
}
