import { UserContext } from '@/context/UserContext';
import { formatCPF } from "@/utils/format";
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginCPFScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { login, isLoading, isLogged } = useContext(UserContext);

    const [document, setDocument] = useState('');

    const handleInputChange = (text: string) => {
        const formated = formatCPF(text);
        setDocument(formated);
    }

    const handleLogin = async () => {
        const rawDocument = document.replace(/\D/g, '');

        if (rawDocument.length !== 11) {
            Alert.alert("Erro", "O CPF deve conter 11 dígitos.");
            return
        }

        login(rawDocument);
    };

    const handleRegister = () => {
        router.navigate("/(auth)/register")
    }

    useEffect(() => {
        if (isLogged) {
            router.navigate("/(tabs)")
        }
    }, [isLogged])

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.colors.primary }]}>
                    Acesso Alagym
                </Text>

                <Text style={styles.subtitle}>
                    Entre com seu CPF para acessar sua conta.
                </Text>

                <TextInput
                    label="CPF"
                    value={document}
                    onChangeText={handleInputChange}
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={14}
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                    placeholder="000.000.000-00"
                />

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={isLoading}
                    disabled={isLoading}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                >
                    {isLoading ? 'Acessando...' : 'Entrar'}
                </Button>

                {/* Link para Cadastro */}
                <Button
                    mode="text"
                    onPress={handleRegister}
                    style={styles.registerButton}
                >
                    Não tem conta? Clique aqui para se cadastrar
                </Button>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: 'white', // Fundo dos campos e área de login
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
        color: '#666',
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 10,
    },
    registerButton: {
        marginTop: 15,
    }
});