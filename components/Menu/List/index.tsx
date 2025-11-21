import { TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

interface MenuItem {
    title: string;
    icon?: string;
    onPress?: () => void;
}

interface Props {
    items: MenuItem[];
}

const List = ({ items }: Props) => {
    return (
        <View style={{ flex: 1, marginTop: 16 }}>
            {items.map((item, index) => (
                <View key={index}>
                    {index === 0 && <Divider />}
                    <TouchableOpacity>
                        <View style={{padding: 16}}>
                            <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                    {index < items.length - 1 && <Divider />}
                </View>
            ))}
        </View>
    );
};

export default List;
