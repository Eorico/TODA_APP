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
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Car,
  User,
  Hash,
  Phone,
  Upload,
  UserPlus,
  Info,
  Circle as HelpCircle,
  EyeOff,
  Eye
} from 'lucide-react-native';
import { ENDPOINTS, API_CONFIG } from '../services/api';
import { Role } from '@/constants/data';

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('passenger');
  const [isLoading, setIsLoading] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [bodyNumber, setBodyNumber] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreed, setAgreed] = useState(false);
  const [licenseUploaded, setLicenseUploaded] = useState<string | null>(null);

  const isPassenger = role === 'passenger';

  const pickLicenseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need gallery access to upload your license.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setLicenseUploaded(result.assets[0].uri);
    }
  }
  
  
  const handleRegister = async () => {
    if (!fullName || !email || !contact || !password) {
      Alert.alert("Missing Info", "Please fill in all required fields.")
      return;
    } 
    
    if (!email.endsWith("@gmail.com")) {
      Alert.alert("Invalid Email", "Only Gmail accounts are allowed.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Mismatch", "Password do not match");
      return;
    }

    if (!isPassenger && !licenseUploaded) {
      Alert.alert("License Required", "Please upload your driver's license");
      return;
    }

    setIsLoading(true);

    try {
      let body;
      let headers = { ...API_CONFIG.headers };

      if (!isPassenger && licenseUploaded) {
        const formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('email', email);
        formData.append('contact_number', contact);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('address', address);
        formData.append('body_number', bodyNumber);
        
        const uriParts = licenseUploaded.split('.');
        const fileType = uriParts[uriParts.length - 1];
        
        // @ts-ignore
        formData.append('license_file', {
          uri: licenseUploaded,
          name: `license.${fileType}`,
          type: `image/${fileType}`,
        });

        body = formData;
        // Delete content-type header to let the browser set the boundary automatically
        delete (headers as any)['Content-Type']; 
      } else {
        body = JSON.stringify({
          full_name: fullName,
          email: email,
          contact_number: contact,
          password: password,
          role: role,
        });
      }

      const res = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: headers,
        body: body
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", role === 'driver' ? 
          "Application submitted! Please wait for admin approval." : 
          "Account created successfully");
        router.replace('/auth/login');
      } else {
        // Backend error (e.g. email already exists)
        throw new Error(data.detail || data.message || "Registration failed");
      }
    } catch (error: any) {
      Alert.alert("Registration Error", error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false); // This stops the spinner
    }
    
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5EFE8]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerClassName="px-6 pt-12 pb-10 items-center"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="mb-6">
            <View className="w-[88px] h-[88px] rounded-[20px] bg-white items-center justify-center shadow-md">
              <Text className="text-[36px] font-black text-[#7B1A1A]">M</Text>
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

          {/* Role Toggle */}
          {isPassenger && (
            <Text className="text-[11px] font-bold text-[#7B1A1A] tracking-widest mb-2">
              REGISTER AS
            </Text>
          )}

          <View className="flex-row bg-[#EDE7DE] rounded-full p-1 mb-7 w-full">
            {/* Passenger */}
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${
                role === 'passenger' ? 'bg-[#7B1A1A]' : ''
              }`}
              onPress={() => setRole('passenger')}
            >
              <User
                size={18}
                color={role === 'passenger' ? '#FFF' : '#7B1A1A'}
              />
              <Text
                className={`ml-2 font-bold ${
                  role === 'passenger' ? 'text-white' : 'text-[#7B1A1A]'
                }`}
              >
                {isPassenger ? 'PASSENGER' : 'Passenger'}
              </Text>
            </TouchableOpacity>

            {/* Driver */}
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${
                role === 'driver' ? 'bg-[#7B1A1A]' : ''
              }`}
              onPress={() => setRole('driver')}
            >
              <Car
                size={18}
                color={role === 'driver' ? '#FFF' : '#7B1A1A'}
              />
              <Text
                className={`ml-2 font-bold ${
                  role === 'driver' ? 'text-white' : 'text-[#7B1A1A]'
                }`}
              >
                {isPassenger ? 'DRIVER' : 'Driver'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
              FULL NAME
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
              <TextInput
                className="flex-1 text-[15px] text-[#1A1A1A]"
                placeholder="John Doe"
                placeholderTextColor="#B0A8A0"
                value={fullName}
                onChangeText={setFullName}
              />
              {isPassenger && <User size={18} color="#B0A8A0" />}
            </View>
          </View>
          
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2 tracking-wider">
              EMAIL ADDRESS
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
              <TextInput
                className="flex-1 text-[15px] text-[#1A1A1A]"
                placeholder="Mamttoda@gmail.com"
                placeholderTextColor="#B0A8A0"
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
              />
              {isPassenger && <User size={18} color="#B0A8A0" />}
            </View>
          </View>


          {/* Driver-only fields */}
          {!isPassenger && (
            <>
              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">
                  COMPLETE ADDRESS
                </Text>
                <View className="bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <TextInput
                    className="text-[15px]"
                    placeholder="Street, Barangay, City"
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>
              </View>

              <View className="w-full mb-4">
                <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">
                  BODY NUMBER
                </Text>
                <View className="bg-[#EDE7DE] rounded-2xl px-4 py-4">
                  <TextInput
                    className="text-[15px]"
                    placeholder="e.g. 1234-A"
                    value={bodyNumber}
                    onChangeText={setBodyNumber}
                  />
                  <Hash size={18} color={'#B0A8A0'}/>
                </View>
              </View>
            </>
          )}

          {/* Contact */}
          <View className="w-full mb-4">
            <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">
              CONTACT NUMBER
            </Text>
            <View className="flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4">
              <TextInput 
                className="flex-1 text-[15px]" 
                keyboardType='phone-pad'
                value={contact}
                onChangeText={setContact}
              />
              {isPassenger && <Phone size={18} color="#B0A8A0" />}
            </View>
          </View>

          {/* Password Fields */}
          <View className='w-full mb-4'>
            <Text className='text-[11px] font-bold text-[#7B1A1A] mb-2'>
              PASSWORD
            </Text>
            <View className='flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4'>
              <TextInput
                className='flex-1 text-[15px]'
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} color={'#B0A8A0'}/> : <Eye size={18} color={'#B0A8A0'}/>}
              </TouchableOpacity>
            </View>
          </View>

          <View className='w-full mb-4'>
            <Text className='text-[11px] font-bold text-[#7B1A1A] mb-2'>
              CONFIRM PASSWORD
            </Text>
            <View className='flex-row items-center bg-[#EDE7DE] rounded-2xl px-4 py-4'>
              <TextInput
                className='flex-1 text-[15px]'
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} color={'#B0A8A0'}/> : <Eye size={18} color={'#B0A8A0'}/>}
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. Updated License Upload Section */}
          {!isPassenger && (
            <View className="w-full mb-6">
              <Text className="text-[11px] font-bold text-[#7B1A1A] mb-2">DRIVER'S LICENSE</Text>
              <TouchableOpacity
                className={`w-full border-2 border-dashed rounded-2xl overflow-hidden items-center justify-center ${
                  licenseUploaded ? 'border-[#7B1A1A] bg-[#F5EBE0]' : 'border-[#D8CCBC] bg-[#FAF6F0]'
                }`}
                style={{ height: 160 }}
                onPress={pickLicenseImage}
              >
                {licenseUploaded ? (
                  <View className="w-full h-full">
                    <Image source={{ uri: licenseUploaded }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute inset-0 bg-black/20 items-center justify-center">
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
            </View>
          )}

          {/* Terms and Agreement Checkbox */}
          {isPassenger && (
            <TouchableOpacity
              className="flex-row items-start w-full mb-6"
              onPress={() => setAgreed(!agreed)}
            >
              <View
                className={`w-5 h-5 rounded-md border-2 mr-3 items-center justify-center ${
                  agreed ? 'bg-[#7B1A1A]' : 'border-gray-400'
                }`}
              >
                {agreed && <Text className="text-white">✓</Text>}
              </View>
              <Text className="flex-1 text-[14px]">
                I agree to Terms and Privacy Policy
              </Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#7B1A1A] rounded-full py-4 w-full mb-4"
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color={'#FFF'}/> :
              (
                <>
                <Text className="text-white font-bold text-[17px] mr-2">
                  Sign Up
                </Text>
                <UserPlus size={20} color="#C8960C" />
                </>
              )
            }
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row mt-4">
            <TouchableOpacity className="items-center mx-4">
              <View className="w-9 h-9 rounded-full bg-[#7B1A1A] items-center justify-center">
                <Info size={14} color="#FFF" />
              </View>
              <Text className="text-[10px] mt-1 font-bold text-[#7B1A1A]">
                ABOUT
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center mx-4">
              <View className="w-9 h-9 rounded-full bg-[#7B1A1A] items-center justify-center">
                <HelpCircle size={14} color="#FFF" />
              </View>
              <Text className="text-[10px] mt-1 font-bold text-[#7B1A1A]">
                SUPPORT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}