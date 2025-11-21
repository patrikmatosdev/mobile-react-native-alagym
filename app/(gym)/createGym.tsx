import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Appbar,
    Button,
    HelperText,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreateBranchScreenProps {
  navigation: {
    goBack: () => void;
  };
}

const CreateBranchScreen = ({ navigation }: CreateBranchScreenProps) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [manager, setManager] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    address?: string;
    phone?: string;
    openingHour?: string;
    closingHour?: string;
    manager?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Informe o nome";
    if (!address.trim()) newErrors.address = "Informe o endereço";
    if (!phone.trim()) newErrors.phone = "Informe o telefone";
    if (!openingHour.trim()) newErrors.openingHour = "Obrigatório";
    if (!closingHour.trim()) newErrors.closingHour = "Obrigatório";
    if (!manager.trim()) newErrors.manager = "Informe o responsável";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newBranch = {
      id: Date.now().toString(),
      name,
      address,
      phone,
      openingHour,
      closingHour,
      manager,
      status: "open" as const,
      students: 0,
      image: "https://picsum.photos/400/200",
    };

    console.log("Criado:", newBranch);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Criar Academia" />
      </Appbar.Header>

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
        {errors.phone && (
          <HelperText type="error">{errors.phone}</HelperText>
        )}

        {/* Horários */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
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

          <View style={{ width: 16 }} />

          <View style={{ flex: 1 }}>
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

        {/* Responsável */}
        <TextInput
          label="Responsável"
          mode="outlined"
          value={manager}
          onChangeText={setManager}
          style={styles.input}
        />
        {errors.manager && (
          <HelperText type="error">{errors.manager}</HelperText>
        )}

        <Button mode="contained" style={styles.button} onPress={handleCreate}>
          Criar Academia
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
});

export default CreateBranchScreen;
