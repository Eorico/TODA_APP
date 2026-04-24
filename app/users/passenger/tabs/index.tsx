import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { Bell, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { CONVERSATIONS, Conversation } from '@/constants/data';
import { ConversationItem } from '@/components/conversation_item';

export default function ChatListScreen() {
  const router = useRouter();

  const handleConversationPress = (item: Conversation) => {
    // router.push(``);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">

      <View className="flex-1 bg-gray-100">

        {/* HEADER */}
        <View className="flex-row items-center px-5 pt-4 pb-3">

          <Image
            source={{
              uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
            }}
            className="w-[52px] h-[52px] rounded-xl bg-gray-800 mr-3"
          />

          <Text className="flex-1 text-xl font-bold text-gray-900">
            Mikel Santiago
          </Text>

          <Bell size={24} color={Colors.grayMed} strokeWidth={1.5} />
        </View>

        {/* SEARCH */}
        <View className="flex-row items-center bg-[#EDEAE6] rounded-xl mx-5 my-3 px-3 py-3">

          <Search
            size={18}
            color={Colors.grayMed}
            strokeWidth={2}
            style={{ marginRight: 8 }}
          />

          <TextInput
            className="flex-1 text-[15px] text-gray-900"
            placeholder="Search conversations"
            placeholderTextColor={Colors.grayMed}
          />
        </View>

        {/* LIST */}
        <FlatList
          data={CONVERSATIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationItem
              item={item}
              onPress={() => handleConversationPress(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8 }}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-gray-200 ml-[98px]" />
          )}
        />

      </View>
    </SafeAreaView>
  );
}