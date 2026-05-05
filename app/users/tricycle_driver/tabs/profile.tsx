import React from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
} from 'react-native';
import {
  BadgeCheck, PenLine, Shield, Receipt,
  ChevronRight, LogOut, Upload, User, Wifi,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ backgroundColor: BG }}>
      
      <View
        style={{
          backgroundColor: CRIMSON,
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 16,
          marginTop: 30,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>
          Profile
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          View and manage your account details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 70,
        }}
      >

        {/* ── PROFILE CARD ── */}
        <View
          className="mx-4 mt-5 rounded-2xl p-6 items-center"
          style={{ backgroundColor: '#F0E8E4' }}
        >
          {/* AVATAR */}
          <View className="relative mb-4 top-2">
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
              }}
              className="w-[110px] h-[110px] rounded-xl"
              style={{ borderWidth: 4, borderColor: GOLD }}
            />
            <View
              className="absolute -bottom-2 -right-2 w-[30px] h-[30px] rounded-full items-center justify-center border-2 border-white"
              style={{ backgroundColor: GOLD }}
            >
              <BadgeCheck size={16} color="white" strokeWidth={2.5} />
            </View>
          </View>

          {/* NAME */}
          <Text
            className="text-2xl font-extrabold mb-2"
            style={{ color: CRIMSON }}
          >
            Ricardo San Jose
          </Text>

          {/* BADGE ROW */}
          <View className="flex-row items-center mb-5">
            <View
              className="rounded-full px-3 py-1"
              style={{ borderWidth: 1, borderColor: GOLD }}
            >
              <Text
                className="text-[11px] font-bold tracking-wide"
                style={{ color: GOLD }}
              >
                VERIFIED DRIVER
              </Text>
            </View>
            <Text className="text-sm ml-1" style={{ color: '#6B6059' }}>
              · Body #1082
            </Text>
          </View>

          {/* EDIT BUTTON */}
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
        <View
          className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}
        >
          <View className="flex-row items-center gap-2 mb-4">
            <User size={16} color={CRIMSON} strokeWidth={2} />
            <Text
              className="text-xs font-extrabold tracking-widest"
              style={{ color: '#1A1A1A' }}
            >
              PERSONAL DETAILS
            </Text>
          </View>

          <View className="py-2">
            <Text
              className="text-[10px] font-bold tracking-widest mb-1"
              style={{ color: '#A89880' }}
            >
              FULL NAME
            </Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>
              Ricardo San Jose
            </Text>
          </View>

          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text
              className="text-[10px] font-bold tracking-widest mb-1"
              style={{ color: '#A89880' }}
            >
              BODY NUMBER
            </Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>#1082</Text>
          </View>

          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text
              className="text-[10px] font-bold tracking-widest mb-1"
              style={{ color: '#A89880' }}
            >
              REGISTERED PHONE
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-base" style={{ color: '#1A1A1A' }}>
                +63 917 123 4567
              </Text>
              <BadgeCheck size={18} color={GOLD} fill={GOLD} />
            </View>
          </View>
        </View>

        {/* ── LICENSE DETAILS ── */}
        <View
          className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}
        >
          <View className="flex-row items-center gap-2 mb-4">
            <Shield size={16} color={CRIMSON} strokeWidth={2} />
            <Text
              className="text-xs font-extrabold tracking-widest"
              style={{ color: '#1A1A1A' }}
            >
              LICENSE & VERIFICATION
            </Text>
          </View>

          <View className="py-2">
            <Text
              className="text-[10px] font-bold tracking-widest mb-2"
              style={{ color: '#A89880' }}
            >
              DRIVER LICENSE STATUS
            </Text>
            <View className="flex-row items-center justify-between">
              <View
                className="flex-row items-center px-2.5 py-1.5 rounded-full"
                style={{ backgroundColor: CRIMSON }}
              >
                <BadgeCheck size={12} color="#fff" />
                <Text className="text-white text-[11px] font-bold ml-1">
                  VERIFIED
                </Text>
              </View>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Upload size={14} color="#6B6059" />
                <Text
                  className="text-[11px] font-bold"
                  style={{ color: '#6B6059' }}
                >
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text
              className="text-[10px] font-bold tracking-widest mb-1"
              style={{ color: '#A89880' }}
            >
              LICENSE EXPIRY DATE
            </Text>
            <Text className="text-base font-extrabold" style={{ color: '#1A1A1A' }}>
              December 15, 2026
            </Text>
            <Text className="text-[12px] mt-0.5" style={{ color: '#A89880' }}>
              Valid for 2 more years
            </Text>
          </View>
        </View>

        {/* ── CONNECTIVITY ── */}
        <View
          className="mx-4 mt-4 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E3DE' }}
        >
          <View className="flex-row items-center gap-2 mb-4">
            <Wifi size={16} color={CRIMSON} strokeWidth={2} />
            <Text
              className="text-xs font-extrabold tracking-widest"
              style={{ color: '#1A1A1A' }}
            >
              CONNECTIVITY
            </Text>
          </View>

          <View className="py-2">
            <Text
              className="text-[10px] font-bold tracking-widest mb-1"
              style={{ color: '#A89880' }}
            >
              GMAIL ADDRESS
            </Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>
              r.sanjose.driver@gmail.com
            </Text>
          </View>

          <View className="h-px my-1" style={{ backgroundColor: '#EDE7DE' }} />

          <View className="py-2">
            <Text
              className="text-[10px] font-bold tracking-widest mb-1"
              style={{ color: '#A89880' }}
            >
              HOME ADDRESS
            </Text>
            <Text className="text-base" style={{ color: '#1A1A1A' }}>
              42 Sampaguita St., Imus, Cavite
            </Text>
          </View>
        </View>

        {/* ── ACTIONS ── */}
        <TouchableOpacity
          className="flex-row items-center mx-4 mt-4 rounded-xl py-4 px-4"
          style={{ backgroundColor: GOLD }}
        >
          <View
            className="w-[38px] h-[38px] rounded-lg items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Receipt size={18} color="#fff" />
          </View>
          <Text className="flex-1 text-[15px] font-bold text-white ml-3">
            Transaction History
          </Text>
          <ChevronRight size={18} color="#fff" />
        </TouchableOpacity>

        {/* ── LOGOUT ── */}
        <TouchableOpacity
          onPress={() => router.replace('/auth/login')}
          className="flex-row items-center justify-center gap-2 mx-4 mt-4 py-4 rounded-xl"
          style={{ backgroundColor: CRIMSON }}
        >
          <LogOut size={16} color="white" strokeWidth={2} />
          <Text className="text-[15px] font-semibold text-white">
            Log Out
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}