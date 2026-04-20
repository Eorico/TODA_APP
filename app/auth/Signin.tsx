import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen () {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const SignUpLogic = async () => {
    if (!name || !email || !pass || !confirmPass) {
      Alert.alert('Invalid', 'Please fill all fields!');
      return;
    }

    if (pass !== confirmPass) {
      Alert.alert('Invalid', 'Password does not match!');
      return;
    }

    try {
      const user = {
        name,
        email,
        password: pass,
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/auth/Login');

    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <ImageBackground
        source={require('../../assets/images/SignUp_bg.png')}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 justify-center px-5 mt-[370px]">

          {/* TITLE */}
          <Text className="text-[20px] font-bold mb-5 text-center">
            Create Account
          </Text>

          {/* NAME */}
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setname}
            className="border border-gray-400 p-3 mb-2.5 rounded-lg bg-white"
          />

          {/* EMAIL */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="border border-gray-400 p-3 mb-2.5 rounded-lg bg-white"
          />

          {/* PASSWORD */}
          <View className="relative mb-2.5">
            <TextInput
              placeholder="Password"
              value={pass}
              onChangeText={setPass}
              secureTextEntry={!showPass}
              className="border border-gray-400 p-3 rounded-lg bg-white"
            />

            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowPass(!showPass)}
            >
              <Ionicons
                name={showPass ? "eye-off" : "eye"}
                size={24}
                color="#030303ab"
              />
            </TouchableOpacity>
          </View>

          {/* CONFIRM PASSWORD */}
          <View className="relative mb-2.5">
            <TextInput
              placeholder="Confirm Password"
              value={confirmPass}
              onChangeText={setConfirmPass}
              secureTextEntry={!showPass}
              className="border border-gray-400 p-3 rounded-lg bg-white"
            />

            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowPass(!showPass)}
            >
              <Ionicons
                name={showPass ? "eye-off" : "eye"}
                size={24}
                color="#030303ab"
              />
            </TouchableOpacity>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            onPress={SignUpLogic}
            className="bg-[#FF9D00] py-3 rounded-lg mb-2.5"
          >
            <Text className="text-black text-center font-bold">
              Create
            </Text>
          </TouchableOpacity>

          {/* LOGIN LINK */}
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-600 text-center mt-4">
              Already have an account? Login
            </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}