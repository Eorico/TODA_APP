import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Phone,
  Flag,
  Search,
  ChevronDown,
  PenLine,
  Calendar,
} from 'lucide-react-native';

import AppHeader from '@/components/app_header';
import { currentUser, conversations } from '@/constants/mockData';

function AvatarWithBadge({
  uri,
  isMissedCall,
  isSupport,
}: {
  uri?: string | null;
  isMissedCall?: boolean;
  isSupport?: boolean;
}) {
  return (
    <View className="relative">

      {uri ? (
        <Image
          source={{ uri }}
          className="w-14 h-14 rounded-xl bg-gray"
        />
      ) : isSupport ? (
        <View className="w-14 h-14 rounded-xl bg-gold items-center justify-center">
          <Text className="text-white font-bold text-xl">@</Text>
        </View>
      ) : (
        <View className="w-14 h-14 rounded-xl bg-gray" />
      )}

      {isMissedCall && (
        <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-white items-center justify-center">
          <Phone size={9} color="#fff" />
        </View>
      )}

    </View>
  );
}

export default function ChatScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const today = conversations.filter(c => c.section === 'today');
  const yesterday = conversations.filter(c => c.section === 'yesterday');

  return (
    <SafeAreaView className="flex-1 bg-background">

      <AppHeader
        title="Ricardo Santos"
        subtitle="BODY #2948-TP"
        avatarUrl={currentUser.avatar}
      />

      {/* FILTER ROW */}
      <View className="flex-row items-center justify-between px-4 pt-4 pb-3">

        <Text className="text-[26px] font-black italic text-primary tracking-widest">
          ALL MESSAGES
        </Text>

        <TouchableOpacity className="flex-row items-center gap-1 bg-border px-3 py-2 rounded-full">

          <Calendar size={14} color="#666" />
          <Text className="text-[11px] font-semibold text-textSecondary">
            LAST MONTH
          </Text>
          <ChevronDown size={14} color="#666" />

        </TouchableOpacity>

      </View>

      {/* SEARCH */}
      <View className="flex-row items-center bg-border mx-4 mb-3 px-4 py-2 rounded-full gap-2">

        <Search size={16} color="#999" />

        <TextInput
          className="flex-1 text-[14px] text-textPrimary"
          placeholder="Search messages, names, or issues..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />

      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* TODAY */}
        {today.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            onPress={() => router.push(`/chat/${conv.id}`)}
            className={`flex-row items-center gap-3 px-4 py-3 border-b border-border ${
              conv.unread ? 'bg-unreadBg' : 'bg-white'
            }`}
          >

            <AvatarWithBadge
              uri={conv.avatar}
              isMissedCall={conv.missedCall}
              isSupport={conv.isSupport}
            />

            <View className="flex-1 gap-1">

              <View className="flex-row justify-between items-center">

                <Text className="text-[15px] font-bold text-textPrimary">
                  {conv.name}
                </Text>

                <Text
                  className={`text-[12px] ${
                    conv.missedCall
                      ? 'text-primary font-semibold'
                      : 'text-textSecondary'
                  }`}
                >
                  {conv.time}
                </Text>

              </View>

              <View className="flex-row justify-between items-center">

                <Text
                  numberOfLines={1}
                  className={`flex-1 text-[13px] mr-2 ${
                    conv.missedCall
                      ? 'text-primary italic'
                      : conv.unread
                      ? 'text-primary font-medium'
                      : 'text-textSecondary'
                  }`}
                >
                  {conv.lastMessage}
                </Text>

                <View className="flex-row items-center gap-2">

                  {conv.unread && (
                    <View className="w-2 h-2 rounded-full bg-primary" />
                  )}

                  <Flag size={14} color="#999" />

                </View>

              </View>

            </View>

          </TouchableOpacity>
        ))}

        {/* YESTERDAY LABEL */}
        <View className="px-4 py-2 bg-background">
          <Text className="text-[11px] font-bold text-textSecondary tracking-widest">
            YESTERDAY
          </Text>
        </View>

        {/* YESTERDAY */}
        {yesterday.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            onPress={() => router.push(`/chat/${conv.id}`)}
            className={`flex-row items-center gap-3 px-4 py-3 border-b border-border ${
              conv.unread ? 'bg-unreadBg' : 'bg-white'
            }`}
          >

            <AvatarWithBadge
              uri={conv.avatar}
              isMissedCall={conv.missedCall}
              isSupport={conv.isSupport}
            />

            <View className="flex-1 gap-1">

              <View className="flex-row justify-between items-center">

                <Text className="text-[15px] font-bold text-textPrimary">
                  {conv.name}
                </Text>

                <Text className="text-[12px] text-textSecondary">
                  {conv.time}
                </Text>

              </View>

              <View className="flex-row justify-between items-center">

                <Text numberOfLines={1} className="flex-1 text-[13px] text-textSecondary mr-2">
                  {conv.lastMessage}
                </Text>

                <View className="flex-row items-center gap-2">

                  {conv.unread && (
                    <View className="w-2 h-2 rounded-full bg-primary" />
                  )}

                  <Flag size={14} color="#999" />

                </View>

              </View>

            </View>

          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity className="absolute bottom-20 right-5 w-14 h-14 rounded-xl bg-primary items-center justify-center shadow-lg">

        <PenLine size={22} color="#fff" />

      </TouchableOpacity>

    </SafeAreaView>
  );
}