import { View } from "react-native";
import { Divider, List as PaperList } from "react-native-paper";

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
        <View style={{ flex: 1 }}>
            {items.map((item, index) => (
                <View key={index}>
                    <PaperList.Item
                        title={item.title}
                        left={props => item.icon ? <PaperList.Icon {...props} icon={item.icon} /> : null}
                        onPress={item.onPress}
                    />
                    {index < items.length - 1 && <Divider />}
                </View>
            ))}
        </View>
    );
};

export default List;
