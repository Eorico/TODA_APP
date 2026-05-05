import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search, PenLine, Phone, Flag,
  Bell, Edit3,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { currentUser, conversations } from '@/constants/mockData';

const CRIMSON = '#7B1A1A';
const BG      = '#F5EFE8';
const GOLD    = '#C8960C';

function Avatar({
  uri, isSupport, isMissedCall, name,
}: { uri?: string | null; isSupport?: boolean; isMissedCall?: boolean; name?: string }) {
  const initials = name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?';

  return (
    <View style={{ position: 'relative', width: 54, height: 54 }}>
      {uri ? (
        <Image source={{ uri }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      ) : isSupport ? (
        <View style={{
          width: 50, height: 50, borderRadius: 25,
          backgroundColor: GOLD, alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 18 }}>@</Text>
        </View>
      ) : (
        <View style={{
          width: 50, height: 50, borderRadius: 25,
          backgroundColor: CRIMSON + '33', alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: CRIMSON, fontWeight: '800', fontSize: 16 }}>{initials}</Text>
        </View>
      )}

      {isMissedCall ? (
        <View style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 16, height: 16, borderRadius: 8,
          backgroundColor: CRIMSON, borderWidth: 2, borderColor: BG,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Phone size={7} color="#fff" />
        </View>
      ) : (
        <View style={{
          position: 'absolute', bottom: 1, right: 1,
          width: 13, height: 13, borderRadius: 7,
          backgroundColor: '#22C55E', borderWidth: 2, borderColor: BG,
        }} />
      )}
    </View>
  );
}

function ConversationRow({ conv, onPress }: { conv: any; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 10, gap: 12,
        backgroundColor: conv.unread ? '#FDF6F0' : 'transparent',
        borderBottomWidth: 0.5, borderBottomColor: '#EDE7DF',
      }}
    >
      <Avatar
        uri={conv.avatar}
        isMissedCall={conv.missedCall}
        isSupport={conv.isSupport}
        name={conv.name}
      />
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 3,
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: conv.unread ? '800' : '600',
            color: '#1A1A1A',
          }}>
            {conv.name}
          </Text>
          <Text style={{
            fontSize: 11,
            color: conv.unread ? CRIMSON : '#9A8E85',
            fontWeight: conv.unread ? '700' : '400',
          }}>
            {conv.time}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1, fontSize: 13,
              color: conv.unread ? '#3A3A3A' : '#9A8E85',
              fontWeight: conv.unread ? '500' : '400',
            }}
          >
            {conv.lastMessage}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            {!!conv.unread && (
              <View style={{
                minWidth: 20, height: 20, borderRadius: 10,
                backgroundColor: CRIMSON, alignItems: 'center',
                justifyContent: 'center', paddingHorizontal: 5,
              }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>1</Text>
              </View>
            )}
            <Flag size={13} color="#C8B8AF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, backgroundColor: BG }}>
      <Text style={{ fontSize: 11, fontWeight: '800', letterSpacing: 1.2, color: '#9A8E85' }}>
        {label}
      </Text>
    </View>
  );
}

export default function ChatListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const today     = conversations.filter(c => c.section === 'today');
  const yesterday = conversations.filter(c => c.section === 'yesterday');

  const filtered = (list: typeof conversations) =>
    search.trim()
      ? list.filter(c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          (c as any).lastMessage?.toLowerCase().includes(search.toLowerCase())
        )
      : list;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>

      {/* ── HEADER ── */}
      <View style={{
        backgroundColor: CRIMSON,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 16,
      }}>
        <Text style={{
          color: GOLD, fontSize: 10, fontWeight: '700',
          letterSpacing: 0.8, marginBottom: 6,
        }}>
          MAMTTODA
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ position: 'relative' }}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <View style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 12, height: 12, borderRadius: 6,
                backgroundColor: '#22C55E', borderWidth: 2, borderColor: CRIMSON,
              }} />
            </View>
            <View>
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '800' }}>
                Mikel Santiago
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 1 }}>
                Passenger · Stay informed
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={{
              width: 36, height: 36, borderRadius: 18,
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}>
              <Bell size={18} color="white" strokeWidth={1.8} />
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 36, height: 36, borderRadius: 18,
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}>
              <Edit3 size={18} color="white" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ── SEARCH BAR ── */}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        marginHorizontal: 16, marginTop: 10, marginBottom: 0,  // ← reduced margins
        paddingHorizontal: 14, paddingVertical: 8,
        borderRadius: 22, backgroundColor: '#EDE7DF', gap: 8,
      }}>
        <Search size={15} color="#9A8E85" />
        <TextInput
          style={{ flex: 1, fontSize: 14, color: '#1A1A1A' }}
          placeholder="Search"
          placeholderTextColor="#9A8E85"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ── ACTIVE NOW STRIP ── */}
      <View>  {/* ← wrapping View with fixed height prevents ScrollView from expanding */}
        <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 2 }}>
          <Text style={{ fontSize: 11, fontWeight: '800', letterSpacing: 1, color: '#9A8E85' }}>
            ACTIVE NOW
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,   // ← was 12, tightened
            gap: 16,
          }}
        >
          {conversations.slice(0, 6).map((conv) => (
            <TouchableOpacity
              key={conv.id}
              onPress={() => router.push(`/users/passenger/chat/${conv.id}` as any)}
              style={{ alignItems: 'center', gap: 4 }}  // ← gap 5→4
            >
              <View style={{ position: 'relative' }}>
                {conv.avatar ? (
                  <Image
                    source={{ uri: conv.avatar }}
                    style={{ width: 48, height: 48, borderRadius: 24 }}  // ← 52→48
                  />
                ) : (
                  <View style={{
                    width: 48, height: 48, borderRadius: 24,
                    backgroundColor: CRIMSON + '22',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Text style={{ color: CRIMSON, fontWeight: '800', fontSize: 15 }}>
                      {conv.name[0]}
                    </Text>
                  </View>
                )}
                <View style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 12, height: 12, borderRadius: 6,  // ← 13→12
                  backgroundColor: '#22C55E', borderWidth: 2, borderColor: BG,
                }} />
              </View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 11, color: '#5A4E47', fontWeight: '500', maxWidth: 48 }}
              >
                {conv.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── DIVIDER ── */}
      <View style={{ height: 1, backgroundColor: '#E8E0D8', marginHorizontal: 16, marginBottom: 2 }} />

      {/* ── CONVERSATIONS ── */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
      >
        {filtered(today).length > 0 && (
          <>
            <SectionLabel label="TODAY" />
            {filtered(today).map((conv) => (
              <ConversationRow
                key={conv.id}
                conv={conv}
                onPress={() => router.push(`/users/passenger/chat/${conv.id}` as any)}
              />
            ))}
          </>
        )}

        {filtered(yesterday).length > 0 && (
          <>
            <SectionLabel label="YESTERDAY" />
            {filtered(yesterday).map((conv) => (
              <ConversationRow
                key={conv.id}
                conv={conv}
                onPress={() => router.push(`/users/passenger/chat/${conv.id}` as any)}
              />
            ))}
          </>
        )}

        {filtered(today).length === 0 && filtered(yesterday).length === 0 && (
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 8 }}>
            <Search size={36} color="#C8B8AF" />
            <Text style={{ color: '#9A8E85', fontSize: 15, fontWeight: '600' }}>No results found</Text>
            <Text style={{ color: '#C8B8AF', fontSize: 13 }}>Try a different name or message</Text>
          </View>
        )}
      </ScrollView>

      {/* ── FAB ── */}
      <TouchableOpacity
        style={{
          position: 'absolute', right: 20, bottom: insets.bottom + 70,
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: CRIMSON, alignItems: 'center', justifyContent: 'center',
          shadowColor: CRIMSON, shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
        }}
      >
        <PenLine size={22} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}