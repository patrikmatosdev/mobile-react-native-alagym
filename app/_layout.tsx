import { PaperProvider } from 'react-native-paper';
import { Slot, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

const isLoggedIn = false;

export default function RootLayout() {
    return (
        <PaperProvider>
            {isLoggedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />}
            <Slot />
            <StatusBar style="auto" />
        </PaperProvider>
    );
}
