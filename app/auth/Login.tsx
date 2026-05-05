import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bike, UserRound, Mail, Eye, EyeOff, Hash, LogIn, Info } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { AUTH_ENDPOINTS, API_CONFIG } from '@/services/api';
import { useLoginForm } from '@/hooks/use_login_form';
import { Toast } from '@/components/toast';
import { useToast } from '@/hooks/use_toast';
import { Role } from '@/constants/data';

export default function LoginScreen() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  const role = watch('role');

  const handleLogin = handleSubmit(async (data) => {
    if (!data.email.endsWith('@gmail.com')) {
      setError('email', { message: 'Only Gmail accounts are allowed.' });
      return;
    }

    try {
      const ENDPOINTS = AUTH_ENDPOINTS(data.role as Role);
      const payload = {
        email: data.email,
        password: data.password,
        role: data.role,
        body_number: data.role === 'driver' ? data.bodyNumber : null,
      };

      const res = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(payload),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.detail || response.message || 'Invalid Credentials');
      }

      if (response.role !== data.role) {
        showToast(
          response.role === 'driver' 
          ? 'This account is registered as a driver. Please switch to the driver role or use a different account.'
          : 'This account is registered as a passenger. Please switch to the passenger role or use a different account.',
          'warning'
        );
        return;
      }

      if (data.role === 'driver') {
        if (response.status === 'pending') {
          showToast('Your account is still being reviewed. Please wait for approval.', 'info');
        } else if (response.status === 'rejected') {
          showToast('Your account was not approved. Please contact the admin office.', 'error');
        } else {
          router.replace('/users/tricycle_driver/tabs/bulletin');
        }
      } else {
        router.replace('/users/passenger/tabs/bulletin');
      }
    } catch (error: any) {
      showToast(error.message || 'Login failed. Please try again.', 'error');
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F5EFE8]">

      <Toast 
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32, alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="mb-6  top-3">
            <View className="w-[98px] h-[88px] rounded-2xl bg-white items-center justify-center shadow-md">
              <Image
                source={require("@/assets/images/Logo.png")}
                style={{ width: 150, height: 150, borderRadius: 12 }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Header */}
          <Text className="text-[34px] font-black text-[#1A1A1A] text-center mb-2">Welcome Back</Text>
          <Text className="text-[15px] text-[#6B6059] text-center leading-6 mb-8 px-4">
            {role === 'driver'
              ? 'Continue your journey as a tricycle driver.'
              : 'Come and see the latest updates and announcements from the MAMTTODA.'}
          </Text>

          {/* Role Toggle */}
          <View className="flex-row bg-[#EDE7DE] rounded-full p-1 mb-7 w-full">
            <TouchableOpacity
              onPress={() => setValue('role', 'passenger')}
              activeOpacity={0.8}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${role === 'passenger' ? 'bg-[#7B1A1A]' : ''}`}
            >
              <UserRound size={18} color={role === 'passenger' ? '#fff' : '#7B1A1A'} />
              <Text className={`ml-2 text-[15px] font-semibold ${role === 'passenger' ? 'text-white' : 'text-[#7B1A1A]'}`}>
                Passenger
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue('role', 'driver')}
              activeOpacity={0.8}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${role === 'driver' ? 'bg-[#7B1A1A]' : ''}`}
            >
              <Bike size={18} color={role === 'driver' ? '#fff' : '#7B1A1A'} />
              <Text className={`ml-2 text-[15px] font-semibold ${role === 'driver' ? 'text-white' : 'text-[#7B1A1A]'}`}>
                Tricycle Driver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Body Number — driver only */}
          {role === 'driver' && (
            <View className="w-full mb-4">
              <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest mb-2">
                BODY NUMBER (TRICYCLE ID)
              </Text>
              <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-3">
                <Controller
                  control={control}
                  name="bodyNumber"
                  rules={{ required: role === 'driver' ? 'Body number is required.' : false }}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      className="flex-1 text-[15px] text-[#1A1A1A]"
                      placeholder="e.g. 1234-A"
                      placeholderTextColor="#B0A8A0"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <Hash size={18} color="#B0A8A0" />
              </View>
              {errors.bodyNumber && (
                <Text className="text-[12px] text-[#FF0000] mt-1">{errors.bodyNumber.message}</Text>
              )}
            </View>
          )}

          {/* Email */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest mb-2">EMAIL ADDRESS</Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-3">
              <Controller
                control={control}
                name="email"
                rules={{ required: 'Email is required.' }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="flex-1 text-[15px] text-[#1A1A1A]"
                    placeholder="e.g. driver@gmail.com"
                    placeholderTextColor="#B0A8A0"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Mail size={18} color="#B0A8A0" />
            </View>
            {errors.email && (
              <Text className="text-[12px] text-[#FF0000] mt-1">{errors.email.message}</Text>
            )}
          </View>

          {/* Password */}
          <View className="w-full mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest">PASSWORD</Text>
              <TouchableOpacity onPress={() => router.push('/auth/forget_password')}>
                <Text className="text-[13px] font-semibold text-[#C8960C]">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-3">
              <Controller
                control={control}
                name="password"
                rules={{ required: 'Password is required.' }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="flex-1 text-[15px] text-[#1A1A1A]"
                    placeholder="••••••••"
                    placeholderTextColor="#B0A8A0"
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color="#B0A8A0" /> : <Eye size={18} color="#B0A8A0" />}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-[12px] text-[#FF0000] mt-1">{errors.password.message}</Text>
            )}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isSubmitting}
            activeOpacity={0.85}
            className={`flex-row items-center justify-center rounded-full py-4 w-full mt-2 mb-7 ${isSubmitting ? 'bg-gray-400' : 'bg-[#7B1A1A]'}`}
          >
            {isSubmitting ? (
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
            <Text className="mx-3 text-[11px] font-bold text-[#A89880] tracking-widest">NEW HERE?</Text>
            <View className="flex-1 h-[1px] bg-[#D8D0C8]" />
          </View>

          <Text className="text-[15px] text-[#1A1A1A] mb-8">
            Don't have an account?{' '}
            <Text className="text-[#C8960C] font-bold" onPress={() => router.push('/auth/register')}>
              Sign Up
            </Text>
          </Text>

          {/* About */}
          <View className="items-center mb-5">
            <TouchableOpacity className="items-center">
              <View className="w-9 h-9 rounded-full bg-[#7B1A1A] items-center justify-center mb-1">
                <Info size={14} color="#fff" />
              </View>
              <Text className="text-[10px] font-bold text-[#7B1A1A] tracking-widest">ABOUT</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-[11px] text-[#A89880]">© 2024 MAMTTODA HERITAGE GALLERY</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}