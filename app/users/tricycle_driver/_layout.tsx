import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TricycleDriverLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen 
                    name="tabs" 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="chat/[id]"
                    options={{ headerShown: false }}
                />
            </Stack>
        </>
    );
}