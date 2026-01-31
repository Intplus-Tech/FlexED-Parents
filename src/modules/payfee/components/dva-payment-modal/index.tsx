'use client';

import React from "react"

import { X, Copy, Check, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { CountdownTimer } from "../countdown-timer";


import { DVADetails } from '@/@types/parents';

interface DVAPaymentContentProps {
  dvaDetails: DVADetails | null;
  isExpired: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export function DVAPaymentContent({
  dvaDetails,
  isExpired,
  onClose,
  isModal = false,
}: DVAPaymentContentProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!dvaDetails) return null;

  const handleCopy = async (value: string, fieldLabel: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldLabel);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('[v0] Failed to copy:', err);
    }
  };

  // Format full account details for easy copy
  const fullDetails = `
Bank: ${dvaDetails.bank}
Account Number: ${dvaDetails.account_number}
Account Holder: ${dvaDetails.account_name}
Reference: ${dvaDetails.transaction_reference}
Amount: ${dvaDetails.currency} ${dvaDetails.expected_amount}
  `.trim();

  const contentClasses = isModal ? 'space-y-6' : 'space-y-6';

  return (
    <div className={contentClasses}>
      {/* Expiration Alert */}
      {isExpired ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Payment Expired</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              This virtual account has expired and can no longer be used. Your payment details are no longer valid.
            </p>
            <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">What&apos Next?</p>
              <ul className="text-left space-y-2">
                <li>• Generate a new virtual account with updated details</li>
                <li>• Contact support for assistance</li>
                <li>• Check your transaction history for updates</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Countdown Timer */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Time Remaining</h3>
            </div>
            <CountdownTimer
              expiresAt={dvaDetails.expires_at}
              isExpired={isExpired}
            />
          </div>

          {/* Amount */}
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-medium mb-1">
              Amount to Pay
            </p>
            <p className="text-3xl font-bold text-purple-600">
              {dvaDetails.currency} {dvaDetails.expected_amount}
            </p>
          </div>

          {/* Bank Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-purple-500 rounded-full" />
              <h3 className="font-semibold text-foreground">Bank Details</h3>
            </div>

            {/* Bank Name */}
            <div className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Bank Name
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-foreground">
                  {dvaDetails.bank}
                </p>
                <button
                  onClick={() =>
                    handleCopy(dvaDetails.bank, 'bank')
                  }
                  disabled={isExpired}
                  className="shrink-0 p-2 hover:bg-purple-500/10 text-purple-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Copy bank name"
                >
                  {copiedField === 'bank' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-purple-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Account Number */}
            <div className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Account Number
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-mono font-bold text-foreground break-all">
                  {dvaDetails.account_number}
                </p>
                <button
                  onClick={() =>
                    handleCopy(dvaDetails.account_number, 'accountNumber')
                  }
                  disabled={isExpired}
                  className="shrink-0 p-2 hover:bg-purple-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Copy account number"
                >
                  {copiedField === 'accountNumber' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-purple-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Account Holder */}
            <div className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Account Holder
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-foreground">
                  {dvaDetails.account_name}
                </p>
                <button
                  onClick={() =>
                    handleCopy(dvaDetails.account_name, 'accountHolder')
                  }
                  disabled={isExpired}
                  className="shrink-0 p-2 hover:bg-purple-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Copy account holder"
                >
                  {copiedField === 'accountHolder' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-purple-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Reference Number */}
            <div className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Reference / Payment Code
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-mono font-bold text-purple-600 break-all">
                  {dvaDetails.transaction_reference}
                </p>
                <button
                  onClick={() =>
                    handleCopy(dvaDetails.transaction_reference, 'referenceNumber')
                  }
                  disabled={isExpired}
                  className="shrink-0 p-2 hover:bg-purple-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Copy reference number"
                >
                  {copiedField === 'referenceNumber' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-purple-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Copy All Details */}
          <button
            onClick={() => handleCopy(fullDetails, 'allDetails')}
            disabled={isExpired}
            className="w-full h-12 bg-secondary hover:bg-secondary/80 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copiedField === 'allDetails' ? (
              <div className="flex items-center justify-center">
                <Check className="w-4 h-4 mr-2 text-green-600" />
                All Details Copied!
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Copy className="w-4 h-4 mr-2 text-purple-500" />
                Copy All Details
              </div>
            )}
          </button>

          {/* Instructions */}
          <div className="bg-purple-50 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-foreground text-sm">
              How to Complete Payment:
            </p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Log in to your bank account or mobile banking app</li>
              <li>Select transfer to another account</li>
              <li>Enter the account details above</li>
              <li>Confirm the amount: {dvaDetails.currency} {dvaDetails.expected_amount}</li>
              <li>Submit the transfer</li>
            </ol>
          </div>
        </>
      )}

      {/* Close Button - only show in modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="w-full h-11 bg-purple-50  hover:bg-secondary/80 rounded-md transition-colors"
        >
          Close
        </button>
      )}
    </div>
  );
}

export function DVAPaymentModal({
  dvaDetails,
  isOpen,
  onClose,
  isExpired,
}: {
  dvaDetails: DVADetails | null;
  isOpen: boolean;
  onClose: () => void;
  isExpired: boolean;
}) {
  if (!isOpen || !dvaDetails) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-background rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 px-6 py-4 flex items-center justify-between border-b border-primary/20">
          <div>
            <h2 className="text-xl font-bold text-primary-foreground">
              Payment Instructions
            </h2>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Virtual Account Transfer
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-primary-foreground hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <DVAPaymentContent
            dvaDetails={dvaDetails}
            isExpired={isExpired}
            onClose={onClose}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
}
