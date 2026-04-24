import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Pencil, User, Wifi, ShieldCheck } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function AccountScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* PROFILE CARD */}
        <View className="bg-[#F0E8E4] mx-4 mt-5 rounded-2xl p-6 items-center">

          {/* AVATAR */}
          <View className="relative mb-4">
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
              }}
              className="w-[110px] h-[110px] rounded-xl border-4 border-yellow-500 bg-[#C0B090]"
            />

            <View className="absolute -bottom-2 -right-2 w-[30px] h-[30px] rounded-full bg-yellow-500 items-center justify-center border-2 border-white">
              <ShieldCheck size={16} color="white" strokeWidth={2.5} />
            </View>
          </View>

          {/* NAME */}
          <Text className="text-2xl font-extrabold text-red-700 mb-2">
            Marcus Holloway
          </Text>

          {/* BADGE ROW */}
          <View className="flex-row items-center mb-5">
            <View className="border border-yellow-500 rounded-full px-3 py-1">
              <Text className="text-[11px] font-bold text-yellow-500 tracking-wide">
                VERIFIED PASSENGER
              </Text>
            </View>

            <Text className="text-sm text-gray-600 ml-1">
              • Joined Oct 2021
            </Text>
          </View>

          {/* EDIT BUTTON */}
          <TouchableOpacity className="flex-row items-center justify-center gap-2 bg-[#E8DCE0] rounded-lg py-3 px-5 w-full">
            <Pencil size={16} color={Colors.crimson} strokeWidth={2} />
            <Text className="text-[15px] font-bold text-red-700">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* PERSONAL DETAILS */}
        <View className="bg-white rounded-xl mx-4 mt-4 p-5 border border-gray-200">

          <View className="flex-row items-center gap-2 mb-4">
            <User size={16} color={Colors.crimson} strokeWidth={2} />
            <Text className="text-xs font-extrabold tracking-widest text-gray-800">
              PERSONAL DETAILS
            </Text>
          </View>

          <View className="py-2">
            <Text className="text-[10px] font-bold text-gray-500 tracking-widest mb-1">
              FULL NAME
            </Text>
            <Text className="text-base text-gray-800">
              Marcus Holloway
            </Text>
          </View>

          <View className="h-px bg-gray-200 my-2" />

          <View className="py-2">
            <Text className="text-[10px] font-bold text-gray-500 tracking-widest mb-1">
              PHONE NUMBER
            </Text>
            <Text className="text-base text-gray-800">
              +1 (555) 012-3456
            </Text>
          </View>
        </View>

        {/* CONNECTIVITY */}
        <View className="bg-white rounded-xl mx-4 mt-4 p-5 border border-gray-200">

          <View className="flex-row items-center gap-2 mb-4">
            <Wifi size={16} color={Colors.crimson} strokeWidth={2} />
            <Text className="text-xs font-extrabold tracking-widest text-gray-800">
              CONNECTIVITY
            </Text>
          </View>

          <View className="py-2">
            <Text className="text-[10px] font-bold text-gray-500 tracking-widest mb-1">
              GMAIL ADDRESS
            </Text>
            <Text className="text-base text-gray-800">
              m.holloway.verified@gmail.com
            </Text>
          </View>

          <View className="h-px bg-gray-200 my-2" />

          <View className="py-2">
            <Text className="text-[10px] font-bold text-gray-500 tracking-widest mb-1">
              HOME ADDRESS
            </Text>
            <Text className="text-base text-gray-800">
              128 Oakwood Circle, Austin, TX 78701
            </Text>
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity className="items-center py-5 mt-2">
          <Text className="text-base font-semibold text-red-700">
            Logout
          </Text>
        </TouchableOpacity>

        <View className="h-2" />
      </ScrollView>
    </SafeAreaView>
  );
}