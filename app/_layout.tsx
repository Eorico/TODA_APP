import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState<any>(null);

  const Logo = require("@/assets/images/Home_bg.png");
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }

        setTimeout(() => {
          setInit(false);
        }, 3000);
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
        <Image
          source={Logo}
          style={{ width: width * 1, height: height * 1 }}
          resizeMode="contain"
        />
        <ActivityIndicator
          size={"large"}
          color={"#FF9D00"}
          style={{ marginTop: -300 }}
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? <Stack.Screen name="pages" /> : <Stack.Screen name="auth" />}
      <Stack.Screen name="notfound" />
    </Stack>
  );
}
