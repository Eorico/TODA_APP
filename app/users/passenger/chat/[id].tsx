import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Phone,
  CircleAlert as AlertCircle,
  Plus,
  Smile,
  Send,
  MapPin,
  ChevronLeft,
  CheckCheck,
} from 'lucide-react-native';
import { CONVERSATIONS, CHAT_MESSAGES } from '@/constants/data';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const conversation =
    CONVERSATIONS.find((c) => c.id === id) ?? CONVERSATIONS[0];

  const messages =
    CHAT_MESSAGES[id as string] ?? CHAT_MESSAGES['marcus-chen'];

  return (
    <SafeAreaView className="flex-1 bg-red-900">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* HEADER */}
        <View className="flex-row items-center px-4 py-3 bg-red-900 gap-2.5">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <ChevronLeft size={22} color="white" strokeWidth={2.5} />
          </TouchableOpacity>

          <View className="p-1 bg-white/20 rounded-lg">
            <View className="w-11 h-11 rounded-md overflow-hidden bg-[#E0D8CC]">
              {conversation.avatar ? (
                <Image
                  source={{ uri: conversation.avatar }}
                  className="w-full h-full"
                />
              ) : (
                <View className="w-full h-full bg-[#C8C0B4]" />
              )}
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-[16px] font-extrabold text-yellow-400 tracking-wide">
              {conversation.name.toUpperCase()}
            </Text>
            <Text className="text-[13px] text-white/80 mt-[2px]">
              #2948-TP
            </Text>
          </View>

          <View className="flex-row gap-3.5">
            <TouchableOpacity className="w-9 h-9 rounded-full border border-white/40 items-center justify-center">
              <Phone size={20} color="white" strokeWidth={1.8} />
            </TouchableOpacity>

            <TouchableOpacity className="w-9 h-9 rounded-full border border-white/40 items-center justify-center">
              <AlertCircle size={20} color="white" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>
        </View>

        {/* MESSAGES */}
        <ScrollView
          className="flex-1 bg-[#F5F5F5]"
          contentContainerClassName="px-4 pt-2 pb-4"
          showsVerticalScrollIndicator={false}
        >
          {/* DATE */}
          <View className="self-center bg-[#E8E3DE] px-4 py-1.5 rounded-full my-4">
            <Text className="text-[11px] font-semibold text-gray-600 tracking-wide">
              TODAY, 2:45 PM
            </Text>
          </View>

          {messages.map((msg) => (
            <View key={msg.id} className="mb-3">
              <View
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.isSent
                    ? 'self-end bg-red-900 rounded-br-sm'
                    : 'self-start bg-[#E5E5E5] rounded-bl-sm'
                }`}
              >
                <Text
                  className={`text-[15px] leading-[22px] ${
                    msg.isSent ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {msg.text}
                </Text>
              </View>

              <View
                className={`flex-row items-center mt-1 gap-1 ${
                  msg.isSent ? 'justify-end pr-1' : 'justify-start pl-1'
                }`}
              >
                <Text className="text-[11px] text-gray-600">
                  {msg.time}
                </Text>

                {msg.isSent && msg.isRead && (
                  <CheckCheck size={14} color="#999" strokeWidth={2} />
                )}
              </View>
            </View>
          ))}

          {/* LOCATION CARD */}
          <View className="flex-row items-center bg-[#EDE8E3] rounded-xl p-3 mt-2 overflow-hidden gap-3 relative">
            <View className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />

            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=150',
              }}
              className="w-14 h-14 rounded-lg ml-2"
            />

            <View className="flex-1">
              <Text className="text-[10px] font-bold text-yellow-500 tracking-widest mb-1">
                PICKUP LOCATION
              </Text>
              <Text className="text-[15px] font-medium text-gray-900">
                Av. da Liberdade, 110
              </Text>
            </View>

            <MapPin size={22} color="#EAB308" strokeWidth={1.8} />
          </View>
        </ScrollView>

        {/* INPUT BAR */}
        <View className="flex-row items-center bg-[#F5F5F5] border-t border-gray-200 px-3 py-2 pb-6 gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-[#E8E3DE] items-center justify-center">
            <Plus size={22} color="#444" strokeWidth={2} />
          </TouchableOpacity>

          <TextInput
            className="flex-1 bg-[#E8E3DE] rounded-full px-4 py-2 text-[15px] text-gray-900"
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />

          <TouchableOpacity className="p-1">
            <Smile size={22} color="#EAB308" strokeWidth={1.8} />
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 rounded-lg bg-red-900 items-center justify-center">
            <Send size={18} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}