import { editGym, getGymDetails } from "@/api/gym";
import { GymContext } from "@/context/GymContext";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
    ActivityIndicator,
    Button,
    HelperText,
    Text,
    TextInput
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const EditGymScreen = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [openingHour, setOpeningHour] = useState("");
    const [closingHour, setClosingHour] = useState("");
    const [document, setDocument] = useState("");
    const [image, setImage] = useState("");
    const { user } = useContext(UserContext);
    const { selected } = useContext(GymContext);
    const [loading, setLoading] = useState(true);
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

    const handleEdit = async () => {
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

            await editGym(selected?.toString() as string, newGym);

            Alert.alert("Sucesso", "Academia criada com sucesso");
            router.navigate("/(menu)/myGyms");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar uma academia.")
        }
    };

    const getGym = async () => {
        try {
            const response = await getGymDetails(selected);
            if (response.data) {
                setName(response.data.name);
                setAddress(response.data.address);
                setDocument(response.data.document);
                setPhone(response.data.phone);
                setOpeningHour(response.data.openingHour);
                setClosingHour(response.data.closingHour);
                setImage(response.data.image);
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível acessar esta academia no momento.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (selected) {
            getGym()
        }
    }, [selected])

    return (
        <SafeAreaView style={styles.safeArea}>
            {loading ? (
                <View style={styles.containerLoading}>
                    <ActivityIndicator animating={true} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text variant="headlineMedium" style={styles.title}>
                        Editar academia
                    </Text>

                    <TextInput
                        label="Nome"
                        mode="outlined"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    {errors.name && <HelperText type="error">{errors.name}</HelperText>}

                    <TextInput
                        label="Documento (CNPJ)"
                        mode="outlined"
                        value={document}
                        onChangeText={setDocument}
                        style={styles.input}
                    />
                    {errors.name && <HelperText type="error">{errors.document}</HelperText>}

            
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

                  
                    <TextInput
                        label="Telefone"
                        mode="outlined"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                    />
                    {errors.phone && <HelperText type="error">{errors.phone}</HelperText>}

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

                    <TextInput
                        label="URL da Imagem (opcional)"
                        mode="outlined"
                        value={image}
                        onChangeText={setImage}
                        style={styles.input}
                    />

                    <Button mode="contained" style={styles.button} onPress={handleEdit}>
                        Editar
                    </Button>
                </ScrollView>
            )}
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
    containerLoading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default EditGymScreen;
