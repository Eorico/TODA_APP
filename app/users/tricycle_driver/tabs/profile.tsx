import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  ActivityIndicator, Modal, Pressable,
} from 'react-native';
import {
  BadgeCheck, PenLine,
  LogOut, Upload, User, FileText, X, ZoomIn,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDriverProfile } from '@/hooks/use_driver_profile';
import { Toast } from '@/components/toast';
import { useToast } from '@/hooks/use_toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CRIMSON  = '#7B1A1A';
const GOLD     = '#C8960C';
const BG       = '#F5EFE8';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

// ── Resolve any URL format the backend may return ─────────────
// Handles: base64 data URIs, full http URLs, and relative paths
function resolveDocumentUri(uri?: string | null): string | null {
  if (!uri) return null;
  if (uri.startsWith('data:'))   return uri;                  // base64 — use as-is
  if (uri.startsWith('http://') || uri.startsWith('https://')) return uri; // full URL — use as-is
  // relative path e.g. "uploads/abc123_license.jpg"
  const clean = uri.startsWith('/') ? uri : `/${uri}`;
  return `${BASE_URL}${clean}`;
}

// ── Full-screen image viewer ───────────────────────────────────
function ImageModal({
  uri, title, visible, onClose,
}: {
  uri: string; title: string; visible: boolean; onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{
        flex: 1, backgroundColor: 'rgba(0,0,0,0.92)',
        justifyContent: 'center', alignItems: 'center',
      }}>
        <Pressable
          onPress={onClose}
          style={{
            position: 'absolute', top: 52, right: 20, zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 8,
          }}
        >
          <X size={22} color="#fff" />
        </Pressable>

        <Text style={{
          color: '#fff', fontWeight: '700', fontSize: 13,
          letterSpacing: 2, marginBottom: 16, opacity: 0.7,
        }}>
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

// ── Document thumbnail card ────────────────────────────────────
function DocumentCard({
  label, uri, onView,
}: {
  label: string; uri?: string | null; onView: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  if (!uri || imgError) {
    return (
      <View style={{
        flex: 1, borderRadius: 12, backgroundColor: '#F5EFE8',
        borderWidth: 1, borderColor: '#E8E3DE', alignItems: 'center',
        justifyContent: 'center', padding: 16, minHeight: 120,
      }}>
        <Upload size={22} color="#C4B9AE" />
        <Text style={{
          color: '#C4B9AE', fontSize: 11, fontWeight: '700',
          marginTop: 6, textAlign: 'center',
        }}>
          {label}
        </Text>
        <Text style={{ color: '#C4B9AE', fontSize: 10, marginTop: 2 }}>
          {imgError ? 'Failed to load' : 'Not uploaded'}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onView}
      activeOpacity={0.85}
      style={{
        flex: 1, borderRadius: 12, overflow: 'hidden',
        borderWidth: 1, borderColor: '#E8E3DE', minHeight: 120,
      }}
    >
      <Image
        source={{ uri }}
        style={{ width: '100%', height: 110 }}
        resizeMode="cover"
        onError={() => setImgError(true)}
      />
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(123,26,26,0.82)', padding: 6,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', gap: 4,
      }}>
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
  const insets                        = useSafeAreaInsets();
  const { profile, loading, error }   = useDriverProfile();
  const { toast, showToast, hideToast } = useToast();

  const [modalUri,   setModalUri]   = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (uri: string, title: string) => {
    setModalUri(uri);
    setModalTitle(title);
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['access_token', 'user']);
    router.replace('/auth/login');
  };

  // ── Loading state ──────────────────────────────────────────
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

  // ── Error state ────────────────────────────────────────────
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

  // Resolve document URLs once — handles base64, full URLs, and relative paths
  const licenseUri = resolveDocumentUri(profile.license_url);
  const orcrUri    = resolveDocumentUri(profile.orcr_url);

  return (
    <View className="flex-1" style={{ backgroundColor: BG }}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />

      {/* Full-screen image viewer */}
      {modalUri && (
        <ImageModal
          uri={modalUri}
          title={modalTitle}
          visible={!!modalUri}
          onClose={() => setModalUri(null)}
        />
      )}

      {/* ── HEADER ── */}
      <View style={{
        backgroundColor: CRIMSON, paddingHorizontal: 16,
        paddingTop: 14, paddingBottom: 16, marginTop: 30,
      }}>
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

          {/* Avatar placeholder — initials fallback */}
          <View className="relative mb-4 top-2">
            <View style={{
              width: 110, height: 110, borderRadius: 14,
              backgroundColor: CRIMSON, borderWidth: 4, borderColor: GOLD,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontSize: 36, fontWeight: '900' }}>
                {(profile.full_name?.[0] ?? '') + (profile.last_name?.[0] ?? '')}
              </Text>
            </View>
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
            style={{ backgroundColor: '#E8DCE0' }}
          >
            <PenLine size={16} color={CRIMSON} strokeWidth={2} />
            <Text className="text-[15px] font-bold" style={{ color: CRIMSON }}>
              Edit Profile
            </Text>
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

          {[
            { label: 'FULL NAME',         value: fullName },
            { label: 'EMAIL ADDRESS',     value: profile.email },
            { label: 'HOME ADDRESS',      value: profile.address },
            { label: 'BODY NUMBER',       value: `#${profile.body_number}` },
          ].map((row, i) => (
            <React.Fragment key={row.label}>
              <View className="py-2">
                <Text className="text-[10px] font-bold tracking-widest mb-1"
                  style={{ color: '#A89880' }}>
                  {row.label}
                </Text>
                <Text className="text-base" style={{ color: '#1A1A1A' }}>
                  {row.value || '—'}
                </Text>
              </View>
              {i < 3 && <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />}
            </React.Fragment>
          ))}

          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />
          <View className="py-2">
            <Text className="text-[10px] font-bold tracking-widest mb-1"
              style={{ color: '#A89880' }}>
              REGISTERED PHONE
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-base" style={{ color: '#1A1A1A' }}>
                {profile.contact || '—'}
              </Text>
              {profile.contact && <BadgeCheck size={18} color={GOLD} fill={GOLD} />}
            </View>
          </View>
        </View>

        {/* ── DOCUMENTS ── */}
        <View className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}>

          <View className="flex-row items-center gap-2 mb-4">
            <FileText size={16} color={CRIMSON} strokeWidth={2} />
            <Text className="text-xs font-extrabold tracking-widest" style={{ color: '#1A1A1A' }}>
              LICENSE AND OR/CR DOCUMENT
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <DocumentCard
              label="DRIVER'S LICENSE"
              uri={licenseUri}
              onView={() => licenseUri && openModal(licenseUri, "DRIVER'S LICENSE")}
            />
            <DocumentCard
              label="OR / CR"
              uri={orcrUri}
              onView={() => orcrUri && openModal(orcrUri, 'OR / CR')}
            />
          </View>

          <Text style={{ color: '#A89880', fontSize: 10, marginTop: 10, textAlign: 'center' }}>
            Tap a document to view full size
          </Text>

          {/* ── Expiry dates ── */}
          <View className="h-px mt-4 mb-3" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="flex-row gap-3">
            {[
              { label: 'LICENSE EXPIRY', date: profile.expiration_date_license },
              { label: 'OR/CR EXPIRY',   date: profile.expiration_date_orcr },
            ].map(({ label, date }) => (
              <View key={label} style={{
                flex: 1, backgroundColor: '#F5EFE8', borderRadius: 10, padding: 12,
              }}>
                <Text style={{
                  color: '#A89880', fontSize: 10, fontWeight: '700',
                  letterSpacing: 1, marginBottom: 4,
                }}>
                  {label}
                </Text>
                <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '700' }}>
                  {date
                    ? new Date(date).toLocaleDateString('en-PH', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })
                    : '—'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── LOGOUT ── */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 mx-4 mt-4 py-4 rounded-xl"
          style={{ backgroundColor: CRIMSON }}
        >
          <LogOut size={16} color="white" strokeWidth={2} />
          <Text className="text-[15px] font-semibold text-white">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}