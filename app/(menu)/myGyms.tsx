import { getAllGym } from "@/api/gym";
import { GymContext } from "@/context/GymContext";
import { Branch } from "@/types";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Card, FAB, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    branches?: Branch[];
    onPressBranch: (branch: Branch) => void;
}


const MyGymsScreen = ({ onPressBranch }: Props) => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const {setSelected} = useContext(GymContext);
    const theme = useTheme();
    const router = useRouter();

    const getInitialData = async () => {
        try {
            const res = await getAllGym();
            if (res.data) {
                setBranches(res.data);
            }
        } catch (error) {
            console.log({error});
            setBranches([]);
        }
    }

    const handleEdit = (id?: string) => {
        setSelected(Number(id));
        router.navigate("/(gym)/editGym");
    }

    useEffect(() => {
        getInitialData();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={branches}
                keyExtractor={(item) => item.id?.toString() as string}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <Card mode="contained" style={styles.card}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => onPressBranch(item)}>
                            <View style={styles.row}>

                                {/* Ícone da unidade */}
                                <Avatar.Text
                                    size={50}
                                    label={item.name[0]}
                                    style={{ backgroundColor: theme.colors.primary }}
                                    labelStyle={{ color: theme.colors.onPrimary }}
                                />

                                {/* Informações */}
                                <View style={styles.infoContainer}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.subtitle}>{item.address}</Text>

                                    <Text
                                        style={[
                                            styles.status,
                                            { color: item.status === "open" ? theme.colors.primary : theme.colors.error }
                                        ]}
                                    >
                                        {item.status === "open" ? "Aberta" : "Fechada"}
                                    </Text>
                                </View>

                                {/* Editar */}
                                <IconButton
                                    icon="pencil"
                                    size={22}
                                    onPress={() => handleEdit(item?.id)}
                                    iconColor={theme.colors.primary}
                                />

                                {/* Alunos */}
                                <View style={styles.studentsContainer}>
                                    <Text style={styles.students}>{item.students || 0}</Text>
                                    <Text style={styles.studentsLabel}>alunos</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>
                )}
            />

            {/* BOTÃO FLUTUANTE PARA CRIAR NOVA ACADEMIA */}
            <FAB
                icon="plus"
                style={styles.fab}
                color={theme.colors.primary}
                onPress={() => router.push("/(gym)/createGym")}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 14,
        padding: 14,
        borderRadius: 14,
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoContainer: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 2,
    },
    status: {
        fontSize: 13,
        marginTop: 4,
        fontWeight: "600",
    },
    studentsContainer: {
        alignItems: "flex-end",
    },
    students: {
        fontSize: 20,
        fontWeight: "bold",
    },
    studentsLabel: {
        fontSize: 12,
        color: "#666",
    },

    fab: {
        position: "absolute",
        bottom: 40,
        right: 20,
    }
});

export default MyGymsScreen;
