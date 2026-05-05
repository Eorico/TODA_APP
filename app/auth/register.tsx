import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bike,
  UserRound,
  Hash,
  Phone,
  Upload,
  UserPlus,
  Info,
  Circle as HelpCircle,
  EyeOff,
  Eye,
  ArrowLeft
} from 'lucide-react-native';
import { AUTH_ENDPOINTS, API_CONFIG } from '../../services/api';
import { useRegistrationForm } from '@/hooks/use_register_form';
import { Controller } from 'react-hook-form';
import { Toast } from '@/components/toast';
import { useToast } from '@/hooks/use_toast';
import { Role } from '@/constants/data';

export default function RegisterScreen() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { isSubmitting, errors }
  } = useRegistrationForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const agreed = watch('agreed');
  const licenseUploaded = watch('licenseUploaded');
  const orcrUploaded = watch('orcrUploaded')
  const role = watch('role');
  const isPassenger = role === 'passenger';

  const pickLicenseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      showToast("We need gallery access to upload your license.", 'warning');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setValue('licenseUploaded', result.assets[0].uri);
    }
  };

  const pickOrCrImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showToast('We need gallery access to upload your OR/CR.', 'warning');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      setValue('orcrUploaded', result.assets[0].uri);
    }
  };

  const handleRegister = handleSubmit(async (data) => {
    try {
      const ENDPOINTS = AUTH_ENDPOINTS(data.role as Role);
      // Validate email format via form error instead of alert
      if (!data.email.endsWith('@gmail.com')) {
        setError('email', { message: 'Only Gmail accounts are allowed.' });
        return;
      }

      // Validate password match via form error instead of alert
      if (data.password !== data.confirmPassword) {
        setError('confirmPassword', { message: 'Passwords do not match.' });
        return;
      }

      if (data.role !== 'passenger' && !data.licenseUploaded) {
        setError('licenseUploaded', { message: "Please upload your driver's license." });
        return;
      }

      if (data.role !== 'passenger' && !data.orcrUploaded) {
        setError('orcrUploaded', { message: 'Please upload your OR/CR.' });
        return;
      }

      let headers = { ...API_CONFIG.headers };
      let body: any;

      if (data.role !== 'passenger' && data.licenseUploaded) {
        const formData = new FormData();

        formData.append('full_name', data.fullName);
        formData.append('email', data.email);
        formData.append('contact_number', data.contact);
        formData.append('password', data.password);
        formData.append('role', data.role);
        formData.append('address', data.address || '');
        formData.append('body_number', data.bodyNumber || '');

        const uriParts = data.licenseUploaded.split('.');
        const fileType = uriParts[uriParts.length - 1];

        // @ts-ignore
        formData.append('license_file', {
          uri: data.licenseUploaded,
          name: `license.${fileType}`,
          type: `image/${fileType}`,
        });

        if (data.orcrUploaded) {
          const orcrParts = data.orcrUploaded.split('.');
          const orcrType = orcrParts[orcrParts.length - 1];
          // @ts-ignore
          formData.append('orcr_file', {
            uri: data.orcrUploaded,
            name: `orcr.${orcrType}`,
            type: `image/${orcrType}`,
          });
        }

        body = formData;
        delete (headers as any)['Content-Type'];
      } else {
        const formData = new FormData();
        formData.append('full_name', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password); 
        formData.append('contact_number', data.contact);

        body = formData;
        delete (headers as any)['Content-Type'];
      }

      const res = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers,
        body,
      });

      const response = await res.json();

      if (res.ok) {
        showToast(
          data.role === 'driver'
            ? 'Application submitted!'
            : 'Account created successfully',
          'success'
        );
        router.replace('/auth/login');
      } else {
        throw new Error(response.detail || response.message);
      }
    } catch (error: any) {
      showToast(error.message || 'Registration failed. Please try again.', 'error');
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

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerClassName="px-6 pt-12 pb-10 items-center"
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
          <Text className="text-[34px] font-black text-[#1A1A1A] text-center mb-2">
            {isPassenger ? 'Create Account' : 'Join Our Community'}
          </Text>

          <Text className="text-[15px] text-[#6B6059] text-center leading-6 mb-6 px-4">
            {isPassenger
              ? 'Join our community of tricycle drivers and passengers.'
              : 'Become a certified driver for our heritage transport network.'}
          </Text>

          {/* Role Toggle Label */}
          <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest mb-2">
            REGISTER AS
          </Text>

          {/* Role Toggle */}
          <View className="flex-row bg-[#EDE7DE] rounded-full p-1 mb-7 w-full">
            {/* Passenger */}
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${
                role === 'passenger' ? 'bg-[#7B1A1A]' : ''
              }`}
              onPress={() => setValue('role', 'passenger')}
            >
              <UserRound size={18} color={role === 'passenger' ? '#FFF' : '#7B1A1A'} />
              <Text
                className={`ml-2 font-bold ${
                  role === 'passenger' ? 'text-white' : 'text-[#7B1A1A]'
                }`}
              >
                Passenger
              </Text>
            </TouchableOpacity>

            {/* Driver */}
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${
                role === 'driver' ? 'bg-[#7B1A1A]' : ''
              }`}
              onPress={() => setValue('role', 'driver')}
            >
              <Bike size={18} color={role === 'driver' ? '#FFF' : '#7B1A1A'} />
              <Text
                className={`ml-2 font-bold ${
                  role === 'driver' ? 'text-white' : 'text-[#7B1A1A]'
                }`}
              >
                Tricycle Driver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
              FULL NAME
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
              <Controller
                control={control}
                name="fullName"
                rules={{ required: 'Full name is required.' }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="flex-1 text-[15px] text-[#1A1A1A]"
                    placeholder="John Doe"
                    placeholderTextColor="#B0A8A0"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <UserRound size={18} color="#B0A8A0" />
            </View>
            {errors.fullName && (
              <Text className="text-[12px] text-[#FF0000] mt-1">
                {errors.fullName.message}
              </Text>
            )}
          </View>

          {/* Email */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
              EMAIL ADDRESS
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
              <Controller
                control={control}
                name="email"
                rules={{ required: 'Email is required.' }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="flex-1 text-[15px] text-[#1A1A1A]"
                    placeholder="example@gmail.com"
                    placeholderTextColor="#B0A8A0"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <UserRound size={18} color="#B0A8A0" />
            </View>
            {errors.email && (
              <Text className="text-[12px] text-[#FF0000] mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Driver-only fields */}
          {!isPassenger && (
            <>
              {/* Address */}
              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
                  COMPLETE ADDRESS
                </Text>
                <View className="bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <Controller
                    control={control}
                    name="address"
                    rules={{ required: 'Address is required.' }}
                    render={({ field: { value, onChange } }) => (
                      <TextInput
                        className="text-[15px] text-[#1A1A1A]"
                        placeholder="Street, Barangay, City"
                        placeholderTextColor="#B0A8A0"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                </View>
                {errors.address && (
                  <Text className="text-[12px] text-[#FF0000] mt-1">
                    {errors.address.message}
                  </Text>
                )}
              </View>

              {/* Body Number */}
              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
                  BODY NUMBER
                </Text>
                {/* FIX: Hash icon moved outside Controller but still inside the row View */}
                <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <Controller
                    control={control}
                    name="bodyNumber"
                    rules={{ required: 'Body number is required.' }}
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
                  <Text className="text-[12px] text-[#FF0000] mt-1">
                    {errors.bodyNumber.message}
                  </Text>
                )}
              </View>
            </>
          )}

          {/* Contact Number */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
              CONTACT NUMBER
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
              <Controller
                control={control}
                name="contact"
                rules={{ required: 'Contact number is required.' }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="flex-1 text-[15px] text-[#1A1A1A]"
                    placeholder="09XXXXXXXXX"
                    placeholderTextColor="#B0A8A0"
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Phone size={18} color="#B0A8A0" />
            </View>
            {errors.contact && (
              <Text className="text-[12px] text-[#FF0000] mt-1">
                {errors.contact.message}
              </Text>
            )}
          </View>

          {/* Password */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
              PASSWORD
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
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
                {showPassword
                  ? <EyeOff size={18} color="#B0A8A0" />
                  : <Eye size={18} color="#B0A8A0" />}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-[12px] text-[#FF0000] mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
              CONFIRM PASSWORD
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
              <Controller
                control={control}
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
                {showConfirmPassword
                  ? <EyeOff size={18} color="#B0A8A0" />
                  : <Eye size={18} color="#B0A8A0" />}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text className="text-[12px] text-[#FF0000] mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Driver's License Upload */}
          {!isPassenger && (
            <View className="w-full mb-6">
              <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
                DRIVER'S LICENSE
              </Text>
              <TouchableOpacity
                className={`w-full border-2 border-dashed rounded-2xl overflow-hidden items-center justify-center ${
                  licenseUploaded
                    ? 'border-[#7B1A1A] bg-[#F5EBE0]'
                    : 'border-[#D8CCBC] bg-[#FAF6F0]'
                }`}
                style={{ height: 160 }}
                onPress={pickLicenseImage}
              >
                {licenseUploaded ? (
                  // FIX: replaced `inset-0` with explicit absolute positioning
                  <View className="w-full h-full">
                    <Image
                      source={{ uri: licenseUploaded }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <View
                      className="absolute bg-black/20 items-center justify-center"
                      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                      <Text className="text-white font-bold">Tap to Change</Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <View className="w-12 h-12 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                      <Upload size={20} color="#7B1A1A" />
                    </View>
                    <Text className="font-bold text-[#6B6059]">Upload License Photo</Text>
                    <Text className="text-[12px] text-[#B0A8A0]">Clear photo of front side</Text>
                  </>
                )}
              </TouchableOpacity>
              {/* FIX: added missing license error display */}
              {errors.licenseUploaded && (
                <Text className="text-[12px] text-[#FF0000] mt-1">
                  {errors.licenseUploaded.message}
                </Text>
              )}
            </View>
          )}

          {/* OR/CR Upload */}
          {!isPassenger && (
            <View className="w-full mb-6">
              <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
                OR / CR (Official Receipt / Certificate of Registration)
              </Text>
              <TouchableOpacity
                className={`w-full border-2 border-dashed rounded-2xl overflow-hidden items-center justify-center ${
                  orcrUploaded ? 'border-[#7B1A1A] bg-[#F5EBE0]' : 'border-[#D8CCBC] bg-[#FAF6F0]'
                }`}
                style={{ height: 160 }}
                onPress={pickOrCrImage}
              >
                {orcrUploaded ? (
                  <View className="w-full h-full">
                    <Image
                      source={{ uri: orcrUploaded }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <View
                      className="absolute bg-black/20 items-center justify-center"
                      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                      <Text className="text-white font-bold">Tap to Change</Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <View className="w-12 h-12 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                      <Upload size={20} color="#7B1A1A" />
                    </View>
                    <Text className="font-bold text-[#6B6059]">Upload OR/CR Photo</Text>
                    <Text className="text-[12px] text-[#B0A8A0]">Official Receipt or Certificate of Registration</Text>
                  </>
                )}
              </TouchableOpacity>
              {errors.orcrUploaded && (
                <Text className="text-[12px] text-[#FF0000] mt-1">
                  {errors.orcrUploaded.message}
                </Text>
              )}
            </View>
          )}

          {/* Terms checkbox — shown for both roles */}
          <TouchableOpacity
            className="flex-row items-start w-full mb-6"
            onPress={() => setValue('agreed', !watch('agreed'))}
          >
            <View
              className={`w-5 h-5 rounded-md border-2 mr-3 items-center justify-center ${
                agreed ? 'bg-[#7B1A1A] border-[#7B1A1A]' : 'border-gray-400'
              }`}
            >
              {agreed && <Text className="text-white text-[12px]">✓</Text>}
            </View>
            <Text className="flex-1 text-[14px] text-[#1A1A1A]">
              I agree to the Terms and Privacy Policy
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-4"
            onPress={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text className="text-white font-bold text-[17px] mr-2">Sign Up</Text>
                <UserPlus size={20} color="#C8960C" />
              </>
            )}
          </TouchableOpacity>

          {/* Footer Links */}
          <View className="flex-row mt-4">
            <TouchableOpacity className="items-center mx-4">
              <View className="w-9 h-9 rounded-full bg-[#7B1A1A] items-center justify-center">
                <Info size={14} color="#FFF" />
              </View>
              <Text className="text-[10px] mt-1 font-bold text-[#7B1A1A]">ABOUT</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center mx-4">
              <View className="w-9 h-9 rounded-full bg-[#7B1A1A] items-center justify-center">
                <HelpCircle size={14} color="#FFF" />
              </View>
              <Text className="text-[10px] mt-1 font-bold text-[#7B1A1A]">SUPPORT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}