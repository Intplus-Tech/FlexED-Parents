'use client'

import { DVADetails } from '@/@types/parents';
import { useEffect, useState } from 'react';


const DVA_STORAGE_KEY = 'dva_payment_details';

export function useDVAStorage() {
  const [dvaDetails, setDvaDetails] = useState<DVADetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DVA_STORAGE_KEY);
      if (stored) {
        setDvaDetails(JSON.parse(stored));
      }
    } catch (err) {
      console.error('[v0] Failed to load DVA from storage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save DVA details
  const saveDVA = (details: DVADetails) => {
    try {
      localStorage.setItem(DVA_STORAGE_KEY, JSON.stringify(details));
      setDvaDetails(details);
    } catch (err) {
      console.error('[v0] Failed to save DVA to storage:', err);
    }
  };

  // Clear DVA details
  const clearDVA = () => {
    try {
      localStorage.removeItem(DVA_STORAGE_KEY);
      setDvaDetails(null);
    } catch (err) {
      console.error('[v0] Failed to clear DVA storage:', err);
    }
  };

  return {
    dvaDetails,
    isLoading,
    saveDVA,
    clearDVA,
  };
}
