import { useState, useEffect, useCallback } from 'react';
import { SHARED_ENDPOINTS, API_CONFIG } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DriverProfile } from '@/constants/data';

export function useDriverProfile() {
  const [profile, setProfile]   = useState<DriverProfile | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('access_token');
      if (!token) throw new Error('Not authenticated');

      const res = await fetch(SHARED_ENDPOINTS.DRIVER_PROFILE, {
        method: 'GET',
        headers: {
          ...API_CONFIG.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.detail || 'Failed to load profile');
      }

      const data: DriverProfile = await res.json();
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}