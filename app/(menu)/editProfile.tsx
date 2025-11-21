import React, { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
    Button,
    SegmentedButtons,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// 🚀 Importe 'useRouter' para navegação
import { updateUser } from '@/api/users';
import { UserContext } from '@/context/UserContext';
import { formatCPF, formatInputCPF } from '@/utils/format';


export default function EditProfileScreen() {
    const theme = useTheme();
    const {user, refresh} = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [document, setDocument] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [userType, setUserType] = useState('CLIENT');
    const [loading, setLoading] = useState(false);

    const handeInputChange = (text: string) => {
        const formatted = formatInputCPF(text);
        setDocument(formatted)
    };


    const handleEdit = async () => {
        try {
            if (!name || !email || !document) {
                Alert.alert("Erro", "Nome, Email e Documento são obrigatórios.");
                return;
            }

            setLoading(true);
            const userData = {
                name,
                email,
                phone,
                address,
                document: document.replace(/\D/g, ''),
                type: userType,
                city,
                country,
            };

            const response = await updateUser(user?.id, userData);

            if (response.data) {
                Alert.alert("Sucesso", "Usuário editado com sucesso.")
                refresh(document.replace(/\D/g, ''));
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a conta");
            console.log(error)
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (user?.id) {
            setName(user?.name);
            setAddress(user?.address);
            setCity(user?.city);
            setDocument(formatCPF(user?.document));
            setCountry(user?.country);
            setEmail(user?.email);
            setPhone(user?.phone);
            setUserType(user?.type?.toUpperCase());
        }
    }, [user])

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={[styles.title, { color: theme.colors.primary }]}>
                    Editar Conta
                </Text>

                <View style={styles.typeSelector}>
                    <Text style={[styles.label, { color: theme.colors.onBackground }]}>Tipo de Usuário:</Text>
                    <SegmentedButtons
                        value={userType}
                        onValueChange={setUserType}
                        buttons={[
                            {
                                value: 'CLIENT',
                                label: 'Cliente',
                                icon: 'dumbbell',
                            },
                            {
                                value: 'MANAGER',
                                label: 'Administrador',
                                icon: 'account-tie',
                            },
                        ]}
                        style={styles.segmentedButtons}
                    />
                </View>


                <TextInput
                    label="Nome Completo *"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                />

                <TextInput
                    label="Email *"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    left={<TextInput.Icon icon="email" />}
                />


                <TextInput
                    label="Documento (CPF) *"
                    value={document}
                    onChangeText={handeInputChange}
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={14}
                    style={styles.input}
                    left={<TextInput.Icon icon="card-account-details" />}
                />


                <TextInput
                    label="Telefone (com DDD)"
                    value={phone}
                    onChangeText={setPhone}
                    mode="outlined"
                    keyboardType="phone-pad"
                    style={styles.input}
                    left={<TextInput.Icon icon="phone" />}
                />


                <TextInput
                    label="Endereço Completo"
                    value={address}
                    onChangeText={setAddress}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="map-marker" />}
                />


                <TextInput
                    label="Cidade"
                    value={city}
                    onChangeText={setCity}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="city" />}
                />


                <TextInput
                    label="País"
                    value={country}
                    onChangeText={setCountry}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="earth" />}
                />


                <Button
                    mode="contained"
                    onPress={handleEdit}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                >
                    {loading ? 'Editando...' : 'Editar'}
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
    },
    typeSelector: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '600',
    },
    button: {
        marginTop: 20,
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    loginButton: {
        marginTop: 10,
    },
    segmentedButtons: {}
});