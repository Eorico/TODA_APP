import { Stack } from "expo-router";

export default function PassengerLayout() {
    return (
        <Stack
            screenOptions={{ headerShown:false }}
        >
            <Stack.Screen 
                name="tabs" 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="chat/[id]"
                options={{
                    headerShown: false,
                    headerTintColor: "#7B1A1A",
                    headerStyle: { backgroundColor: "#F5EFE8" }
                }}
            />
        </Stack>
    );
}