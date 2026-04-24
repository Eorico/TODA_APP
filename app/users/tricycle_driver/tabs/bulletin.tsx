import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Calendar,
  FileText,
  Search,
  Package,
  ChevronRight,
  Wallet,
  Key,
  Smartphone,
} from 'lucide-react-native';
import AppHeader from '@/components/app_header';
import { events, agendas, fareMatrix, lostFound } from '@/constants/mockData';

const navItems = [
  { label: 'EVENTS', icon: <Calendar size={24} color="#0066FF" /> },
  { label: 'FARE MATRIX', icon: <Wallet size={24} color="#0066FF" /> },
  { label: 'AGENDAS', icon: <FileText size={24} color="#0066FF" /> },
  { label: 'LOST & FOUND', icon: <Search size={24} color="#0066FF" /> },
];

function getLostFoundIcon(icon: string) {
  switch (icon) {
    case 'wallet':
      return <Wallet size={20} color="#666" />;
    case 'key':
      return <Key size={20} color="#666" />;
    case 'smartphone':
      return <Smartphone size={20} color="#666" />;
    default:
      return <Package size={20} color="#666" />;
  }
}

export default function BulletinScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">

      <AppHeader
        title="TRIKEDRIVE PRO"
        avatarUrl="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* NAVIGATION */}
        <View className="bg-white py-4 px-4 mb-2">

          <Text className="text-[10px] font-semibold text-textMuted tracking-widest mb-3">
            BULLETIN BOARD NAVIGATION
          </Text>

          <View className="flex-row flex-wrap justify-between gap-3">

            {navItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                className="w-[46%] items-center gap-2 py-3 bg-background rounded-xl"
              >
                <View className="w-12 h-12 rounded-xl bg-primaryLight items-center justify-center">
                  {item.icon}
                </View>

                <Text className="text-[11px] font-bold text-textPrimary tracking-wide">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

          </View>
        </View>

        {/* EVENTS */}
        <View className="bg-white px-4 pt-4 pb-5 mb-2">

          <View className="flex-row items-center gap-2 mb-3">
            <Calendar size={18} color="#0066FF" />
            <Text className="text-[16px] font-black text-primary tracking-wide">
              DRIVER EVENTS
            </Text>
          </View>

          {events.map((event, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row items-center justify-between py-3 border-b border-border"
            >
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-textMuted tracking-widest">
                  {event.date}
                </Text>

                <Text className="text-[15px] font-bold text-textPrimary mt-1">
                  {event.title}
                </Text>

                <Text className="text-[12px] text-textSecondary mt-1">
                  {event.description}
                </Text>
              </View>

              <ChevronRight size={16} color="#999" />
            </TouchableOpacity>
          ))}

        </View>

        {/* AGENDA */}
        <View className="bg-white px-4 pt-4 pb-5 mb-2">

          <View className="flex-row items-center gap-2 mb-3">
            <FileText size={18} color="#0066FF" />
            <Text className="text-[16px] font-black text-primary tracking-wide">
              AGENDAS & MINUTES
            </Text>
          </View>

          <View className="bg-background rounded-xl overflow-hidden">

            {agendas.map((agenda, idx) => (
              <TouchableOpacity
                key={idx}
                className={`flex-row items-center gap-3 p-3 ${
                  idx !== agendas.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <View className="w-9 h-9 rounded-lg bg-white items-center justify-center border border-border">
                  <FileText size={18} color="#666" />
                </View>

                <View className="flex-1">
                  <Text className="text-[13px] font-bold text-textPrimary">
                    {agenda.title}
                  </Text>

                  <Text className="text-[10px] text-textMuted tracking-wide">
                    {agenda.postedAgo} · {agenda.fileSize}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

          </View>
        </View>

        {/* FARE MATRIX */}
        <View className="bg-white px-4 pt-4 pb-5 mb-2">

          <View className="flex-row items-center gap-2 mb-2">
            <Wallet size={18} color="#0066FF" />

            <View>
              <Text className="text-[16px] font-black text-primary tracking-wide">
                UPDATED FARE MATRIX
              </Text>
              <Text className="text-[10px] text-textMuted">
                REVISION ID: #2023-F4
              </Text>
            </View>
          </View>

          <View className="border border-border rounded-xl overflow-hidden">

            {/* HEADER */}
            <View className="flex-row bg-background px-3 py-2 border-b border-border">
              <Text className="flex-[1.5] text-[9px] font-bold text-textSecondary">
                DISTANCE RANGE
              </Text>
              <Text className="flex-1 text-[9px] font-bold text-textSecondary">
                BASE FARE
              </Text>
              <Text className="flex-1 text-[9px] font-bold text-textSecondary">
                SENIOR/PWD
              </Text>
              <Text className="flex-1 text-[9px] font-bold text-textSecondary">
                ACTION
              </Text>
            </View>

            {fareMatrix.map((row, idx) => (
              <View
                key={idx}
                className="flex-row px-3 py-3 border-b border-border items-center"
              >
                <Text className="flex-[1.5] font-bold text-textPrimary">
                  {row.range}
                </Text>
                <Text className="flex-1 text-textPrimary">
                  {row.base}
                </Text>
                <Text className="flex-1 text-textPrimary">
                  {row.seniorPwd}
                </Text>
                <Text className="flex-1 text-textMuted">···</Text>
              </View>
            ))}

            <Text className="text-[10px] text-textMuted italic px-3 py-2">
              *fares are subject to change during peak hours (17:00–19:00)
            </Text>

          </View>
        </View>

        {/* LOST & FOUND */}
        <View className="bg-white px-4 pt-4 pb-8">

          <View className="flex-row items-center gap-2 mb-3">
            <Search size={18} color="#0066FF" />
            <Text className="text-[16px] font-black text-primary">
              LOST & FOUND
            </Text>
          </View>

          {lostFound.map((item) => (
            <View key={item.id} className="bg-background rounded-xl p-3 mb-3">

              <View className="flex-row justify-between mb-2">

                <View className="w-11 h-11 rounded-xl bg-white border border-border items-center justify-center">
                  {getLostFoundIcon(item.icon)}
                </View>

                <View
                  className={`px-2 py-1 rounded ${
                    item.status === 'RESOLVED'
                      ? 'bg-green-100'
                      : 'bg-primaryLight'
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold ${
                      item.status === 'RESOLVED'
                        ? 'text-green-700'
                        : 'text-primary'
                    }`}
                  >
                    {item.status}
                  </Text>
                </View>

              </View>

              <Text className="text-[14px] font-bold text-textPrimary mb-1">
                {item.title}
              </Text>

              <Text className="text-[12px] text-textSecondary mb-2">
                {item.description}
              </Text>

              <View className="flex-row justify-between items-center">

                <Text className="text-[11px] text-textMuted font-semibold">
                  {item.date}
                </Text>

                <Text
                  className={`text-[12px] font-bold ${
                    item.status === 'RESOLVED'
                      ? 'text-textMuted'
                      : 'text-gold'
                  }`}
                >
                  {item.action}
                </Text>

              </View>

            </View>
          ))}

        </View>

        <View className="h-8" />

      </ScrollView>
    </SafeAreaView>
  );
}