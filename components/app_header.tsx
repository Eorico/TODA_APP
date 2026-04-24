import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  avatarUrl?: string;
  showAvatar?: boolean;
}

export default function AppHeader({
  title,
  subtitle,
  avatarUrl,
  showAvatar = true,
}: AppHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-border">

      {/* LEFT SIDE */}
      <View className="flex-row items-center gap-2.5">

        {/* AVATAR */}
        {showAvatar && avatarUrl && (
          <Image
            source={{ uri: avatarUrl }}
            className="w-11 h-11 rounded-full bg-gray"
          />
        )}

        {showAvatar && !avatarUrl && (
          <View className="w-11 h-11 rounded-full bg-gray" />
        )}

        {/* TEXT */}
        <View className="justify-center">

          {title && (
            <Text className="text-[15px] font-bold text-primary tracking-wide">
              {title}
            </Text>
          )}

          {subtitle && (
            <Text className="text-[11px] text-textSecondary tracking-wide mt-[1px]">
              {subtitle}
            </Text>
          )}

        </View>
      </View>

      {/* NOTIFICATION */}
      <TouchableOpacity className="relative p-1">

        <Bell size={22} color="#666" />

        {/* DOT */}
        <View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />

      </TouchableOpacity>

    </View>
  );
}