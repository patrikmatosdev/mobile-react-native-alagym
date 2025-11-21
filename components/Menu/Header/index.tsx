import { formatInitialsName } from "@/utils/format";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

interface Props {
    name: string;
    role: string;
    description: string;
}

const logoSource = require("../../../assets/images/logo.png");

const Header = ({ name, role, description }: Props) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <ImageBackground source={logoSource} resizeMode="cover" style={styles.logo} />
                <View style={styles.containerInfo}>
                    <Avatar.Text
                        size={70}
                        label={formatInitialsName(name)}
                        style={{ backgroundColor: theme.colors.primary }}
                        labelStyle={{ color: theme.colors.shadow }}

                    />
                    <View>
                        <Text>{name}</Text>
                        <Text>{role}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.containerAbout}>
                <Text>{description}</Text>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {

    },
    containerLogo: {
        position: "relative",
    },
    containerInfo: {
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    logo: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },
    containerAbout: {
        paddingHorizontal: 16,
    }
});
