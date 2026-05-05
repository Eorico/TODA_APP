import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Phone, CircleAlert as AlertCircle, Plus, Smile,
  Send, MapPin, ChevronLeft, CheckCheck, Info,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { conversations, chatMessages } from '@/constants/mockData';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState('');

  const conversation = conversations.find(c => c.id === id) ?? conversations[0];
  const messages     = chatMessages[id as string] ?? [];

  const yesterdayMessages = messages.filter(m => m.day === 'yesterday');
  const todayMessages     = messages.filter(m => m.day === 'today');

  const renderMessage = (msg: any) => {
    if (msg.sender === 'system') {
      return (
        <View
          key={msg.id}
          className="rounded-xl my-2 px-3 py-2.5"
          style={{
            backgroundColor: '#FFF8EC',
            borderLeftWidth: 3,
            borderLeftColor: GOLD,
          }}
        >
          <View className="flex-row items-center gap-2">
            <Info size={14} color={GOLD} />
            <Text className="text-[13px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>
              {msg.text}
            </Text>
          </View>
        </View>
      );
    }

    const isMe = msg.sender === 'me';

    return (
      <View
        key={msg.id}
        className={`mb-3 ${isMe ? 'items-end' : 'items-start'}`}
      >
        <View
          className={`max-w-[80%] px-4 py-3 rounded-2xl ${
            isMe ? 'rounded-br-sm' : 'rounded-bl-sm'
          }`}
          style={{
            backgroundColor: isMe ? CRIMSON : '#E5E5E5',
            ...(msg.highlighted && {
              borderLeftWidth: 3,
              borderLeftColor: GOLD,
            }),
          }}
        >
          <Text
            className="text-[15px]"
            style={{ lineHeight: 22, color: isMe ? '#FFFFFF' : '#1A1A1A' }}
          >
            {msg.text}
          </Text>
        </View>

        <View
          className={`flex-row items-center mt-1 gap-1 ${
            isMe ? 'justify-end pr-1' : 'justify-start pl-1'
          }`}
        >
          <Text className="text-[11px]" style={{ color: '#6B6059' }}>
            {msg.time}
          </Text>
          {isMe && msg.read && (
            <CheckCheck size={14} color="#999" strokeWidth={2} />
          )}
        </View>
      </View>
    );
  };

  return (
    // ← plain View instead of SafeAreaView
    <View className="flex-1" style={{ backgroundColor: CRIMSON }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        {/* ── HEADER — top padding uses insets.top ── */}
        <View
          className="flex-row items-center px-4 gap-2.5"
          style={{
            backgroundColor: CRIMSON,
            paddingTop: insets.top + 8,
            paddingBottom: 12,
          }}
        >
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <ChevronLeft size={22} color="white" strokeWidth={2.5} />
          </TouchableOpacity>

          {/* Avatar */}
          <View
            className="p-1 rounded-lg"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <View
              className="w-11 h-11 rounded-lg overflow-hidden"
              style={{ backgroundColor: '#E0D8CC' }}
            >
              {conversation?.avatar ? (
                <Image source={{ uri: conversation.avatar }} className="w-full h-full" />
              ) : (
                <View className="w-full h-full" style={{ backgroundColor: '#C8C0B4' }} />
              )}
            </View>
          </View>

          {/* Name */}
          <View className="flex-1">
            <Text
              className="text-[16px] font-extrabold tracking-wide"
              style={{ color: GOLD }}
            >
              {conversation?.name?.toUpperCase()}
            </Text>
            <Text className="text-[12px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              ACTIVE NOW
            </Text>
          </View>

          {/* Actions */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)' }}
            >
              <Phone size={18} color="white" strokeWidth={1.8} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)' }}
            >
              <AlertCircle size={18} color="white" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── MESSAGES ── */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: BG }}
        >
          {yesterdayMessages.length > 0 && (
            <>
              <View
                className="self-center px-4 py-1.5 rounded-full my-3"
                style={{ backgroundColor: '#E8E3DE' }}
              >
                <Text
                  className="text-[11px] font-semibold tracking-wide"
                  style={{ color: '#6B6059' }}
                >
                  YESTERDAY
                </Text>
              </View>
              {yesterdayMessages.map(renderMessage)}
            </>
          )}

          {todayMessages.length > 0 && (
            <>
              <View
                className="self-center px-4 py-1.5 rounded-full my-3"
                style={{ backgroundColor: '#E8E3DE' }}
              >
                <Text
                  className="text-[11px] font-semibold tracking-wide"
                  style={{ color: '#6B6059' }}
                >
                  TODAY
                </Text>
              </View>
              {todayMessages.map(renderMessage)}
            </>
          )}

          {/* LOCATION CARD */}
          <View
            className="flex-row items-center rounded-xl p-3 mt-2 overflow-hidden gap-3 relative"
            style={{ backgroundColor: '#EDE8E3' }}
          >
            <View
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ backgroundColor: GOLD }}
            />
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=150',
              }}
              className="w-14 h-14 rounded-lg ml-2"
            />
            <View className="flex-1">
              <Text
                className="text-[10px] font-bold tracking-widest mb-1"
                style={{ color: GOLD }}
              >
                PICKUP LOCATION
              </Text>
              <Text className="text-[15px] font-medium" style={{ color: '#1A1A1A' }}>
                Av. da Liberdade, 110
              </Text>
            </View>
            <MapPin size={22} color={GOLD} strokeWidth={1.8} />
          </View>
        </ScrollView>

        {/* ── INPUT BAR — bottom padding uses insets.bottom ── */}
        <View
          className="flex-row items-center px-3 py-2 gap-2"
          style={{
            backgroundColor: '#F5F5F5',
            borderTopWidth: 1,
            borderTopColor: '#E0D8D0',
            paddingBottom: insets.bottom + 8,
          }}
        >
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: '#E8E3DE' }}
          >
            <Plus size={22} color="#444" strokeWidth={2} />
          </TouchableOpacity>

          <TextInput
            className="flex-1 rounded-full px-4 py-2 text-[15px]"
            style={{ backgroundColor: '#E8E3DE', color: '#1A1A1A' }}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <TouchableOpacity className="p-1">
            <Smile size={22} color={GOLD} strokeWidth={1.8} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-10 h-10 rounded-lg items-center justify-center"
            style={{ backgroundColor: CRIMSON }}
          >
            <Send size={18} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
}