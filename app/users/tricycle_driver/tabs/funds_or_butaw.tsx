import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  Wrench,
  Briefcase,
  Megaphone,
  ChevronRight,
  Wallet,
} from 'lucide-react-native';

import AppHeader from '@/components/app_header';
import { butawLog, associationFees, communityFunds } from '@/constants/mockData';

function CommunityFundIcon({ icon }: { icon: string }) {
  const color = '#0066FF';

  switch (icon) {
    case 'wrench':
      return <Wrench size={20} color={color} />;
    case 'briefcase':
      return <Briefcase size={20} color={color} />;
    case 'megaphone':
      return <Megaphone size={20} color={color} />;
    default:
      return <Wallet size={20} color={color} />;
  }
}

export default function FundsOrButawScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">

      <AppHeader
        title="DRIVER LEDGER"
        avatarUrl="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View className="bg-white px-4 pt-5 pb-4">

          <Text className="text-[26px] font-black text-primary leading-8 mb-1">
            Community Fees &{"\n"}Records
          </Text>

          <Text className="text-[13px] text-textSecondary">
            Tricycle Unit #402 · Verified Member
          </Text>

        </View>

        {/* TOTAL FUNDS */}
        <View className="bg-primary mx-4 mt-4 rounded-2xl p-4">

          <Text className="text-[10px] font-bold text-white/70 tracking-widest mb-2">
            TOTAL COMMUNITY FUNDS (THIS MONTH)
          </Text>

          <View className="flex-row items-center gap-2 flex-wrap mb-2">
            <Text className="text-[28px] font-black text-white">
              ₱84,250.00
            </Text>

            <View className="flex-row items-center bg-white/20 px-2 py-1 rounded-md gap-1">
              <TrendingUp size={10} color="#fff" />
              <Text className="text-[10px] text-white font-semibold">
                +12% vs last month
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-1 mb-3">
            <Users size={13} color="#A5C8FF" />
            <Text className="text-[11px] text-white/70">
              Pool contribution from 142 active members
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center gap-2 border border-white/40 px-3 py-2 rounded-lg self-start">
            <FileText size={14} color="#fff" />
            <Text className="text-white text-[12px] font-semibold">
              Audit Report
            </Text>
          </TouchableOpacity>

        </View>

        {/* BUTAW TOTAL */}
        <View className="bg-white px-4 py-5 mt-2">

          <Text className="text-[10px] font-bold text-textMuted tracking-widest mb-1">
            YOUR MONTHLY BUTAW TOTAL
          </Text>

          <Text className="text-[34px] font-black text-primary mb-1">
            ₱1,250.00
          </Text>

          <View className="flex-row items-center gap-1">
            <TrendingUp size={13} color="#F4B400" />
            <Text className="text-[13px] font-semibold text-gold">
              25/31 Days Completed
            </Text>
          </View>

        </View>

        {/* NEXT FEE */}
        <View className="bg-yellow-700 mx-4 mt-4 rounded-2xl p-5 items-center">

          <Wallet size={20} color="#fff" />

          <Text className="text-[11px] font-bold text-white/70 mt-2">
            NEXT ASSOCIATION FEE
          </Text>

          <Text className="text-[20px] font-extrabold text-white mt-1">
            Nov 01, 2024
          </Text>

          <Text className="text-[15px] text-white/80 font-semibold">
            ₱500.00
          </Text>

        </View>

        {/* BUTAW LOG */}
        <View className="bg-white px-4 py-5 mt-2">

          <View className="flex-row justify-between items-center mb-3">

            <Text className="text-[16px] font-bold text-textPrimary">
              Daily Butaw Log
            </Text>

            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-gold text-[13px] font-semibold">
                View All
              </Text>
              <ChevronRight size={14} color="#F4B400" />
            </TouchableOpacity>

          </View>

          {butawLog.map((item, idx) => (
            <View
              key={idx}
              className={`flex-row items-center py-3 gap-3 ${
                idx !== butawLog.length - 1 ? 'border-b border-border' : ''
              }`}
            >

              <View className="w-9 h-9 rounded-lg bg-primaryLight items-center justify-center">
                <Calendar size={16} color="#0066FF" />
              </View>

              <View className="flex-1">
                <Text className="text-[13px] font-bold text-textPrimary">
                  {item.date}
                </Text>
                <Text className="text-[11px] text-textSecondary">
                  {item.label}
                </Text>
              </View>

              <View className="items-end">

                <Text className="text-[14px] font-bold text-textPrimary">
                  {item.amount}
                </Text>

                <View
                  className={`flex-row items-center gap-1 px-2 py-0.5 rounded ${
                    item.status === 'PAID'
                      ? 'bg-green-100'
                      : 'bg-yellow-100'
                  }`}
                >
                  {item.status === 'PAID' ? (
                    <CheckCircle size={10} color="#16A34A" />
                  ) : (
                    <Clock size={10} color="#F59E0B" />
                  )}

                  <Text
                    className={`text-[10px] font-bold ${
                      item.status === 'PAID'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {item.status}
                  </Text>

                </View>

              </View>

            </View>
          ))}

        </View>

        {/* ASSOCIATION FEES */}
        <View className="bg-white px-4 py-5 mt-2">

          <Text className="text-[16px] font-bold text-textPrimary mb-3">
            Association Fees History
          </Text>

          {associationFees.map((fee, idx) => (
            <View
              key={idx}
              className={`flex-row items-center py-3 gap-3 ${
                idx !== associationFees.length - 1
                  ? 'border-b border-border'
                  : ''
              }`}
            >

              <CheckCircle size={18} color="#F4B400" />

              <View className="flex-1">
                <Text className="text-[13px] font-bold text-textPrimary">
                  {fee.title}
                </Text>
                <Text className="text-[11px] text-textSecondary">
                  {fee.batch}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-[14px] font-bold text-textPrimary">
                  {fee.amount}
                </Text>
                <Text className="text-[10px] text-textMuted">
                  {fee.paidOn}
                </Text>
              </View>

            </View>
          ))}

        </View>

        {/* COMMUNITY FUNDS */}
        <View className="bg-white px-4 py-5 mt-2 mb-8">

          <Text className="text-[17px] font-bold text-textPrimary mb-3">
            Community Fund Transparency
          </Text>

          {communityFunds.map((fund, idx) => (
            <View
              key={idx}
              className={`py-4 gap-1 ${
                idx !== communityFunds.length - 1
                  ? 'border-b border-border'
                  : ''
              }`}
            >

              <View className="w-10 h-10 rounded-lg bg-primaryLight items-center justify-center mb-2">
                <CommunityFundIcon icon={fund.icon} />
              </View>

              <Text className="text-[16px] font-bold text-textPrimary">
                {fund.amount}
              </Text>

              <Text className="text-[14px] font-bold text-textPrimary">
                {fund.label}
              </Text>

              <Text className="text-[12px] text-textSecondary">
                {fund.description}
              </Text>

            </View>
          ))}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}