import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  BadgeCheck,
  Info,
  PenLine,
  Shield,
  Receipt,
  ChevronRight,
  LogOut,
  Upload,
} from 'lucide-react-native';
import AppHeader from '@/components/app_header';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">

      <AppHeader
        title="TRIKEDRIVE PRO"
        avatarUrl="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View className="px-4 pt-5 pb-2 bg-white mb-3">
          <Text className="text-[26px] font-black text-primary mb-1">
            Account Settings
          </Text>
          <Text className="text-[13px] text-textSecondary mb-3">
            Manage your driver identity and security
          </Text>
        </View>

        {/* FULL NAME */}
        <View className="bg-white mx-4 mb-2.5 rounded-xl p-4 border-l-4 border-gold">
          <Text className="text-[10px] font-bold text-textMuted tracking-widest mb-1">
            FULL NAME
          </Text>
          <Text className="text-[17px] font-bold text-textPrimary">
            Ricardo San Jose
          </Text>
        </View>

        {/* BODY NUMBER */}
        <View className="bg-white mx-4 mb-2.5 rounded-xl p-4 border-l-4 border-gold">
          <Text className="text-[10px] font-bold text-textMuted tracking-widest mb-1">
            BODY NUMBER
          </Text>
          <Text className="text-[26px] font-black text-textPrimary">
            #1082
          </Text>
        </View>

        {/* PHONE */}
        <View className="bg-white mx-4 mb-2.5 rounded-xl p-4 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-[10px] font-bold text-textMuted tracking-widest mb-1">
              REGISTERED PHONE
            </Text>
            <Text className="text-[17px] font-bold text-textPrimary">
              +63 917 123 4567
            </Text>
          </View>

          <View className="p-1">
            <BadgeCheck size={22} color="#FFD700" fill="#FFD700" />
          </View>
        </View>

        {/* LICENSE CARD */}
        <View className="bg-white mx-4 mb-5 rounded-xl p-4 border-l-4 border-gold">

          <View className="flex-row justify-between mb-4">

            <View className="gap-2">
              <Text className="text-[10px] font-bold text-textMuted tracking-widest">
                DRIVER LICENSE STATUS
              </Text>

              <View className="flex-row items-center bg-primary px-2.5 py-1.5 rounded-full self-start">
                <BadgeCheck size={12} color="#fff" />
                <Text className="text-white text-[11px] font-bold ml-1">
                  VERIFIED
                </Text>
              </View>
            </View>

            <TouchableOpacity className="items-center p-2">
              <Upload size={16} color="#666" />
              <Text className="text-[10px] font-bold text-textSecondary text-center leading-3 mt-1">
                UPDATE{"\n"}LICENSE
              </Text>
            </TouchableOpacity>

          </View>

          <View className="border-t border-border pt-3 gap-1.5">
            <Text className="text-[10px] font-bold text-textMuted tracking-widest">
              LICENSE EXPIRY DATE
            </Text>

            <Text className="text-[18px] font-extrabold text-textPrimary">
              December 15, 2026
            </Text>

            <View className="flex-row items-center gap-1">
              <Info size={13} color="#999" />
              <Text className="text-[12px] text-textMuted">
                Valid for 2 more years
              </Text>
            </View>
          </View>

        </View>

        {/* ACTION BUTTONS */}

        <TouchableOpacity className="flex-row items-center mx-4 mb-2.5 rounded-xl py-4 px-4 bg-primary">

          <View className="w-[38px] h-[38px] rounded-lg items-center justify-center bg-white/20">
            <PenLine size={18} color="#fff" />
          </View>

          <Text className="flex-1 text-[15px] font-bold text-white ml-3">
            Edit Profile
          </Text>

          <ChevronRight size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center mx-4 mb-2.5 rounded-xl py-4 px-4 border border-border bg-background">

          <View className="w-[38px] h-[38px] rounded-lg items-center justify-center bg-border">
            <Shield size={18} color="#666" />
          </View>

          <Text className="flex-1 text-[15px] font-bold text-textSecondary ml-3">
            Account Security
          </Text>

          <ChevronRight size={18} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center mx-4 mb-2.5 rounded-xl py-4 px-4 bg-gold">

          <View className="w-[38px] h-[38px] rounded-lg items-center justify-center bg-white/20">
            <Receipt size={18} color="#fff" />
          </View>

          <Text className="flex-1 text-[15px] font-bold text-white ml-3">
            Transaction History
          </Text>

          <ChevronRight size={18} color="#fff" />
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity onPress={() => router.replace('/auth/login')} className="flex-row items-center justify-center gap-2 mt-2 mb-8 py-3">

          <LogOut size={16} color="#0066FF" />

          <Text className="text-[14px] font-bold text-primary tracking-widest">
            LOG OUT
          </Text>

        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}