import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, ScrollView,
  SafeAreaView, StatusBar, Platform, ActivityIndicator,
} from 'react-native';
import {
  Search, Package, ChevronRight, Wallet, Key,
  Smartphone, Megaphone, Shield, AlertTriangle, Car,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, BULLETIN_ENDPOINTS } from '@/services/api';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';
const CARD    = '#FFFFFF';

// ── Types ────────────────────────────────────────────────────────
interface Announcement  { id: string; type: string; title: string; body: string; author: string; time?: string; }
interface Officer       { id: string; full_name: string; mi?: string; last_name: string; role: string; status: string; custom_id: string; }
interface FareRate      { id?: string; base: number; highway: number; special: number; discStudent: number; discSenior: number; }
interface LostFoundItem { id: string; name: string; body: string; date: string; status: string; }
interface CodingItem    { id: string; day: string; bodyRange: string; time: string; status: string; route?: string; }
interface Violation     { id: string; driver_name: string; body: string; date: string; violation: string; penalty: string; penalty_amount?: string; }

// ── Fetch helper — uses full URL, attaches token + API key ───────
async function apiFetch<T>(url: string): Promise<T | null> {
  try {
    const token = await AsyncStorage.getItem('access_token');
    const res = await fetch(url, {
      headers: {
        ...API_CONFIG.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      console.warn(`apiFetch failed: ${res.status} ${url}`);
      return null;
    }
    return await res.json() as T;
  } catch (err) {
    console.error(`apiFetch error: ${url}`, err);
    return null;
  }
}

// ── Sub-components ───────────────────────────────────────────────
function getLostFoundIcon(status: string) {
  const color = '#888';
  switch (status?.toLowerCase()) {
    case 'wallet':     return <Wallet     size={18} color={color} />;
    case 'key':        return <Key        size={18} color={color} />;
    case 'smartphone': return <Smartphone size={18} color={color} />;
    default:           return <Package    size={18} color={color} />;
  }
}

function SectionHeader({ icon, title, sub }: { icon: React.ReactNode; title: string; sub?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
      <View style={{ width: 32, height: 32, borderRadius: 8, alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#F0E8E4' }}>
        {icon}
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: '800', color: CRIMSON }}>{title}</Text>
        {sub && <Text style={{ fontSize: 10, color: '#A89880' }}>{sub}</Text>}
      </View>
    </View>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <Text style={{ color: '#A89880', fontSize: 12, textAlign: 'center', paddingVertical: 16 }}>
      {text}
    </Text>
  );
}

function LoadingRow() {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 20 }}>
      <ActivityIndicator color={CRIMSON} />
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────────
export default function BulletinScreen() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [officers,      setOfficers]      = useState<Officer[]>([]);
  const [fare,          setFare]          = useState<FareRate | null>(null);
  const [lostFound,     setLostFound]     = useState<LostFoundItem[]>([]);
  const [coding,        setCoding]        = useState<CodingItem[]>([]);
  const [myViolations,  setMyViolations]  = useState<Violation[]>([]);
  const [loading,       setLoading]       = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const today = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];

  const fetchAll = useCallback(async () => {
    const [ann, off, fareData, lf, cod, vio] = await Promise.all([
      apiFetch<Announcement[]>(BULLETIN_ENDPOINTS.ANNOUNCEMENTS),
      apiFetch<Officer[]>(BULLETIN_ENDPOINTS.OFFICERS),
      apiFetch<FareRate[]>(BULLETIN_ENDPOINTS.FARE),
      apiFetch<LostFoundItem[]>(BULLETIN_ENDPOINTS.LOST_FOUND),
      apiFetch<CodingItem[]>(BULLETIN_ENDPOINTS.CODING),
      apiFetch<Violation[]>(BULLETIN_ENDPOINTS.MY_VIOLATIONS),
    ]);

    if (Array.isArray(ann))      setAnnouncements(ann);
    if (Array.isArray(off))      setOfficers(off);
    if (Array.isArray(fareData) && fareData.length > 0) setFare(fareData[0]);
    if (Array.isArray(lf))       setLostFound(lf);
    if (Array.isArray(cod))      setCoding(cod);
    if (Array.isArray(vio))      setMyViolations(vio);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
    intervalRef.current = setInterval(fetchAll, 30_000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fetchAll]);

  const todaySchedules = coding.filter(c =>
    c.day === today || c.day.startsWith(today.substring(0, 3))
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="light-content" backgroundColor={CRIMSON} />

      {/* ── HEADER ── */}
      <View style={{ backgroundColor: CRIMSON, paddingHorizontal: 16,
        paddingTop: 14, paddingBottom: 16, marginTop: 30 }}>
        <Text style={{ color: GOLD, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginBottom: 2 }}>
          MAMTTODA
        </Text>
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>Driver Bulletin</Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          Stay informed · Drive safe
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 86 }}
      >

        {/* ── MY VIOLATIONS ALERT ── */}
        {!loading && myViolations.length > 0 && (
          <View style={{ margin: 16, marginBottom: 0, borderRadius: 14,
            backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <AlertTriangle size={18} color="#DC2626" />
              <Text style={{ fontSize: 14, fontWeight: '800', color: '#DC2626' }}>
                Active Violation{myViolations.length > 1 ? 's' : ''} on Your Account
              </Text>
            </View>
            {myViolations.map((v, idx) => (
              <View key={v.id ?? idx} style={{
                backgroundColor: '#fff', borderRadius: 10, padding: 12,
                marginBottom: idx < myViolations.length - 1 ? 8 : 0,
                borderLeftWidth: 3, borderLeftColor: '#DC2626',
              }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>{v.violation}</Text>
                <Text style={{ fontSize: 11, color: '#6B6059', marginTop: 2 }}>
                  {v.date} · Body #{v.body}
                </Text>
                <View style={{ marginTop: 6, alignSelf: 'flex-start', borderRadius: 6,
                  paddingHorizontal: 8, paddingVertical: 3,
                  backgroundColor: v.penalty === 'fine' ? '#FEF3C7' : '#F0E8E4' }}>
                  <Text style={{ fontSize: 10, fontWeight: '700',
                    color: v.penalty === 'fine' ? '#D97706' : CRIMSON }}>
                    {v.penalty === 'fine' ? `Fine: ${v.penalty_amount ?? '₱500.00'}` : 'Warning'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ── ANNOUNCEMENTS ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 16,
          paddingTop: 16, paddingBottom: 16, marginTop: 8, marginBottom: 8 }}>
          <SectionHeader icon={<Megaphone size={16} color={CRIMSON} />} title="Announcements" />
          {loading ? <LoadingRow /> : announcements.length === 0 ? (
            <EmptyState text="No announcements yet." />
          ) : announcements.map((item, idx) => (
            <View key={item.id ?? idx} style={{
              backgroundColor: BG, borderRadius: 12, padding: 12,
              marginBottom: idx < announcements.length - 1 ? 8 : 0,
              borderLeftWidth: 3, borderLeftColor: idx === 0 ? GOLD : '#D0C8C0',
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: '700', color: '#A89880', letterSpacing: 0.5 }}>
                  {item.type?.toUpperCase()} · {item.time ?? ''}
                </Text>
                {idx === 0 && (
                  <View style={{ backgroundColor: GOLD, borderRadius: 99,
                    paddingHorizontal: 8, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 9, fontWeight: '700', color: '#4A2800' }}>NEW</Text>
                  </View>
                )}
              </View>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B6059', lineHeight: 17 }}>{item.body}</Text>
              <Text style={{ fontSize: 10, color: '#A89880', marginTop: 6 }}>
                by {item.author ?? 'Admin'}
              </Text>
            </View>
          ))}
        </View>

        {/* ── TRICYCLE CODING ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 16,
          paddingTop: 16, paddingBottom: 16, marginBottom: 8 }}>
          <SectionHeader
            icon={<Car size={16} color={CRIMSON} />}
            title="Tricycle Coding"
            sub={`Today is ${today}`}
          />
          {loading ? <LoadingRow /> : coding.length === 0 ? (
            <EmptyState text="No coding schedules defined." />
          ) : (
            <>
              {/* Today highlight */}
              {todaySchedules.length > 0 ? (
                <View style={{ backgroundColor: '#FEF3C7', borderRadius: 12, padding: 12,
                  marginBottom: 12, borderLeftWidth: 3, borderLeftColor: GOLD }}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#92400E', marginBottom: 4 }}>
                    🔴 TODAY — RESTRICTED BODY NUMBERS
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '900', color: '#78350F' }}>
                    {todaySchedules.map(c => c.bodyRange).join(', ')}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#92400E', marginTop: 4 }}>
                    {todaySchedules[0].time}
                  </Text>
                </View>
              ) : (
                <View style={{ backgroundColor: '#F0FDF4', borderRadius: 12, padding: 12,
                  marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#16A34A' }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#15803D' }}>
                    ✅ No restriction today — all body numbers may operate freely
                  </Text>
                </View>
              )}

              {/* Full weekly schedule */}
              {coding.map((c, idx) => {
                const isToday = c.day === today || c.day.startsWith(today.substring(0, 3));
                return (
                  <View key={c.id ?? idx} style={{
                    flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
                    borderBottomWidth: idx < coding.length - 1 ? 0.5 : 0,
                    borderBottomColor: '#EDE7DE',
                  }}>
                    <View style={{ width: 36, height: 36, borderRadius: 8, alignItems: 'center',
                      justifyContent: 'center', marginRight: 12,
                      backgroundColor: isToday ? CRIMSON : '#F0E8E4' }}>
                      <Text style={{ fontSize: 10, fontWeight: '800',
                        color: isToday ? '#fff' : CRIMSON }}>
                        {c.day.substring(0, 3).toUpperCase()}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>
                        {c.day}
                        {isToday && <Text style={{ color: CRIMSON }}> · TODAY</Text>}
                      </Text>
                      <Text style={{ fontSize: 11, color: '#6B6059', marginTop: 1 }}>
                        Body Nos. {c.bodyRange} · {c.time}
                      </Text>
                    </View>
                    <View style={{ borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
                      backgroundColor:
                        c.status === 'active'   ? '#DCFCE7' :
                        c.status === 'open-win' ? '#FEF9C3' : '#F0E8E4' }}>
                      <Text style={{ fontSize: 9, fontWeight: '700',
                        color:
                          c.status === 'active'   ? '#16A34A' :
                          c.status === 'open-win' ? '#D97706' : '#6B6059' }}>
                        {c.status === 'open-win' ? 'OPEN WINDOW' : c.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </View>

        {/* ── FARE MATRIX ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 16,
          paddingTop: 16, paddingBottom: 16, marginBottom: 8 }}>
          <SectionHeader icon={<Wallet size={16} color={CRIMSON} />} title="Fare Matrix" />
          {loading ? <LoadingRow /> : !fare ? (
            <EmptyState text="No fare data available." />
          ) : (
            <View style={{ borderRadius: 12, overflow: 'hidden',
              borderWidth: 0.5, borderColor: '#E0D8D0' }}>
              <View style={{ flexDirection: 'row', paddingHorizontal: 12,
                paddingVertical: 8, backgroundColor: CRIMSON }}>
                <Text style={{ flex: 2, fontSize: 10, fontWeight: '700',
                  color: 'rgba(255,255,255,0.75)' }}>TYPE</Text>
                <Text style={{ flex: 1, fontSize: 10, fontWeight: '700',
                  color: 'rgba(255,255,255,0.75)' }}>FARE</Text>
              </View>
              {[
                { label: 'Base Fare',        value: fare.base,        isDiscount: false },
                { label: 'Highway',          value: fare.highway,     isDiscount: false },
                { label: 'Special',          value: fare.special,     isDiscount: false },
                { label: 'Student Disc.',    value: fare.discStudent, isDiscount: true  },
                { label: 'Senior/PWD Disc.', value: fare.discSenior,  isDiscount: true  },
              ].map((row, idx) => (
                <View key={idx} style={{
                  flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 11,
                  backgroundColor: idx % 2 === 0 ? CARD : BG,
                  borderTopWidth: 0.5, borderTopColor: '#EDE7DE', alignItems: 'center',
                }}>
                  <Text style={{ flex: 2, fontSize: 13, fontWeight: '600', color: '#1A1A1A' }}>
                    {row.label}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '700',
                    color: row.isDiscount ? GOLD : CRIMSON }}>
                    {row.isDiscount
                      ? `-${Number(row.value).toFixed(0)}%`
                      : `₱${Number(row.value).toFixed(2)}`}
                  </Text>
                </View>
              ))}
              <View style={{ backgroundColor: '#FFF8EC', paddingHorizontal: 12, paddingVertical: 7 }}>
                <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#A89880' }}>
                  Peak hour surcharge applies 17:00–19:00
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ── CURRENT OFFICERS ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 16,
          paddingTop: 16, paddingBottom: 16, marginBottom: 8 }}>
          <SectionHeader
            icon={<Shield size={16} color={CRIMSON} />}
            title="Current Officers"
            sub="MAMTTODA Board"
          />
          {loading ? <LoadingRow /> : officers.length === 0 ? (
            <EmptyState text="No officers listed." />
          ) : officers.map((officer, idx) => (
            <View key={officer.id ?? idx} style={{
              flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
              borderBottomWidth: idx < officers.length - 1 ? 0.5 : 0,
              borderBottomColor: '#EDE7DE',
            }}>
              <View style={{ width: 40, height: 40, borderRadius: 10, alignItems: 'center',
                justifyContent: 'center', marginRight: 12,
                backgroundColor: idx === 0 ? CRIMSON : '#F0E8E4' }}>
                <Text style={{ fontSize: 12, fontWeight: '700',
                  color: idx === 0 ? GOLD : CRIMSON }}>
                  {(officer.full_name?.[0] ?? '?') + (officer.last_name?.[0] ?? '?')}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1A1A' }}>
                  {[officer.full_name, officer.mi, officer.last_name].filter(Boolean).join(' ')}
                </Text>
                <Text style={{ fontSize: 11, color: '#A89880', marginTop: 2 }}>{officer.role}</Text>
              </View>
              <View style={{
                borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
                backgroundColor:
                  officer.status === 'on-duty'   ? '#DCFCE7' :
                  officer.status === 'in-office' ? '#E0F2FE' : '#FEF3C7',
              }}>
                <Text style={{ fontSize: 9, fontWeight: '700',
                  color:
                    officer.status === 'on-duty'   ? '#15803D' :
                    officer.status === 'in-office' ? '#0369A1' : '#D97706' }}>
                  {officer.status === 'on-duty'   ? 'ON DUTY' :
                   officer.status === 'in-office' ? 'IN OFFICE' : 'OFF DUTY'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── LOST & FOUND ── */}
        <View style={{ backgroundColor: CARD, paddingHorizontal: 16,
          paddingTop: 16, paddingBottom: 16 }}>
          <SectionHeader icon={<Search size={16} color={CRIMSON} />} title="Lost & Found" />
          {loading ? <LoadingRow /> : lostFound.length === 0 ? (
            <EmptyState text="No lost & found items." />
          ) : lostFound.map((item, idx) => (
            <View key={item.id ?? idx} style={{
              backgroundColor: BG, borderRadius: 12, padding: 12,
              marginBottom: idx < lostFound.length - 1 ? 8 : 0,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <View style={{ width: 40, height: 40, borderRadius: 10, alignItems: 'center',
                  justifyContent: 'center', backgroundColor: CARD,
                  borderWidth: 0.5, borderColor: '#E0D8D0' }}>
                  {getLostFoundIcon(item.status)}
                </View>
                <View style={{ borderRadius: 99, paddingHorizontal: 8, paddingVertical: 4,
                  alignSelf: 'flex-start',
                  backgroundColor: item.status === 'Resolved' ? '#D1FAE5' : '#F0E8E4' }}>
                  <Text style={{ fontSize: 9, fontWeight: '700',
                    color: item.status === 'Resolved' ? '#065F46' : CRIMSON }}>
                    {item.status?.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 11, color: '#A89880' }}>
                  Body #{item.body} · {item.date}
                </Text>
                <ChevronRight size={14} color="#C0B8B0" />
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}