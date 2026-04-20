import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen () {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [showPass, setShowPass] = useState(false);

    const LoginLogic = async () => {
        if (!email || !pass) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        const userData = {
            email,
            name: email.split("@")[0],
        }

        await AsyncStorage.setItem("user", JSON.stringify(userData));
        router.replace('/home/homeScreen');
    };


    return (
        <KeyboardAvoidingView
                className="flex-1 bg-white"
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
        >

            <ImageBackground
                source={require('../../assets/images/Login_bg.png')}
                className="flex-1"
                resizeMode="cover"
            >
                
                <View
                    className="flex-1 justify-center px-3 mt-[350px]"
                >

                    <Text
                        className="text-2xl font-bold mb-5 text-center"
                    >
                        Login
                    </Text>

                    <TextInput 
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        className="border border-black p-3 mb-2 rounded-lg pr-11"
                    />
                    
                    <View style={{ position: 'relative', marginBottom: 10}}>
                        <TextInput 
                            placeholder="Password"
                            value={pass}
                            onChangeText={setPass}
                            secureTextEntry={!showPass}
                            className="border border-black p-4 rounded-lg"
                        />

                        <TouchableOpacity 
                            className="absolute right-4 top-1/2 -translate-y-4"
                            onPress={() => setShowPass(!showPass)}
                        >
                            <Ionicons name={showPass ? "eye-off" : "eye"} size={24} color="#030303ab" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        onPress={LoginLogic}
                        className="bg-orange-500 p-4 rounded-lg mb-2"
                    >
                        <Text
                            className="text-black text-center font-bold tex-[15px]"
                        >
                            Login
                        </Text>
                    </TouchableOpacity>

                    <Text
                        className="mt-5 text-blue-600 text-center"
                        onPress={() => router.push('/auth/Signin')}
                    >
                        Don't have an acocunt? Sign Up
                    </Text>

                </View>

            </ImageBackground>
    </KeyboardAvoidingView>
    );
};