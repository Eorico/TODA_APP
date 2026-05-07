import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Pressable,
} from 'react-native';
import {
  BadgeCheck, PenLine, Shield, Receipt,
  ChevronRight, LogOut, Upload, User, Wifi, FileText, X, ZoomIn,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDriverProfile } from '@/hooks/use_driver_profile';
import { Toast } from '@/components/toast';
import { useToast } from '@/hooks/use_toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';

// ── Full-screen image viewer ───────────────────────────────────
function ImageModal({
  uri, title, visible, onClose,
}: { uri: string; title: string; visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          onPress={onClose}
          style={{ position: 'absolute', top: 52, right: 20, zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 8 }}
        >
          <X size={22} color="#fff" />
        </Pressable>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13,
          letterSpacing: 2, marginBottom: 16, opacity: 0.7 }}>
          {title}
        </Text>
        <Image
          source={{ uri }}
          style={{ width: '92%', height: '65%', borderRadius: 12 }}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}

// ── Document card ──────────────────────────────────────────────
function DocumentCard({
  label, uri, onView,
}: { label: string; uri?: string | null; onView: () => void }) {
  if (!uri) {
    return (
      <View style={{ flex: 1, borderRadius: 12, backgroundColor: '#F5EFE8',
        borderWidth: 1, borderColor: '#E8E3DE', alignItems: 'center',
        justifyContent: 'center', padding: 16, minHeight: 120 }}>
        <Upload size={22} color="#C4B9AE" />
        <Text style={{ color: '#C4B9AE', fontSize: 11, fontWeight: '700',
          marginTop: 6, textAlign: 'center' }}>{label}</Text>
        <Text style={{ color: '#C4B9AE', fontSize: 10, marginTop: 2 }}>Not uploaded</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onView}
      activeOpacity={0.85}
      style={{ flex: 1, borderRadius: 12, overflow: 'hidden',
        borderWidth: 1, borderColor: '#E8E3DE', minHeight: 120 }}
    >
      <Image source={{ uri }} style={{ width: '100%', height: 110 }} resizeMode="cover" />
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(123,26,26,0.82)', padding: 6,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <ZoomIn size={12} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ── Main screen ────────────────────────────────────────────────
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { profile, loading, error } = useDriverProfile();
  const { toast, showToast, hideToast } = useToast();

  const [modalUri, setModalUri]     = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (uri: string, title: string) => {
    setModalUri(uri);
    setModalTitle(title);
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['access_token', 'user']);
    router.replace('/auth/login');
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: BG }}>
        <ActivityIndicator size="large" color={CRIMSON} />
        <Text className="mt-3 text-[13px] font-semibold" style={{ color: '#A89880' }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View className="flex-1 items-center justify-center px-8" style={{ backgroundColor: BG }}>
        <Text className="text-[15px] font-bold text-center mb-2" style={{ color: CRIMSON }}>
          Could not load profile
        </Text>
        <Text className="text-[13px] text-center" style={{ color: '#6B6059' }}>
          {error || 'Profile not found.'}
        </Text>
      </View>
    );
  }

  const fullName   = `${profile.full_name} ${profile.last_name}`.trim();
  const isVerified = profile.member_status === 'approved';

  return (
    <View className="flex-1" style={{ backgroundColor: BG }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onHide={hideToast} />

      {/* Full-screen image viewer modal */}
      {modalUri && (
        <ImageModal
          uri={modalUri}
          title={modalTitle}
          visible={!!modalUri}
          onClose={() => setModalUri(null)}
        />
      )}

      {/* ── HEADER ── */}
      <View style={{ backgroundColor: CRIMSON, paddingHorizontal: 16,
        paddingTop: 14, paddingBottom: 16, marginTop: 30 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>Profile</Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          View and manage your account details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
      >
        {/* ── PROFILE CARD ── */}
        <View className="mx-4 mt-5 rounded-2xl p-6 items-center"
          style={{ backgroundColor: '#F0E8E4' }}>
          <View className="relative mb-4 top-2">
            <Image
              source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300' }}
              className="w-[110px] h-[110px] rounded-xl"
              style={{ borderWidth: 4, borderColor: GOLD }}
            />
            <View className="absolute -bottom-2 -right-2 w-[30px] h-[30px] rounded-full items-center justify-center border-2 border-white"
              style={{ backgroundColor: GOLD }}>
              <BadgeCheck size={16} color="white" strokeWidth={2.5} />
            </View>
          </View>

          <Text className="text-2xl font-extrabold mb-2" style={{ color: CRIMSON }}>
            {fullName}
          </Text>

          <View className="flex-row items-center mb-5">
            <View className="rounded-full px-3 py-1"
              style={{ borderWidth: 1, borderColor: isVerified ? GOLD : '#A89880' }}>
              <Text className="text-[11px] font-bold tracking-wide"
                style={{ color: isVerified ? GOLD : '#A89880' }}>
                {isVerified ? 'VERIFIED DRIVER' : 'PENDING APPROVAL'}
              </Text>
            </View>
            <Text className="text-sm ml-1" style={{ color: '#6B6059' }}>
              · Body #{profile.body_number}
            </Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 rounded-lg py-3 px-5 w-full"
            style={{ backgroundColor: '#E8DCE0' }}>
            <PenLine size={16} color={CRIMSON} strokeWidth={2} />
            <Text className="text-[15px] font-bold" style={{ color: CRIMSON }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ── PERSONAL DETAILS ── */}
        <View className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}>
          <View className="flex-row items-center gap-2 mb-4">
            <User size={16} color={CRIMSON} strokeWidth={2} />
            <Text className="text-xs font-extrabold tracking-widest" style={{ color: '#1A1A1A' }}>
              PERSONAL DETAILS
            </Text>
          </View>

          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-1" style={{ color: '#A89880' }}>FULL NAME</Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>{fullName}</Text>
          </View>
          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-1" style={{ color: '#A89880' }}>BODY NUMBER</Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>#{profile.body_number}</Text>
          </View>
          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-1" style={{ color: '#A89880' }}>REGISTERED PHONE</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-base" style={{ color: '#1A1A1A' }}>{profile.contact || '—'}</Text>
              {profile.contact && <BadgeCheck size={18} color={GOLD} fill={GOLD} />}
            </View>
          </View>
        </View>

        {/* ── LICENSE & VERIFICATION ── */}
        <View className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}>
          <View className="flex-row items-center gap-2 mb-4">
            <Shield size={16} color={CRIMSON} strokeWidth={2} />
            <Text className="text-xs font-extrabold tracking-widest" style={{ color: '#1A1A1A' }}>
              LICENSE & VERIFICATION
            </Text>
          </View>

          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-2" style={{ color: '#A89880' }}>
              DRIVER LICENSE STATUS
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center px-2.5 py-1.5 rounded-full"
                style={{ backgroundColor: isVerified ? CRIMSON : '#A89880' }}>
                <BadgeCheck size={12} color="#fff" />
                <Text className="text-white text-[11px] font-bold ml-1">
                  {isVerified ? 'VERIFIED' : 'PENDING'}
                </Text>
              </View>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Upload size={14} color="#6B6059" />
                <Text className="text-[11px] font-bold" style={{ color: '#6B6059' }}>UPDATE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-1" style={{ color: '#A89880' }}>ACCOUNT STATUS</Text>
            <Text className="text-base font-extrabold" style={{ color: '#1A1A1A' }}>{profile.status}</Text>
            <Text className="text-[12px] mt-0.5" style={{ color: '#A89880' }}>
              Member since {new Date(profile.created_at).toLocaleDateString('en-PH', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* ── DOCUMENTS ── */}
        <View className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}>
          <View className="flex-row items-center gap-2 mb-4">
            <FileText size={16} color={CRIMSON} strokeWidth={2} />
            <Text className="text-xs font-extrabold tracking-widest" style={{ color: '#1A1A1A' }}>
              DOCUMENTS
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <DocumentCard
              label="DRIVER'S LICENSE"
              uri={profile.license_url}
              onView={() => profile.license_url && openModal(profile.license_url, "DRIVER'S LICENSE")}
            />
            <DocumentCard
              label="OR / CR"
              uri={profile.orcr_url}
              onView={() => profile.orcr_url && openModal(profile.orcr_url, 'OR / CR')}
            />
          </View>

          <Text style={{ color: '#A89880', fontSize: 10, marginTop: 10, textAlign: 'center' }}>
            Tap a document to view full size
          </Text>
        </View>

        {/* ── CONNECTIVITY ── */}
        <View className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}>
          <View className="flex-row items-center gap-2 mb-4">
            <Wifi size={16} color={CRIMSON} strokeWidth={2} />
            <Text className="text-xs font-extrabold tracking-widest" style={{ color: '#1A1A1A' }}>
              CONNECTIVITY
            </Text>
          </View>

          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-1" style={{ color: '#A89880' }}>EMAIL ADDRESS</Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>{profile.email || '—'}</Text>
          </View>
          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-1" style={{ color: '#A89880' }}>HOME ADDRESS</Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>{profile.address || '—'}</Text>
          </View>
        </View>

        {/* ── ACTIONS ── */}
        <TouchableOpacity
          className="flex-row items-center mx-4 mt-4 rounded-xl py-4 px-4"
          style={{ backgroundColor: GOLD }}>
          <View className="w-[38px] h-[38px] rounded-lg items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <Receipt size={18} color="#fff" />
          </View>
          <Text className="flex-1 text-[15px] font-bold text-white ml-3">Transaction History</Text>
          <ChevronRight size={18} color="#fff" />
        </TouchableOpacity>

        {/* ── LOGOUT ── */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 mx-4 mt-4 py-4 rounded-xl"
          style={{ backgroundColor: CRIMSON }}>
          <LogOut size={16} color="white" strokeWidth={2} />
          <Text className="text-[15px] font-semibold text-white">Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}