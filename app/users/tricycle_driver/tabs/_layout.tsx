// app/(driver)/_layout.tsx
import { Tabs } from 'expo-router';
import { MessageSquare, Megaphone, Wallet, User } from 'lucide-react-native';
import { View, Text, Platform, StyleSheet } from 'react-native';

const CRIMSON  = '#7B1A1A';
const GRAY     = '#8E8E93';
const BG_PILL  = '#F2ECEB';

function TabIcon({
  icon, label, focused,
}: {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}) {
  return (
    <View className="items-center justify-center min-w-[60px]" style={{ gap: 3 }}>
      <View
        className="w-11 h-8 rounded-[10px] items-center justify-center"
        style={{ backgroundColor: focused ? BG_PILL : 'transparent' }}
      >
        {icon}
      </View>
      <Text
        className={`text-[10px] tracking-tight ${focused ? 'font-semibold' : 'font-medium'}`}
        style={{ color: focused ? CRIMSON : GRAY }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 82 : 68,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 10,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: 'rgba(0,0,0,0.12)',
          backgroundColor: 'transparent',
          elevation: 0,
        },
        tabBarBackground: () => (
          <View
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.94)' }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<MessageSquare size={22} strokeWidth={focused ? 2.2 : 1.6} color={focused ? CRIMSON : GRAY} />}
              label="Chat"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bulletin"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Megaphone size={22} strokeWidth={focused ? 2.2 : 1.6} color={focused ? CRIMSON : GRAY} />}
              label="Bulletin"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="funds_or_butaw"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Wallet size={22} strokeWidth={focused ? 2.2 : 1.6} color={focused ? CRIMSON : GRAY} />}
              label="Funds"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<User size={22} strokeWidth={focused ? 2.2 : 1.6} color={focused ? CRIMSON : GRAY} />}
              label="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}