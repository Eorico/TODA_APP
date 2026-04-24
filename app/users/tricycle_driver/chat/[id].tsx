import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Phone, Flag, Smile, Send, Info } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { conversations, chatMessages } from '@/constants/mockData';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const conversation = conversations.find(c => c.id === id);
  const messages = chatMessages[id as string] || [];

  const yesterdayMessages = messages.filter(m => m.day === 'yesterday');
  const todayMessages = messages.filter(m => m.day === 'today');

  const renderMessage = (msg: any) => {
    if (msg.sender === 'system') {
      return (
        <View key={msg.id} className="bg-white rounded-lg my-2 border-l-4 border-yellow-500 px-3 py-2">
          <View className="flex-row items-center gap-2">
            <Info size={14} color={Colors.goldDark} />
            <Text className="text-sm font-semibold text-gray-800 flex-1">
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
        className={`flex-row mb-2 items-end ${isMe ? 'justify-end' : ''}`}
      >
        <View
          className={`max-w-[80%] rounded-2xl p-3 pb-2 ${
            isMe ? 'bg-blue-600 rounded-br-sm' : 'bg-gray-200 rounded-bl-sm'
          } ${msg.highlighted ? 'border-l-4 border-yellow-500' : ''}`}
        >
          <Text className={`text-sm leading-5 ${isMe ? 'text-white' : 'text-gray-800'}`}>
            {msg.text}
          </Text>

          <View className="flex-row justify-end items-center mt-1 gap-1">
            <Text className={`text-xs ${isMe ? 'text-white/70' : 'text-gray-500'}`}>
              {msg.time}
            </Text>
            {isMe && msg.read && (
              <Text className="text-xs text-white/70">✓✓</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">

      {/* HEADER */}
      <View className="flex-row items-center px-3 py-3 bg-white border-b border-gray-200 gap-2">

        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1 gap-2">

          <View className="relative">
            {conversation?.avatar ? (
              <Image
                source={{ uri: conversation.avatar }}
                className="w-11 h-11 rounded-full"
              />
            ) : (
              <View className="w-11 h-11 rounded-full bg-gray-400 items-center justify-center">
                <Text className="text-white font-bold text-lg">
                  {conversation?.name?.[0]}
                </Text>
              </View>
            )}

            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </View>

          <View>
            <Text className="text-base font-bold text-blue-600">
              {conversation?.name}
            </Text>
            <Text className="text-[10px] font-semibold text-gray-500 tracking-widest">
              ACTIVE NOW
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity className="p-2">
            <Phone size={20} color={Colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity className="p-2">
            <Flag size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* BODY */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView className="flex-1 px-3 pt-4">

          {yesterdayMessages.length > 0 && (
            <>
              <View className="self-center bg-gray-300 px-3 py-1 rounded-full my-3">
                <Text className="text-xs font-bold text-gray-600 tracking-widest">
                  YESTERDAY
                </Text>
              </View>
              {yesterdayMessages.map(renderMessage)}
            </>
          )}

          {todayMessages.length > 0 && (
            <>
              <View className="self-center bg-gray-300 px-3 py-1 rounded-full my-3">
                <Text className="text-xs font-bold text-gray-600 tracking-widest">
                  TODAY
                </Text>
              </View>
              {todayMessages.map(renderMessage)}
            </>
          )}

        </ScrollView>

        {/* INPUT */}
        <View className="flex-row items-center px-3 py-3 bg-gray-100 border-t border-gray-200 gap-2">

          <TextInput
            className="flex-1 text-sm text-gray-800"
            placeholder="Mag-reply dito..."
            placeholderTextColor={Colors.textMuted}
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <TouchableOpacity className="p-2">
            <Smile size={20} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="w-11 h-11 rounded-lg bg-yellow-500 items-center justify-center">
            <Send size={18} color="white" />
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}