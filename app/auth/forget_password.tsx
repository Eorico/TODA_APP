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
import { Mail, ArrowLeft, Send, Lock, EyeOff, Eye } from 'lucide-react-native';
import { ENDPOINTS, API_CONFIG } from '../services/api';
import { Step } from '@/constants/data';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Request Reset Code for the password
  const handleSendCode = async () => {
    if (!email) return Alert.alert("Required", "Please enter your email.");

    setIsLoading(true);

    try {
      const res = await fetch(ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        Alert.alert("Sent", "Verification code sent to your email.");
        setStep('code');
      } else {
        const data = await res.json();
        throw new Error(data.email || "Failed to send code")
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Verification of code 
  const handleVerifyCode = async () => {
    if (code.length < 6) return Alert.alert("Error", "Please enter the 6-digit code.");

    setIsLoading(true);

    try {
      const res = await fetch(ENDPOINTS.VERIFY_CODE, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ email, code })
      });

      if (res.ok) {
        setStep('password');
      } else {
        throw new Error("Invalid or expired code")
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) return Alert.alert("Error", "Password do not match.");
    if (newPassword.length < 6) return Alert.alert("Error", "Password too short.");

    setIsLoading(true);
    try {
      const payload = {
        email,
        code,
        new_password: newPassword
      }

      const res = await fetch(ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        Alert.alert("Success", "Password updated successfully!", [
          {text: "Login", onPress: () => router.replace('/auth/login')}
        ]);
      } else {
        throw new Error("Failed to reset password.");
      }

    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Progres bar width
  const getProgressWidth = () => {
    if (step === 'email' ) return '33%';
    if (step === 'code' ) return '66%';
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5EFE8]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerClassName="px-6 pt-4 pb-8 items-center"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            className="self-start w-10 h-10 rounded-xl bg-white items-center justify-center mb-5 shadow-sm"
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#7B1A1A" />
          </TouchableOpacity>

          {/* Logo */}
          <View className="mb-4">
            <View className="w-[88px] h-[88px] rounded-[20px] bg-white items-center justify-center shadow-md">
              <Text className="text-[36px] font-black text-[#7B1A1A]">M</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="w-full h-[4px] bg-[#EDE7DE] rounded-full mb-8 overflow-hidden">
            <View
              className="h-full bg-[#7B1A1A]"
              style={{
                width: getProgressWidth()
              }}
            />
          </View>

          {/* ================= EMAIL STEP ================= */}
          {step === 'email' && (
            <>
              <Text className="text-[34px] font-black text-center text-[#1A1A1A] mb-2">
                Reset Password
              </Text>

              <Text className="text-[15px] text-center text-[#6B6059] leading-6 mb-8 px-4">
                Enter your email address and we'll send you a code.
              </Text>

              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">
                  EMAIL ADDRESS
                </Text>

                <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <TextInput
                    className="flex-1 text-[15px] text-[#1A1A1A]"
                    placeholder="user@gmail.com"
                    placeholderTextColor="#B0A8A0"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Mail size={18} color="#B0A8A0" />
                </View>
              </View>

              <TouchableOpacity
                className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-6"
                onPress={handleSendCode}
                disabled={isLoading}
              >
                {isLoading ? <ActivityIndicator color={'#FFF'}/> :
                  (
                    <>
                    <Text className="text-white font-bold text-[17px] mr-2">
                      Send Code
                    </Text>
                    <Send size={20} color="#C8960C" />
                    </>
                  )
                }
              </TouchableOpacity>
            </>
          )}

          {/* ================= CODE STEP ================= */}
          {step === 'code' && (
            <>
              <Text className="text-[34px] font-black text-center mb-2">
                Verify Code
              </Text>

              <Text className="text-[15px] text-center text-[#6B6059] mb-8">
                Enter the 6-digit code sent to {email}.
              </Text>

              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">
                  VERIFICATION CODE
                </Text>

                <View className="bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <TextInput
                    className="text-[15px]"
                    placeholder="6-digit code"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={code}
                    onChangeText={setCode}
                  />
                </View>
              </View>

              <Text className="text-[13px] text-center text-[#6B6059] mb-6">
                Didn’t receive a code?{' '}
                <Text
                  className="text-[#C8960C] font-bold"
                  onPress={handleSendCode}
                >
                  Resend
                </Text>
              </Text>

              <TouchableOpacity
                className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-6"
                onPress={handleVerifyCode}
              >
                <Text className="text-white font-bold text-[17px] mr-2">
                  Verify
                </Text>
                <Send size={20} color="#C8960C" />
              </TouchableOpacity>
            </>
          )}

          {/* ================= PASSWORD STEP ================= */}
          {step === 'password' && (
            <>
              <Text className="text-[34px] font-black text-center mb-2">
                Create New Password
              </Text>

              <Text className="text-[15px] text-center text-[#6B6059] mb-8">
                Enter a strong password.
              </Text>

              {/* New Password */}
              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">
                  NEW PASSWORD
                </Text>

                <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <TextInput
                    className="flex-1"
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff color={'#B0A8A0'}/>: <Eye color={'#B0A8A0'}/>}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View className="w-full mb-6">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">
                  CONFIRM PASSWORD
                </Text>

                <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <TextInput
                    className="flex-1"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showPassword ? <EyeOff color={'#B0A8A0'}/>: <Eye color={'#B0A8A0'}/>}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-6"
                onPress={handleResetPassword}
              >
                <Text className="text-white font-bold text-[17px] mr-2">
                  Reset Password
                </Text>
                <Send size={20} color="#C8960C" />
              </TouchableOpacity>
            </>
          )}

          {/* Back to Login */}
          <Text className="text-[15px] text-[#1A1A1A]">
            Remember your password?{' '}
            <Text
              className="text-[#C8960C] font-bold"
              onPress={() => router.back()}
            >
              Back to Login
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}