// hooks/use_driver_funds.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHARED_ENDPOINTS, API_CONFIG } from '@/services/api';

export interface Contribution {
  id: string;
  full_name: string;
  last_name: string;
  body_number: string;
  amount: number;
 
  date: string;
  status: string;
  notes?: string;
}

interface DriverFundsState {
  contributions: Contribution[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const POLL_INTERVAL_MS = 30_000; // refresh every 30 seconds

export function useDriverFunds(): DriverFundsState {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalAmount, setTotalAmount]     = useState(0);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const intervalRef                       = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchFunds = useCallback(async () => {
    // Don't show spinner on background polls — only on first load
    setError(null);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const res = await fetch(SHARED_ENDPOINTS.DRIVER_FUNDS, {
        headers: {
          ...API_CONFIG.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || err.message || 'Failed to load funds');
      }

      const data = await res.json();
      setContributions(data.contributions ?? []);
      setTotalAmount(data.total_amount ?? 0);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false); // clears initial spinner; no-op on polls
    }
  }, []);

  useEffect(() => {
    fetchFunds();

    // Poll every 30s so admin-added records appear automatically
    intervalRef.current = setInterval(fetchFunds, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchFunds]);

  return { contributions, totalAmount, loading, error, refetch: fetchFunds };
}