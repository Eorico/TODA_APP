import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator, Animated, Dimensions, Image, View,
} from "react-native";
import "../global.css";

// ← Keep the native splash visible until we're ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState<any>(null);

  const Logo = require("@/assets/images/Logo.png");
  const { width } = Dimensions.get("window");

  const bounceAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    // ← Hide the native splash immediately so our custom one shows
    SplashScreen.hideAsync();

    Animated.spring(bounceAnim, {
      toValue: 0,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();

    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        setTimeout(() => setInit(false), 3000);
      } catch (error) {
        console.log("Error loading storage:", error);
        setInit(false);
      }
    };

    checkUser();
  }, []);

  if (init) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <Image
            source={Logo}
            style={{ width: width * 1, height: width * 1 }}
            resizeMode="contain"
          />
        </Animated.View>
        <ActivityIndicator
          size="large"
          color="#FF9D00"
          style={{ marginTop: 24 }}
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? <Stack.Screen name="users" /> : <Stack.Screen name="auth" />}
      <Stack.Screen name="notfound" />
    </Stack>
  );
}