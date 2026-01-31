'use client';

import { useCountdown } from '@/hooks/use-countdown-timer';
import { AlertCircle, Clock } from 'lucide-react';

interface CountdownTimerProps {
  expiresAt: string;
  isExpired?: boolean;
}

export function CountdownTimer({
  expiresAt,
  isExpired: initialExpired = false,
}: CountdownTimerProps) {
  const countdown = useCountdown(expiresAt);
  const isExpired = countdown.isExpired || initialExpired;

  if (isExpired) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-destructive mb-1">Payment Expired</h3>
          <p className="text-sm text-destructive/80">
            This payment has expired. Please initiate a new payment to continue.
          </p>
        </div>
      </div>
    );
  }

  const padTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-purple-50 from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Payment Expires In</h3>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Days', value: countdown.timeRemaining.days },
          { label: 'Hours', value: countdown.timeRemaining.hours },
          { label: 'Mins', value: countdown.timeRemaining.minutes },
          { label: 'Secs', value: countdown.timeRemaining.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white border border-primary/10 rounded-lg p-3 text-center"
          >
            <div className="text-purple-600 font-mono font-bold text-2xl mb-1">
              {padTime(item.value)}
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {countdown.totalSeconds < 3600 && (
        <div className="mt-4 p-3  text-indigo-300  border border-accent/20 rounded text-sm">
          <strong>⚠️ Hurry!</strong> Payment expires soon. Please complete your
          transaction.
        </div>
      )}
    </div>
  );
}
