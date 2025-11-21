import { createGym } from "@/api/gym";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    HelperText,
    Text,
    TextInput
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateGymScreen = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [openingHour, setOpeningHour] = useState("");
    const [closingHour, setClosingHour] = useState("");
    const [document, setDocument] = useState("");
    const [image, setImage] = useState("");
    const { user } = useContext(UserContext);
    const router = useRouter();

    const [errors, setErrors] = useState<{
        name?: string;
        document?: string;
        address?: string;
        phone?: string;
        openingHour?: string;
        closingHour?: string;
    }>({});

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!name.trim()) newErrors.name = "Informe o nome";
        if (!address.trim()) newErrors.address = "Informe o endereço";
        if (!phone.trim()) newErrors.phone = "Informe o telefone";
        if (!openingHour.trim()) newErrors.openingHour = "Obrigatório";
        if (!closingHour.trim()) newErrors.closingHour = "Obrigatório";
        if (!closingHour.trim()) newErrors.document = "Obrigatório";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreate = async () => {
        if (!validate()) return;

        try {
            const newGym = {
                name,
                address,
                phone,
                openingHour,
                closingHour,
                image: image || "https://picsum.photos/400/200",
                manager: user.id?.toString() as string,
                document
            };

            await createGym(newGym);

            Alert.alert("Sucesso", "Academia criada com sucesso");
            router.navigate("/(menu)/myGyms");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar uma academia.")
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text variant="headlineMedium" style={styles.title}>
                    Nova Academia
                </Text>

                {/* Nome */}
                <TextInput
                    label="Nome"
                    mode="outlined"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                {errors.name && <HelperText type="error">{errors.name}</HelperText>}

                {/* Documento */}
                <TextInput
                    label="Documento (CNPJ)"
                    mode="outlined"
                    value={document}
                    onChangeText={setDocument}
                    style={styles.input}
                />
                {errors.name && <HelperText type="error">{errors.document}</HelperText>}

                {/* Endereço */}
                <TextInput
                    label="Endereço"
                    mode="outlined"
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                />
                {errors.address && (
                    <HelperText type="error">{errors.address}</HelperText>
                )}

                {/* Telefone */}
                <TextInput
                    label="Telefone"
                    mode="outlined"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                />
                {errors.phone && <HelperText type="error">{errors.phone}</HelperText>}

                {/* Horários */}
                <View style={styles.row}>
                    <View style={styles.col}>
                        <TextInput
                            label="Abertura"
                            mode="outlined"
                            placeholder="06:00"
                            value={openingHour}
                            onChangeText={setOpeningHour}
                            style={styles.input}
                        />
                        {errors.openingHour && (
                            <HelperText type="error">{errors.openingHour}</HelperText>
                        )}
                    </View>

                    <View style={styles.spacer} />

                    <View style={styles.col}>
                        <TextInput
                            label="Fechamento"
                            mode="outlined"
                            placeholder="22:00"
                            value={closingHour}
                            onChangeText={setClosingHour}
                            style={styles.input}
                        />
                        {errors.closingHour && (
                            <HelperText type="error">{errors.closingHour}</HelperText>
                        )}
                    </View>
                </View>

                {/* Imagem */}
                <TextInput
                    label="URL da Imagem (opcional)"
                    mode="outlined"
                    value={image}
                    onChangeText={setImage}
                    style={styles.input}
                />

                <Button mode="contained" style={styles.button} onPress={handleCreate}>
                    Criar Academia
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: {
        padding: 20,
    },
    title: {
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    col: {
        flex: 1,
    },
    spacer: {
        width: 16,
    },
    button: {
        marginTop: 20,
        paddingVertical: 6,
    },
});

export default CreateGymScreen;
