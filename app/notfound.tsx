import { useRouter } from "expo-router";
import { Text, View, Pressable } from "react-native";

// once na hinde nageexist ung page ito ang call back nya
export default function NotFound() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Screen does not found!</Text>
      <Pressable onPress={() => router.push('/auth/login')}>
        <Text>GO BACK</Text>
      </Pressable>
    </View>
  );
}
