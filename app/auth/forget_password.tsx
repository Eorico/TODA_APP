import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, ArrowLeft, Send, EyeOff, Eye } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { ENDPOINTS, API_CONFIG } from '../services/api';
import { Step } from '@/constants/data';
import {
  useEmailStepForm,
  useCodeStepForm,
  usePasswordStepForm,
} from '@/hooks/use_forgot_password_form';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useEmailStepForm();
  const codeForm = useCodeStepForm();
  const passwordForm = usePasswordStepForm();

  const submittedEmail = emailForm.watch('email');

  const getProgressWidth = () => {
    if (step === 'email') return '33%';
    if (step === 'code') return '66%';
    return '100%';
  };

  // Step 1 — Send Code
  const handleSendCode = emailForm.handleSubmit(async (data) => {
    try {
      const res = await fetch(ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ email: data.email }),
      });

      if (res.ok) {
        Alert.alert('Sent', 'Verification code sent to your email.');
        setStep('code');
      } else {
        const json = await res.json();
        emailForm.setError('email', { message: json.email || 'Failed to send code.' });
      }
    } catch (error: any) {
      emailForm.setError('email', { message: error.message });
    }
  });

  // Step 2 — Verify Code
  const handleVerifyCode = codeForm.handleSubmit(async (data) => {
    try {
      const res = await fetch(ENDPOINTS.VERIFY_CODE, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ email: submittedEmail, code: data.code }),
      });

      if (res.ok) {
        setStep('password');
      } else {
        codeForm.setError('code', { message: 'Invalid or expired code.' });
      }
    } catch (error: any) {
      codeForm.setError('code', { message: error.message });
    }
  });

  // Step 3 — Reset Password
  const handleResetPassword = passwordForm.handleSubmit(async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError('confirmPassword', { message: 'Passwords do not match.' });
      return;
    }

    try {
      const res = await fetch(ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({
          email: submittedEmail,
          code: codeForm.getValues('code'),
          new_password: data.newPassword,
        }),
      });

      if (res.ok) {
        Alert.alert('Success', 'Password updated successfully!', [
          { text: 'Login', onPress: () => router.replace('/auth/login') },
        ]);
      } else {
        passwordForm.setError('newPassword', { message: 'Failed to reset password.' });
      }
    } catch (error: any) {
      passwordForm.setError('newPassword', { message: error.message });
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F5EFE8]">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
            <View className="h-full bg-[#7B1A1A]" style={{ width: getProgressWidth() }} />
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
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">EMAIL ADDRESS</Text>
                <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <Controller
                    control={emailForm.control}
                    name="email"
                    rules={{ required: 'Email is required.' }}
                    render={({ field: { value, onChange } }) => (
                      <TextInput
                        className="flex-1 text-[15px] text-[#1A1A1A]"
                        placeholder="user@gmail.com"
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
                {emailForm.formState.errors.email && (
                  <Text className="text-[12px] text-[#FF0000] mt-1">
                    {emailForm.formState.errors.email.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-6"
                onPress={handleSendCode}
                disabled={emailForm.formState.isSubmitting}
              >
                {emailForm.formState.isSubmitting ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-[17px] mr-2">Send Code</Text>
                    <Send size={20} color="#C8960C" />
                  </>
                )}
              </TouchableOpacity>
            </>
          )}

          {/* ================= CODE STEP ================= */}
          {step === 'code' && (
            <>
              <Text className="text-[34px] font-black text-center mb-2">Verify Code</Text>
              <Text className="text-[15px] text-center text-[#6B6059] mb-8">
                Enter the 6-digit code sent to {submittedEmail}.
              </Text>

              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">VERIFICATION CODE</Text>
                <View className="bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <Controller
                    control={codeForm.control}
                    name="code"
                    rules={{
                      required: 'Code is required.',
                      minLength: { value: 6, message: 'Please enter the 6-digit code.' },
                    }}
                    render={({ field: { value, onChange } }) => (
                      <TextInput
                        className="text-[15px] text-[#1A1A1A]"
                        placeholder="6-digit code"
                        placeholderTextColor="#B0A8A0"
                        keyboardType="number-pad"
                        maxLength={6}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                </View>
                {codeForm.formState.errors.code && (
                  <Text className="text-[12px] text-[#FF0000] mt-1">
                    {codeForm.formState.errors.code.message}
                  </Text>
                )}
              </View>

              <Text className="text-[13px] text-center text-[#6B6059] mb-6">
                Didn't receive a code?{' '}
                <Text className="text-[#C8960C] font-bold" onPress={handleSendCode}>
                  Resend
                </Text>
              </Text>

              <TouchableOpacity
                className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-6"
                onPress={handleVerifyCode}
                disabled={codeForm.formState.isSubmitting}
              >
                {codeForm.formState.isSubmitting ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-[17px] mr-2">Verify</Text>
                    <Send size={20} color="#C8960C" />
                  </>
                )}
              </TouchableOpacity>
            </>
          )}

          {/* ================= PASSWORD STEP ================= */}
          {step === 'password' && (
            <>
              <Text className="text-[34px] font-black text-center mb-2">Create New Password</Text>
              <Text className="text-[15px] text-center text-[#6B6059] mb-8">
                Enter a strong password.
              </Text>

              {/* New Password */}
              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">NEW PASSWORD</Text>
                <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <Controller
                    control={passwordForm.control}
                    name="newPassword"
                    rules={{
                      required: 'Password is required.',
                      minLength: { value: 6, message: 'Password must be at least 6 characters.' },
                    }}
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
                    {showPassword ? <EyeOff color="#B0A8A0" /> : <Eye color="#B0A8A0" />}
                  </TouchableOpacity>
                </View>
                {passwordForm.formState.errors.newPassword && (
                  <Text className="text-[12px] text-[#FF0000] mt-1">
                    {passwordForm.formState.errors.newPassword.message}
                  </Text>
                )}
              </View>

              {/* Confirm Password */}
              <View className="w-full mb-6">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">CONFIRM PASSWORD</Text>
                <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <Controller
                    control={passwordForm.control}
                    name="confirmPassword"
                    rules={{ required: 'Please confirm your password.' }}
                    render={({ field: { value, onChange } }) => (
                      <TextInput
                        className="flex-1 text-[15px] text-[#1A1A1A]"
                        placeholder="••••••••"
                        placeholderTextColor="#B0A8A0"
                        secureTextEntry={!showConfirmPassword}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff color="#B0A8A0" /> : <Eye color="#B0A8A0" />}
                  </TouchableOpacity>
                </View>
                {passwordForm.formState.errors.confirmPassword && (
                  <Text className="text-[12px] text-[#FF0000] mt-1">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-6"
                onPress={handleResetPassword}
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-[17px] mr-2">Reset Password</Text>
                    <Send size={20} color="#C8960C" />
                  </>
                )}
              </TouchableOpacity>
            </>
          )}

          {/* Back to Login */}
          <Text className="text-[15px] text-[#1A1A1A]">
            Remember your password?{' '}
            <Text className="text-[#C8960C] font-bold" onPress={() => router.back()}>
              Back to Login
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}