import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView,
  Platform,
} from 'react-native';
import {
  TrendingUp, Users, FileText, Calendar, CheckCircle,
  Clock, Wrench, Briefcase, Megaphone, ChevronRight, Wallet,
} from 'lucide-react-native';
import { butawLog, associationFees, communityFunds } from '@/constants/mockData';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';

function CommunityFundIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'wrench':    return <Wrench    size={20} color={CRIMSON} />;
    case 'briefcase': return <Briefcase size={20} color={CRIMSON} />;
    case 'megaphone': return <Megaphone size={20} color={CRIMSON} />;
    default:          return <Wallet    size={20} color={CRIMSON} />;
  }
}

export default function FundsOrButawScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
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
          Driver Funds
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          Stay informed · Track your contributions
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 100 : 86,
        }}
      >

        {/* HEADER */}
        <View className="bg-white px-4 pt-5 pb-4">
          <Text className="text-[26px] font-black leading-8 mb-1" style={{ color: CRIMSON }}>
            Community Fees &{'\n'}Records
          </Text>
          <Text className="text-[13px]" style={{ color: '#6B6059' }}>
            Tricycle Unit #402 · Verified Member
          </Text>
        </View>

        {/* TOTAL FUNDS CARD */}
        <View className="mx-4 mt-4 rounded-2xl p-4" style={{ backgroundColor: CRIMSON }}>
          <Text className="text-[10px] font-bold tracking-widest mb-2"
            style={{ color: 'rgba(255,255,255,0.7)' }}>
            TOTAL COMMUNITY FUNDS (THIS MONTH)
          </Text>
          <View className="flex-row items-center gap-2 flex-wrap mb-2">
            <Text className="text-[28px] font-black text-white">₱84,250.00</Text>
            <View className="flex-row items-center px-2 py-1 rounded-md gap-1"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <TrendingUp size={10} color="#fff" />
              <Text className="text-[10px] text-white font-semibold">+12% vs last month</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1 mb-3">
            <Users size={13} color="rgba(255,255,255,0.7)" />
            <Text className="text-[11px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Pool contribution from 142 active members
            </Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center gap-2 px-3 py-2 rounded-lg self-start border"
            style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
            <FileText size={14} color="#fff" />
            <Text className="text-white text-[12px] font-semibold">Audit Report</Text>
          </TouchableOpacity>
        </View>

        {/* BUTAW TOTAL */}
        <View className="bg-white px-4 py-5 mt-2">
          <Text className="text-[10px] font-bold tracking-widest mb-1" style={{ color: '#A89880' }}>
            YOUR MONTHLY BUTAW TOTAL
          </Text>
          <Text className="text-[34px] font-black mb-1" style={{ color: CRIMSON }}>
            ₱1,250.00
          </Text>
          <View className="flex-row items-center gap-1">
            <TrendingUp size={13} color={GOLD} />
            <Text className="text-[13px] font-semibold" style={{ color: GOLD }}>
              25/31 Days Completed
            </Text>
          </View>
        </View>

        {/* NEXT FEE */}
        <View className="mx-4 mt-4 rounded-2xl p-5 items-center"
          style={{ backgroundColor: GOLD }}>
          <Wallet size={20} color="#fff" />
          <Text className="text-[11px] font-bold mt-2"
            style={{ color: 'rgba(255,255,255,0.8)' }}>
            NEXT ASSOCIATION FEE
          </Text>
          <Text className="text-[20px] font-extrabold text-white mt-1">Nov 01, 2024</Text>
          <Text className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
            ₱500.00
          </Text>
        </View>

        {/* BUTAW LOG */}
        <View className="bg-white px-4 py-5 mt-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[16px] font-bold" style={{ color: '#1A1A1A' }}>
              Daily Butaw Log
            </Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-[13px] font-semibold" style={{ color: GOLD }}>View All</Text>
              <ChevronRight size={14} color={GOLD} />
            </TouchableOpacity>
          </View>
          {butawLog.map((item, idx) => (
            <View key={idx}
              className={`flex-row items-center py-3 gap-3 ${
                idx !== butawLog.length - 1 ? 'border-b border-border' : ''
              }`}>
              <View className="w-9 h-9 rounded-lg items-center justify-center"
                style={{ backgroundColor: '#F0E8E4' }}>
                <Calendar size={16} color={CRIMSON} />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold" style={{ color: '#1A1A1A' }}>
                  {item.date}
                </Text>
                <Text className="text-[11px]" style={{ color: '#6B6059' }}>{item.label}</Text>
              </View>
              <View className="items-end">
                <Text className="text-[14px] font-bold" style={{ color: '#1A1A1A' }}>
                  {item.amount}
                </Text>
                <View className={`flex-row items-center gap-1 px-2 py-0.5 rounded ${
                  item.status === 'PAID' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {item.status === 'PAID'
                    ? <CheckCircle size={10} color="#16A34A" />
                    : <Clock size={10} color="#F59E0B" />}
                  <Text className={`text-[10px] font-bold ${
                    item.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ASSOCIATION FEES */}
        <View className="bg-white px-4 py-5 mt-2">
          <Text className="text-[16px] font-bold mb-3" style={{ color: '#1A1A1A' }}>
            Association Fees History
          </Text>
          {associationFees.map((fee, idx) => (
            <View key={idx}
              className={`flex-row items-center py-3 gap-3 ${
                idx !== associationFees.length - 1 ? 'border-b border-border' : ''
              }`}>
              <CheckCircle size={18} color={GOLD} />
              <View className="flex-1">
                <Text className="text-[13px] font-bold" style={{ color: '#1A1A1A' }}>
                  {fee.title}
                </Text>
                <Text className="text-[11px]" style={{ color: '#6B6059' }}>{fee.batch}</Text>
              </View>
              <View className="items-end">
                <Text className="text-[14px] font-bold" style={{ color: '#1A1A1A' }}>
                  {fee.amount}
                </Text>
                <Text className="text-[10px]" style={{ color: '#A89880' }}>{fee.paidOn}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* COMMUNITY FUNDS */}
        <View className="bg-white px-4 py-5 mt-2 mb-8">
          <Text className="text-[17px] font-bold mb-3" style={{ color: '#1A1A1A' }}>
            Community Fund Transparency
          </Text>
          {communityFunds.map((fund, idx) => (
            <View key={idx}
              className={`py-4 gap-1 ${
                idx !== communityFunds.length - 1 ? 'border-b border-border' : ''
              }`}>
              <View className="w-10 h-10 rounded-lg items-center justify-center mb-2"
                style={{ backgroundColor: '#F0E8E4' }}>
                <CommunityFundIcon icon={fund.icon} />
              </View>
              <Text className="text-[16px] font-bold" style={{ color: '#1A1A1A' }}>
                {fund.amount}
              </Text>
              <Text className="text-[14px] font-bold" style={{ color: '#1A1A1A' }}>
                {fund.label}
              </Text>
              <Text className="text-[12px]" style={{ color: '#6B6059' }}>
                {fund.description}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}