import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MessageSquare, Megaphone, User } from 'lucide-react-native';

const TAB_CONFIG = [
  { name: 'index', label: 'CHAT', Icon: MessageSquare },
  { name: 'announcements', label: 'ANNOUNCEMENTS', Icon: Megaphone },
  { name: 'account', label: 'ACCOUNT', Icon: User },
];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row bg-white border-t border-gray-200 pt-2 pb-6 px-2">
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const config = TAB_CONFIG[index];

        if (!config) return null;

        const { Icon, label } = config;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.8}
            className={`flex-1 items-center justify-center py-2 rounded-xl gap-1 ${
              focused ? 'bg-crimson' : ''
            }`}
          >
            <Icon
              size={20}
              color={focused ? 'white' : '#555'}
              strokeWidth={2}
            />

            <Text
              className={`text-[9px] font-bold tracking-wider ${
                focused ? 'text-white' : 'text-gray-600'
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}