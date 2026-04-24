import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Car,
  User,
  Mail,
  Eye,
  EyeOff,
  Hash,
  LogIn,
  Info,
} from 'lucide-react-native';
import { ENDPOINTS, API_CONFIG } from '../services/api';
import { Role } from '@/constants/data';

export default function LoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('driver');
  const [bodyNumber, setBodyNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Input Required", "Please enter your email.");
      return;
    } else if (!email.endsWith("@gmail.com")) {
      Alert.alert("Invalid Email", "Only Gmail accounts are allowed.");
      return;
    } else if (!password){
      Alert.alert("Input Required", "Please enter your password.");
      return;
    }
    setIsLoading(true);

    try {

      const payload = {
        email: email,
        password: password,
        role: role,
        body_number: role === 'driver' ? bodyNumber : null,
      }

      const res = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.message || 'Invalid Credentials');
      }

      if (role === 'driver') {
        if (data.status === 'pending') {
          Alert.alert(
            'Account Pending',
            'Your Account is still being reviewed by MAMTTODA admin. Please wait for approval'
          );
        } else if (data.status === 'rejected') {
          Alert.alert('Account Rejected', 'Your account was not approved. Please contact the admin office.');
        } else {
          router.replace('/users/tricycle_driver/tabs/bulletin');
        }
      } else {
        router.replace('/users/passenger/tabs/announcements');
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5EFE8]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 48,
            paddingBottom: 32,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="mb-6">
            <View className="w-[88px] h-[88px] rounded-2xl bg-white items-center justify-center shadow-md">
              <Text className="text-4xl font-black text-[#7B1A1A] -tracking-tight">
                M
              </Text>
            </View>
          </View>

          {/* Header */}
          <Text className="text-[34px] font-black text-[#1A1A1A] text-center mb-2">
            Welcome Back
          </Text>

          <Text className="text-[15px] text-[#6B6059] text-center leading-6 mb-8 px-4">
            {role === 'driver'
              ? 'Continue your journey with the Heritage Gallery.'
              : 'Continue your journey through the collection of fine arts.'}
          </Text>

          {/* Toggle */}
          <View className="flex-row bg-[#EDE7DE] rounded-full p-1 mb-7 w-full">
            <TouchableOpacity
              onPress={() => setRole('driver')}
              activeOpacity={0.8}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${
                role === 'driver' ? 'bg-[#7B1A1A]' : ''
              }`}
            >
              <Car
                size={18}
                color={role === 'driver' ? '#fff' : '#7B1A1A'}
              />
              <Text
                className={`ml-2 text-[15px] font-semibold ${
                  role === 'driver' ? 'text-white' : 'text-[#7B1A1A]'
                }`}
              >
                Driver
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRole('passenger')}
              activeOpacity={0.8}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${
                role === 'passenger' ? 'bg-[#7B1A1A]' : ''
              }`}
            >
              <User
                size={18}
                color={role === 'passenger' ? '#fff' : '#7B1A1A'}
              />
              <Text
                className={`ml-2 text-[15px] font-semibold ${
                  role === 'passenger' ? 'text-white' : 'text-[#7B1A1A]'
                }`}
              >
                Passenger
              </Text>
            </TouchableOpacity>
          </View>

          {/* Body Number */}
          {role === 'driver' && (
            <View className="w-full mb-4">
              <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest mb-2">
                BODY NUMBER (TRICYCLE ID)
              </Text>

              <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-3">
                <TextInput
                  className="flex-1 text-[15px] text-[#1A1A1A]"
                  placeholder="e.g. 1234-A"
                  placeholderTextColor="#B0A8A0"
                  value={bodyNumber}
                  onChangeText={setBodyNumber}
                />
                <Hash size={18} color="#B0A8A0" />
              </View>
            </View>
          )}

          {/* Email */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest mb-2">
              EMAIL ADDRESS
            </Text>

            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-3">
              <TextInput
                className="flex-1 text-[15px] text-[#1A1A1A]"
                placeholder="e.g. driver@heritage.com"
                placeholderTextColor="#B0A8A0"
                value={email}
                onChangeText={setEmail}
              />
              <Mail size={18} color="#B0A8A0" />
            </View>
          </View>

          {/* Password */}
          <View className="w-full mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest">
                PASSWORD
              </Text>
              <TouchableOpacity onPress={() => router.push('/auth/forget_password')}>
                <Text className="text-[13px] font-semibold text-[#C8960C]">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-3">
              <TextInput
                className="flex-1 text-[15px] text-[#1A1A1A]"
                placeholder="••••••••"
                placeholderTextColor="#B0A8A0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={18} color="#B0A8A0" />
                ) : (
                  <Eye size={18} color="#B0A8A0" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Login */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.85}
            className={`flex-row items-center justify-center rounded-full py-4 w-full mt-2 mb-7 ${
              isLoading ? 'bg-gray-400' : 'bg-[#7B1A1A]'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="text-white text-[17px] font-bold mr-2">Login</Text>
                  <LogIn size={20} color="#C8960C" />
                </>
              )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center w-full mb-4">
            <View className="flex-1 h-[1px] bg-[#D8D0C8]" />
            <Text className="mx-3 text-[11px] font-bold text-[#A89880] tracking-widest">
              NEW HERE?
            </Text>
            <View className="flex-1 h-[1px] bg-[#D8D0C8]" />
          </View>

          {/* Switch */}
          <Text className="text-[15px] text-[#1A1A1A] mb-8">
            Don't have an account?{' '}
            <Text
              className="text-[#C8960C] font-bold"
              onPress={() => router.push('/auth/register')}
            >
              Sign Up
            </Text>
          </Text>

          {/* About */}
          <View className="items-center mb-5">
            <TouchableOpacity className="items-center">
              <View className="w-9 h-9 rounded-full bg-[#7B1A1A] items-center justify-center mb-1">
                <Info size={14} color="#fff" />
              </View>
              <Text className="text-[10px] font-bold text-[#7B1A1A] tracking-widest">
                ABOUT
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-[11px] text-[#A89880]">
            © 2024 MAMTTODA HERITAGE GALLERY
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}