import AlagymTheme from "@/constants/theme";
import { UserContext, UserProvider } from "@/context/UserContext";
import { Redirect, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from "react";
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

const isLoggedIn = false;

export default function RootLayout() {
    const { isLogged} = useContext(UserContext);
    return (
        <UserProvider>
            <PaperProvider theme={AlagymTheme}>
                {isLogged ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />}
                <Slot />
                <StatusBar style="auto" />
            </PaperProvider>
        </UserProvider>
    );
}
