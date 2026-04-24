import { Tabs } from 'expo-router';
import { MessageSquare, Megaphone, Wallet, User } from 'lucide-react-native';
import { View, Text } from 'react-native';

interface TabIconProps {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View
      className={`
        items-center justify-center px-3 py-1.5 rounded-lg min-w-[60px]
        ${focused ? 'bg-primaryLight' : ''}
      `}
    >
      {icon}
      <Text
        className={`
          text-[9px] font-semibold tracking-[0.5px] mt-[2px]
          ${focused ? 'text-primary' : 'text-grayMedium'}
        `}
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
        tabBarStyle: {
          // NativeWind doesn't support tabBarStyle directly
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB', // match Colors.border
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <MessageSquare
                  size={22}
                  color={focused ? '#YOUR_PRIMARY' : '#YOUR_GRAY'}
                />
              }
              label="CHAT"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="announcements"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Megaphone
                  size={22}
                  color={focused ? '#YOUR_PRIMARY' : '#YOUR_GRAY'}
                />
              }
              label="ANNOUNCEMENTS"
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
              icon={
                <Wallet
                  size={22}
                  color={focused ? '#FFFFFF' : '#YOUR_GRAY'}
                />
              }
              label="PROFILE"
              focused={focused}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}