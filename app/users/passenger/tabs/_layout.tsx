// app/(passenger)/_layout.tsx
import { Tabs } from 'expo-router';
import { MessageSquare, Megaphone, User } from 'lucide-react-native';
import { View, Text, Platform, StyleSheet } from 'react-native';

const CRIMSON = '#7B1A1A';
const GRAY    = '#8E8E93'; // iOS system gray
const BG_PILL = '#F2ECEB'; // soft crimson tint for active pill

function TabIcon({
  icon, label, focused,
}: {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={styles.tabItem}>
      {/* active pill */}
      <View style={[styles.pill, focused && styles.pillActive]}>
        {icon}
      </View>
      <Text style={[styles.label, focused && styles.labelActive]}>
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
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        // iOS only — frosted glass effect
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            // BlurView would go here if you have expo-blur installed:
            // <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
            <View style={[StyleSheet.absoluteFill, styles.tabBarBg]} />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.tabBarBg]} />
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

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',           // floats over content — iOS style
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 82 : 68,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10, // safe area for iOS home bar
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.12)',
    backgroundColor: 'transparent',
    elevation: 0,                   // remove Android shadow
  },
  tabBarBg: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    // Optional: install expo-blur and replace with BlurView for true frosted glass
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minWidth: 64,
  },
  pill: {
    width: 44,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pillActive: {
    backgroundColor: BG_PILL,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.1,
    color: GRAY,
  },
  labelActive: {
    color: CRIMSON,
    fontWeight: '600',
  },
});