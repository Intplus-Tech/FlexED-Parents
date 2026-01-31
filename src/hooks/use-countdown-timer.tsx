'use client';

import { useEffect, useState, useRef } from 'react';

export interface CountdownState {
  isExpired: boolean;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  totalSeconds: number;
}

export function useCountdown(expiresAt: string, onExpired?: () => void): CountdownState {
  const [state, setState] = useState<CountdownState>({
    isExpired: false,
    timeRemaining: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    totalSeconds: 0,
  });

  const expiredFiredRef = useRef(false);
  const onExpiredRef = useRef(onExpired);

  // Update the ref when onExpired changes
  useEffect(() => {
    onExpiredRef.current = onExpired;
  }, [onExpired]);

  // Countdown calculation effect
  useEffect(() => {
    if (!expiresAt) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const expiryTime = new Date(expiresAt).getTime();
      const difference = expiryTime - now;

      if (difference <= 0) {
        setState({
          isExpired: true,
          timeRemaining: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          totalSeconds: 0,
        });

        // Call onExpired callback only once
        if (onExpiredRef.current && !expiredFiredRef.current) {
          expiredFiredRef.current = true;
          onExpiredRef.current();
        }
        return;
      }

      // Reset the fired ref if time is still remaining
      expiredFiredRef.current = false;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setState({
        isExpired: false,
        timeRemaining: {
          days,
          hours,
          minutes,
          seconds,
        },
        totalSeconds: Math.floor(difference / 1000),
      });
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update every second
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return state;
}
