import { router } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export default function HomeScreen () {
     const [user, setUser] = useState<any>(null);

     useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        loadUser()
     }, []);

     const logout = async () => {
        await AsyncStorage.removeItem("user");
        router.replace('/auth/Login');
     }

    return (
        <ImageBackground
            source={require('../../assets/images/Home_bg.png')}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 justify-center px-5">

                <Text className="text-center text-[50px] mb-3 text-black font-bold">
                    Hello, {user?.name || user?.email || 'User'}
                </Text>

                <TouchableOpacity
                    onPress={logout}
                    className="bg-orange-500 py-4 rounded-lg"
                >
                    <Text className="text-black text-center font-bold text-base">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}