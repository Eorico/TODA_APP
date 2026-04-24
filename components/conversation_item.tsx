import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Headphones } from 'lucide-react-native';
import { Conversation } from '@/constants/data';

interface Props {
  item: Conversation;
  onPress: () => void;
}

export function ConversationItem({ item, onPress }: Props) {
  const isJustNow = item.time === 'JUST NOW';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center py-4 px-5 bg-background ${
        item.isActive ? 'bg-background' : ''
      }`}
    >
      {/* Active border */}
      {item.isActive && (
        <View className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />
      )}

      {/* Avatar */}
      <View className="mr-3">
        {item.isSupport ? (
          <View className="w-16 h-16 rounded-lg bg-[#F0EFEE] items-center justify-center">
            <Headphones size={28} color="#444" strokeWidth={1.5} />
          </View>
        ) : (
          <Image
            source={{ uri: item.avatar! }}
            className="w-16 h-16 rounded-lg bg-gray-200"
          />
        )}
      </View>

      {/* Content */}
      <View className="flex-1 justify-center">
        {/* Top row */}
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-base font-bold text-textDark flex-1 mr-2">
            {item.name}
          </Text>

          <Text
            className={`text-xs font-medium ${
              isJustNow ? 'text-gold font-bold' : 'text-gray-500'
            }`}
          >
            {item.time}
          </Text>
        </View>

        {/* Bottom row */}
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-gray-500 flex-1 mr-2" numberOfLines={1}>
            {item.preview}
          </Text>

          {item.unread ? (
            <View className="bg-crimson rounded-full min-w-[24px] h-6 items-center justify-center px-2">
              <Text className="text-white text-xs font-bold">
                {item.unread}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}