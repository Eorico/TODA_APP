// app/(passenger)/bulletin.tsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar,
} from 'react-native';
import {
  FileText, Search, Package, Wallet,
  Key, Smartphone, Megaphone, ChevronRight,
  Shield, Users, Star,
} from 'lucide-react-native';
import { agendas, fareMatrix, lostFound } from '@/constants/mockData';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';
const CARD    = '#FFFFFF';

// ─── mock officers ──────────────────────────────────────────────
const OFFICERS = [
  { name: 'Ricardo Santos',   role: 'President',          initial: 'RS' },
  { name: 'Maria Dela Cruz',  role: 'Vice President',     initial: 'MD' },
  { name: 'Jose Reyes',       role: 'Secretary',          initial: 'JR' },
  { name: 'Ana Bonifacio',    role: 'Treasurer',          initial: 'AB' },
  { name: 'Pedro Lim',        role: 'Auditor',            initial: 'PL' },
  { name: 'Luz Villanueva',   role: 'PRO',                initial: 'LV' },
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
    body: 'All passengers are reminded to wear helmets during the entire ride.',
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

// ─── section header ─────────────────────────────────────────────
function SectionHeader({ icon, title, sub }: { icon: React.ReactNode; title: string; sub?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
      <View style={{
        width: 32, height: 32, borderRadius: 8,
        backgroundColor: '#F0E8E4',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: '800', color: CRIMSON, letterSpacing: 0.3 }}>
          {title}
        </Text>
        {sub && <Text style={{ fontSize: 10, color: '#A89880' }}>{sub}</Text>}
      </View>
    </View>
  );
}

export default function PassengerBulletinScreen() {
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const navItems = [
    { id: 'fare',     label: 'Fare\nMatrix',   icon: <Wallet   size={20} color={CRIMSON} /> },
    { id: 'lost',     label: 'Lost &\nFound',  icon: <Search   size={20} color={CRIMSON} /> },
    { id: 'officers', label: 'Officers',       icon: <Shield   size={20} color={CRIMSON} /> },
    { id: 'agendas',  label: 'Agendas',        icon: <FileText size={20} color={CRIMSON} /> },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="light-content" backgroundColor={CRIMSON} />

      {/* ── HEADER ── */}
      <View style={{ backgroundColor: CRIMSON, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 16,  }}>
        <Text style={{ color: GOLD, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginBottom: 2 }}>
          MAMTTODA
        </Text>
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>
          Passenger Hub
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          Stay informed · Ride safe
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── QUICK NAV ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14, marginBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '600', color: '#A89880', letterSpacing: 0.8, marginBottom: 10 }}>
            QUICK ACCESS
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setActiveNav(item.id)}
                style={{
                  width: '22%', alignItems: 'center', gap: 6,
                  paddingVertical: 10, borderRadius: 12,
                  backgroundColor: activeNav === item.id ? '#F0E8E4' : BG,
                }}
              >
                <View style={{
                  width: 40, height: 40, borderRadius: 10,
                  backgroundColor: activeNav === item.id ? '#E8D8D0' : CARD,
                  alignItems: 'center', justifyContent: 'center',
                  borderWidth: 0.5, borderColor: '#E0D8D0',
                }}>
                  {item.icon}
                </View>
                <Text style={{
                  fontSize: 9, fontWeight: '700', color: '#1A1A1A',
                  textAlign: 'center', lineHeight: 13,
                }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── ANNOUNCEMENTS ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14, marginBottom: 8 }}>
          <SectionHeader icon={<Megaphone size={16} color={CRIMSON} />} title="Announcements" />
          {ANNOUNCEMENTS.map((item, idx) => (
            <View key={idx} style={{
              backgroundColor: BG,
              borderRadius: 12,
              padding: 12,
              marginBottom: idx < ANNOUNCEMENTS.length - 1 ? 8 : 0,
              borderLeftWidth: 3,
              borderLeftColor: item.isNew ? GOLD : '#D0C8C0',
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: '700', color: '#A89880', letterSpacing: 0.6 }}>
                  {item.tag} · {item.date}
                </Text>
                {item.isNew && (
                  <View style={{ backgroundColor: GOLD, borderRadius: 20, paddingHorizontal: 7, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 9, fontWeight: '700', color: '#4A2800' }}>NEW</Text>
                  </View>
                )}
              </View>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 3 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B6059', lineHeight: 17 }}>
                {item.body}
              </Text>
            </View>
          ))}
        </View>

        {/* ── FARE MATRIX ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14, marginBottom: 8 }}>
          <SectionHeader
            icon={<Wallet size={16} color={CRIMSON} />}
            title="Fare Matrix"
            sub="Rev. #2023-F4 · Updated March 2024"
          />
          <View style={{ borderRadius: 12, overflow: 'hidden', borderWidth: 0.5, borderColor: '#E0D8D0' }}>
            {/* header row */}
            <View style={{ flexDirection: 'row', backgroundColor: CRIMSON, paddingHorizontal: 12, paddingVertical: 8 }}>
              <Text style={{ flex: 1.5, fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.75)' }}>DISTANCE</Text>
              <Text style={{ flex: 1,   fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.75)' }}>REGULAR</Text>
              <Text style={{ flex: 1,   fontSize: 10, fontWeight: '700', color: GOLD }}>SENIOR/PWD</Text>
            </View>
            {fareMatrix.map((row, idx) => (
              <View key={idx} style={{
                flexDirection: 'row',
                paddingHorizontal: 12, paddingVertical: 11,
                backgroundColor: idx % 2 === 0 ? CARD : BG,
                borderTopWidth: 0.5, borderTopColor: '#EDE7DE',
              }}>
                <Text style={{ flex: 1.5, fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>{row.range}</Text>
                <Text style={{ flex: 1,   fontSize: 13, color: '#1A1A1A' }}>{row.base}</Text>
                <Text style={{ flex: 1,   fontSize: 13, color: CRIMSON, fontWeight: '600' }}>{row.seniorPwd}</Text>
              </View>
            ))}
            <View style={{ backgroundColor: '#FFF8EC', paddingHorizontal: 12, paddingVertical: 7 }}>
              <Text style={{ fontSize: 10, color: '#A89880', fontStyle: 'italic' }}>
                Peak hour surcharge applies 17:00–19:00
              </Text>
            </View>
          </View>
        </View>

        {/* ── CURRENT OFFICERS ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14, marginBottom: 8 }}>
          <SectionHeader
            icon={<Shield size={16} color={CRIMSON} />}
            title="Current Officers"
            sub="MAMTTODA Board · 2024–2025"
          />
          {OFFICERS.map((officer, idx) => (
            <View key={idx} style={{
              flexDirection: 'row', alignItems: 'center',
              paddingVertical: 10,
              borderBottomWidth: idx < OFFICERS.length - 1 ? 0.5 : 0,
              borderBottomColor: '#EDE7DE',
            }}>
              {/* avatar */}
              <View style={{
                width: 38, height: 38, borderRadius: 10,
                backgroundColor: idx === 0 ? CRIMSON : '#F0E8E4',
                alignItems: 'center', justifyContent: 'center',
                marginRight: 12,
              }}>
                <Text style={{
                  fontSize: 12, fontWeight: '700',
                  color: idx === 0 ? GOLD : CRIMSON,
                }}>
                  {officer.initial}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1A1A' }}>
                  {officer.name}
                </Text>
                <Text style={{ fontSize: 11, color: '#A89880', marginTop: 1 }}>
                  {officer.role}
                </Text>
              </View>
              {idx === 0 && (
                <View style={{
                  backgroundColor: '#F0E8E4', borderRadius: 20,
                  paddingHorizontal: 8, paddingVertical: 3,
                }}>
                  <Text style={{ fontSize: 9, fontWeight: '700', color: CRIMSON }}>PRESIDENT</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ── AGENDAS ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14, marginBottom: 8 }}>
          <SectionHeader icon={<FileText size={16} color={CRIMSON} />} title="Agendas & Minutes" />
          <View style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: BG }}>
            {agendas.map((agenda, idx) => (
              <TouchableOpacity key={idx} style={{
                flexDirection: 'row', alignItems: 'center',
                gap: 12, padding: 12,
                borderBottomWidth: idx < agendas.length - 1 ? 0.5 : 0,
                borderBottomColor: '#E0D8D0',
              }}>
                <View style={{
                  width: 36, height: 36, borderRadius: 8,
                  backgroundColor: CARD, alignItems: 'center', justifyContent: 'center',
                  borderWidth: 0.5, borderColor: '#E0D8D0',
                }}>
                  <FileText size={16} color="#888" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>
                    {agenda.title}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#A89880', marginTop: 2 }}>
                    {agenda.postedAgo} · {agenda.fileSize}
                  </Text>
                </View>
                <ChevronRight size={14} color="#C0B8B0" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── LOST & FOUND ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14 }}>
          <SectionHeader icon={<Search size={16} color={CRIMSON} />} title="Lost & Found" />
          {lostFound.map((item) => (
            <View key={item.id} style={{
              backgroundColor: BG, borderRadius: 12,
              padding: 12, marginBottom: 8,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <View style={{
                  width: 40, height: 40, borderRadius: 10,
                  backgroundColor: CARD, borderWidth: 0.5, borderColor: '#E0D8D0',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  {getLostFoundIcon(item.icon)}
                </View>
                <View style={{
                  paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start',
                  backgroundColor: item.status === 'RESOLVED' ? '#D1FAE5' : '#F0E8E4',
                }}>
                  <Text style={{
                    fontSize: 9, fontWeight: '700',
                    color: item.status === 'RESOLVED' ? '#065F46' : CRIMSON,
                  }}>
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 3 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B6059', lineHeight: 17, marginBottom: 8 }}>
                {item.description}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 11, color: '#A89880' }}>{item.date}</Text>
                <Text style={{
                  fontSize: 12, fontWeight: '700',
                  color: item.status === 'RESOLVED' ? '#A89880' : GOLD,
                }}>
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