// app/(passenger)/profile.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, Platform, ActivityIndicator,
} from 'react-native';
import { Pencil, User, Wifi, ShieldCheck, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, SHARED_ENDPOINTS } from '@/services/api';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';

interface PassengerProfile {
  id: string;
  full_name: string;
  contact: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<PassengerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

 // app/(passenger)/profile.tsx — temporary debug
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      console.log('TOKEN:', token ? token.substring(0, 40) + '...' : 'NULL');  // ← add

      const res = await fetch(SHARED_ENDPOINTS.PASSENGER_PROFILE, {
        headers: {
          ...API_CONFIG.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('PROFILE STATUS:', res.status);  // ← add
      const body = await res.text();
      console.log('PROFILE BODY:', body);           // ← add

      if (res.ok) setProfile(JSON.parse(body));
    } catch (err) {
      console.error('Failed to fetch passenger profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['access_token', 'user']);
    router.replace('/auth/login');
  };

  // Format joined date
  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '—';

  // Initials avatar
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5EFE8' }}>
      {/* ── HEADER ── */}
      <View style={{ backgroundColor: CRIMSON, paddingHorizontal: 16,
        paddingTop: 14, paddingBottom: 16, marginTop: 30 }}>
        <Text style={{ color: GOLD, fontSize: 10, fontWeight: '700',
          letterSpacing: 0.8, marginBottom: 2 }}>MAMTTODA</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>
          Passenger Hub
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          Stay informed, stay connected, and enjoy the ride!
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 100 : 86,
        }}
      >
        {loading ? (
          <View style={{ alignItems: 'center', paddingVertical: 60 }}>
            <ActivityIndicator color={CRIMSON} size="large" />
          </View>
        ) : (
          <>
            {/* PROFILE CARD */}
            <View style={{ backgroundColor: '#F0E8E4', marginHorizontal: 16,
              marginTop: 20, borderRadius: 16, padding: 24, alignItems: 'center' }}>

              {/* AVATAR — initials circle */}
              <View style={{ position: 'relative', marginBottom: 16 }}>
                <View style={{ width: 110, height: 110, borderRadius: 12,
                  backgroundColor: CRIMSON, alignItems: 'center', justifyContent: 'center',
                  borderWidth: 4, borderColor: GOLD }}>
                  <Text style={{ fontSize: 36, fontWeight: '900', color: GOLD }}>
                    {initials}
                  </Text>
                </View>
                <View style={{ position: 'absolute', bottom: -6, right: -6,
                  width: 30, height: 30, borderRadius: 15, backgroundColor: GOLD,
                  alignItems: 'center', justifyContent: 'center',
                  borderWidth: 2, borderColor: 'white' }}>
                  <ShieldCheck size={16} color="white" strokeWidth={2.5} />
                </View>
              </View>

              {/* NAME */}
              <Text style={{ fontSize: 22, fontWeight: '900', color: CRIMSON, marginBottom: 8 }}>
                {profile?.full_name || '—'}
              </Text>

              {/* BADGE ROW */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View style={{ borderWidth: 1, borderColor: GOLD,
                  borderRadius: 99, paddingHorizontal: 12, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: GOLD, letterSpacing: 1 }}>
                    VERIFIED PASSENGER
                  </Text>
                </View>
                <Text style={{ fontSize: 13, color: '#6B6059', marginLeft: 6 }}>
                  · Joined {joinedDate}
                </Text>
              </View>

              {/* EDIT BUTTON */}
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center', gap: 8, backgroundColor: '#E8DCE0',
                borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20, width: '100%' }}>
                <Pencil size={16} color={CRIMSON} strokeWidth={2} />
                <Text style={{ fontSize: 15, fontWeight: '700', color: CRIMSON }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>

            {/* PERSONAL DETAILS */}
            <View style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E7EB',
              borderRadius: 12, marginHorizontal: 16, marginTop: 16, padding: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center',
                gap: 8, marginBottom: 16 }}>
                <User size={16} color={CRIMSON} strokeWidth={2} />
                <Text style={{ fontSize: 11, fontWeight: '900', letterSpacing: 2,
                  color: '#1F2937', textTransform: 'uppercase' }}>
                  Personal Details
                </Text>
              </View>

              <View style={{ paddingVertical: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#6B7280',
                  letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                  Full Name
                </Text>
                <Text style={{ fontSize: 15, color: '#1F2937' }}>
                  {profile?.full_name || '—'}
                </Text>
              </View>

              <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 4 }} />

              <View style={{ paddingVertical: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#6B7280',
                  letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                  Phone Number
                </Text>
                <Text style={{ fontSize: 15, color: '#1F2937' }}>
                  {profile?.contact || 'Not provided'}
                </Text>
              </View>
            </View>

            {/* CONNECTIVITY */}
            <View style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E7EB',
              borderRadius: 12, marginHorizontal: 16, marginTop: 16, padding: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center',
                gap: 8, marginBottom: 16 }}>
                <Wifi size={16} color={CRIMSON} strokeWidth={2} />
                <Text style={{ fontSize: 11, fontWeight: '900', letterSpacing: 2,
                  color: '#1F2937', textTransform: 'uppercase' }}>
                  Connectivity
                </Text>
              </View>

              <View style={{ paddingVertical: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#6B7280',
                  letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                  Gmail Address
                </Text>
                <Text style={{ fontSize: 15, color: '#1F2937' }}>
                  {profile?.email || '—'}
                </Text>
              </View>

              <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 4 }} />

              <View style={{ paddingVertical: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#6B7280',
                  letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                  Home Address
                </Text>
                <Text style={{ fontSize: 15, color: '#1F2937' }}>
                  {profile?.address || 'Not provided'}
                </Text>
              </View>
            </View>

            {/* LOGOUT */}
            <TouchableOpacity
              onPress={handleLogout}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                gap: 8, marginHorizontal: 16, marginTop: 16, paddingVertical: 16,
                borderRadius: 12, backgroundColor: CRIMSON }}
            >
              <LogOut size={16} color="white" strokeWidth={2} />
              <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}