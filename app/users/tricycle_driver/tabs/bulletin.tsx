import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Platform,
} from 'react-native';
import {
  Calendar, FileText, Search, Package,
  ChevronRight, Wallet, Key, Smartphone,
  Megaphone, Shield,
} from 'lucide-react-native';
import { events, agendas, fareMatrix, lostFound } from '@/constants/mockData';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';
const CARD    = '#FFFFFF';

const OFFICERS = [
  { name: 'Ricardo Santos',  role: 'President',      initial: 'RS' },
  { name: 'Maria Dela Cruz', role: 'Vice President',  initial: 'MD' },
  { name: 'Jose Reyes',      role: 'Secretary',       initial: 'JR' },
  { name: 'Ana Bonifacio',   role: 'Treasurer',       initial: 'AB' },
  { name: 'Pedro Lim',       role: 'Auditor',         initial: 'PL' },
  { name: 'Luz Villanueva',  role: 'PRO',             initial: 'LV' },
];

const ANNOUNCEMENTS = [
  {
    tag: 'TODA NOTICE',
    date: 'Today',
    title: 'Holiday Schedule Update',
    body: 'Operations will be limited on May 12. Reduced routes apply in all zones.',
    isNew: true,
  },
  {
    tag: 'SAFETY',
    date: 'May 3',
    title: 'Helmet Policy Reminder',
    body: 'All drivers are reminded to ensure passengers wear helmets during the entire ride.',
    isNew: false,
  },
];

function getLostFoundIcon(icon: string) {
  const color = '#888';
  switch (icon) {
    case 'wallet':     return <Wallet     size={18} color={color} />;
    case 'key':        return <Key        size={18} color={color} />;
    case 'smartphone': return <Smartphone size={18} color={color} />;
    default:           return <Package    size={18} color={color} />;
  }
}

function SectionHeader({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
}) {
  return (
    <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
      <View
        className="w-8 h-8 rounded-lg items-center justify-center"
        style={{ backgroundColor: '#F0E8E4' }}
      >
        {icon}
      </View>
      <View>
        <Text className="text-[15px] font-extrabold tracking-wide" style={{ color: CRIMSON }}>
          {title}
        </Text>
        {sub && (
          <Text className="text-[10px]" style={{ color: '#A89880' }}>
            {sub}
          </Text>
        )}
      </View>
    </View>
  );
}

export default function BulletinScreen() {
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const navItems = [
    { id: 'events',   label: 'Events',       icon: <Calendar  size={20} color={CRIMSON} /> },
    { id: 'fare',     label: 'Fare\nMatrix',  icon: <Wallet    size={20} color={CRIMSON} /> },
    { id: 'officers', label: 'Officers',      icon: <Shield    size={20} color={CRIMSON} /> },
    { id: 'agendas',  label: 'Agendas',       icon: <FileText  size={20} color={CRIMSON} /> },
    { id: 'lost',     label: 'Lost &\nFound', icon: <Search    size={20} color={CRIMSON} /> },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: BG }}>
      <StatusBar barStyle="light-content" backgroundColor={CRIMSON} />

      {/* ── HEADER ── */}
      <View
        style={{
          backgroundColor: CRIMSON,
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 16,
          marginTop: 30,
        }}
      >
        <Text style={{ color: GOLD, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginBottom: 2 }}>
          MAMTTODA
        </Text>
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>
          Driver Bulletin
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          Stay informed · Drive safe
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 100 : 86,
        }}
      >

        {/* ── QUICK NAV ── */}
        <View className="px-4 pt-4 pb-4 mb-2" style={{ backgroundColor: CARD }}>
          <Text
            className="text-[10px] font-semibold tracking-widest mb-3"
            style={{ color: '#A89880' }}
          >
            QUICK ACCESS
          </Text>
          <View className="flex-row flex-wrap justify-between" style={{ gap: 8 }}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setActiveNav(item.id)}
                className="items-center py-3 rounded-xl"
                style={{
                  width: '18%',
                  gap: 6,
                  backgroundColor: activeNav === item.id ? '#F0E8E4' : BG,
                }}
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{
                    backgroundColor: activeNav === item.id ? '#E8D8D0' : CARD,
                    borderWidth: 0.5,
                    borderColor: '#E0D8D0',
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  className="text-[9px] font-bold text-center"
                  style={{ color: '#1A1A1A', lineHeight: 13 }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── ANNOUNCEMENTS ── */}
        <View className="px-4 pt-4 pb-4 mb-2" style={{ backgroundColor: CARD }}>
          <SectionHeader
            icon={<Megaphone size={16} color={CRIMSON} />}
            title="Announcements"
          />
          {ANNOUNCEMENTS.map((item, idx) => (
            <View
              key={idx}
              className="rounded-xl p-3"
              style={{
                backgroundColor: BG,
                marginBottom: idx < ANNOUNCEMENTS.length - 1 ? 8 : 0,
                borderLeftWidth: 3,
                borderLeftColor: item.isNew ? GOLD : '#D0C8C0',
              }}
            >
              <View className="flex-row justify-between mb-1">
                <Text
                  className="text-[9px] font-bold tracking-wide"
                  style={{ color: '#A89880' }}
                >
                  {item.tag} · {item.date}
                </Text>
                {item.isNew && (
                  <View className="rounded-full px-2 py-0.5" style={{ backgroundColor: GOLD }}>
                    <Text className="text-[9px] font-bold" style={{ color: '#4A2800' }}>
                      NEW
                    </Text>
                  </View>
                )}
              </View>
              <Text className="text-[14px] font-bold mb-1" style={{ color: '#1A1A1A' }}>
                {item.title}
              </Text>
              <Text className="text-[12px]" style={{ color: '#6B6059', lineHeight: 17 }}>
                {item.body}
              </Text>
            </View>
          ))}
        </View>

        {/* ── DRIVER EVENTS ── */}
        <View className="px-4 pt-4 pb-4 mb-2" style={{ backgroundColor: CARD }}>
          <SectionHeader
            icon={<Calendar size={16} color={CRIMSON} />}
            title="Driver Events"
          />
          {events.map((event, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row items-center justify-between py-3"
              style={{
                borderBottomWidth: idx < events.length - 1 ? 0.5 : 0,
                borderBottomColor: '#EDE7DE',
              }}
            >
              <View className="flex-1">
                <Text
                  className="text-[10px] font-bold tracking-widest"
                  style={{ color: '#A89880' }}
                >
                  {event.date}
                </Text>
                <Text className="text-[14px] font-bold mt-1" style={{ color: '#1A1A1A' }}>
                  {event.title}
                </Text>
                <Text
                  className="text-[12px] mt-1"
                  style={{ color: '#6B6059', lineHeight: 17 }}
                >
                  {event.description}
                </Text>
              </View>
              <ChevronRight size={14} color="#C0B8B0" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── FARE MATRIX ── */}
        <View className="px-4 pt-4 pb-4 mb-2" style={{ backgroundColor: CARD }}>
          <SectionHeader
            icon={<Wallet size={16} color={CRIMSON} />}
            title="Fare Matrix"
            sub="Rev. #2023-F4 · Updated March 2024"
          />
          <View
            className="rounded-xl overflow-hidden"
            style={{ borderWidth: 0.5, borderColor: '#E0D8D0' }}
          >
            <View className="flex-row px-3 py-2" style={{ backgroundColor: CRIMSON }}>
              <Text
                className="text-[10px] font-bold"
                style={{ flex: 1.5, color: 'rgba(255,255,255,0.75)' }}
              >
                DISTANCE
              </Text>
              <Text className="flex-1 text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                REGULAR
              </Text>
              <Text className="flex-1 text-[10px] font-bold" style={{ color: GOLD }}>
                SENIOR/PWD
              </Text>
            </View>
            {fareMatrix.map((row, idx) => (
              <View
                key={idx}
                className="flex-row px-3 items-center"
                style={{
                  paddingVertical: 11,
                  backgroundColor: idx % 2 === 0 ? CARD : BG,
                  borderTopWidth: 0.5,
                  borderTopColor: '#EDE7DE',
                }}
              >
                <Text
                  className="font-bold text-[13px]"
                  style={{ flex: 1.5, color: '#1A1A1A' }}
                >
                  {row.range}
                </Text>
                <Text className="flex-1 text-[13px]" style={{ color: '#1A1A1A' }}>
                  {row.base}
                </Text>
                <Text className="flex-1 text-[13px] font-semibold" style={{ color: CRIMSON }}>
                  {row.seniorPwd}
                </Text>
              </View>
            ))}
            <View style={{ backgroundColor: '#FFF8EC', paddingHorizontal: 12, paddingVertical: 7 }}>
              <Text className="text-[10px] italic" style={{ color: '#A89880' }}>
                Peak hour surcharge applies 17:00–19:00
              </Text>
            </View>
          </View>
        </View>

        {/* ── CURRENT OFFICERS ── */}
        <View className="px-4 pt-4 pb-4 mb-2" style={{ backgroundColor: CARD }}>
          <SectionHeader
            icon={<Shield size={16} color={CRIMSON} />}
            title="Current Officers"
            sub="MAMTTODA Board · 2024–2025"
          />
          {OFFICERS.map((officer, idx) => (
            <View
              key={idx}
              className="flex-row items-center py-3"
              style={{
                borderBottomWidth: idx < OFFICERS.length - 1 ? 0.5 : 0,
                borderBottomColor: '#EDE7DE',
              }}
            >
              {/* Avatar */}
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{
                  backgroundColor: idx === 0 ? CRIMSON : '#F0E8E4',
                }}
              >
                <Text
                  className="text-[12px] font-bold"
                  style={{ color: idx === 0 ? GOLD : CRIMSON }}
                >
                  {officer.initial}
                </Text>
              </View>

              {/* Name & Role */}
              <View className="flex-1">
                <Text className="text-[14px] font-bold" style={{ color: '#1A1A1A' }}>
                  {officer.name}
                </Text>
                <Text className="text-[11px] mt-0.5" style={{ color: '#A89880' }}>
                  {officer.role}
                </Text>
              </View>

              {/* President badge */}
              {idx === 0 && (
                <View
                  className="rounded-full px-2 py-1"
                  style={{ backgroundColor: '#F0E8E4' }}
                >
                  <Text className="text-[9px] font-bold" style={{ color: CRIMSON }}>
                    PRESIDENT
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ── AGENDAS & MINUTES ── */}
        <View className="px-4 pt-4 pb-4 mb-2" style={{ backgroundColor: CARD }}>
          <SectionHeader
            icon={<FileText size={16} color={CRIMSON} />}
            title="Agendas & Minutes"
          />
          <View className="rounded-xl overflow-hidden" style={{ backgroundColor: BG }}>
            {agendas.map((agenda, idx) => (
              <TouchableOpacity
                key={idx}
                className="flex-row items-center p-3"
                style={{
                  gap: 12,
                  borderBottomWidth: idx < agendas.length - 1 ? 0.5 : 0,
                  borderBottomColor: '#E0D8D0',
                }}
              >
                <View
                  className="w-9 h-9 rounded-lg items-center justify-center"
                  style={{
                    backgroundColor: CARD,
                    borderWidth: 0.5,
                    borderColor: '#E0D8D0',
                  }}
                >
                  <FileText size={16} color="#888" />
                </View>
                <View className="flex-1">
                  <Text className="text-[13px] font-bold" style={{ color: '#1A1A1A' }}>
                    {agenda.title}
                  </Text>
                  <Text className="text-[10px] mt-0.5" style={{ color: '#A89880' }}>
                    {agenda.postedAgo} · {agenda.fileSize}
                  </Text>
                </View>
                <ChevronRight size={14} color="#C0B8B0" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── LOST & FOUND ── */}
        <View className="px-4 pt-4 pb-4" style={{ backgroundColor: CARD }}>
          <SectionHeader
            icon={<Search size={16} color={CRIMSON} />}
            title="Lost & Found"
          />
          {lostFound.map((item) => (
            <View
              key={item.id}
              className="rounded-xl p-3 mb-2"
              style={{ backgroundColor: BG }}
            >
              <View className="flex-row justify-between mb-2">
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{
                    backgroundColor: CARD,
                    borderWidth: 0.5,
                    borderColor: '#E0D8D0',
                  }}
                >
                  {getLostFoundIcon(item.icon)}
                </View>
                <View
                  className="rounded-full px-2 py-0.5 self-start"
                  style={{
                    backgroundColor: item.status === 'RESOLVED' ? '#D1FAE5' : '#F0E8E4',
                  }}
                >
                  <Text
                    className="text-[9px] font-bold"
                    style={{
                      color: item.status === 'RESOLVED' ? '#065F46' : CRIMSON,
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text className="text-[14px] font-bold mb-1" style={{ color: '#1A1A1A' }}>
                {item.title}
              </Text>
              <Text
                className="text-[12px] mb-2"
                style={{ color: '#6B6059', lineHeight: 17 }}
              >
                {item.description}
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-[11px]" style={{ color: '#A89880' }}>
                  {item.date}
                </Text>
                <Text
                  className="text-[12px] font-bold"
                  style={{ color: item.status === 'RESOLVED' ? '#A89880' : GOLD }}
                >
                  {item.action}
                </Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}