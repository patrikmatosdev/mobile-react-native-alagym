import { Menu } from "@/components";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProfileScreen() {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.navigate("/(auth)/login");
  }

  const items = [
    {
      title: "Editar Perfil",
      icon: "account-edit",
      onPress: () => console.log("Editar"),
    },
    {
      title: "Minhas academias",
      icon: "bell-outline",
      onPress: () => console.log("Notificações"),
    },
    {
      title: "Sair",
      icon: "logout",
      onPress: handleLogout,
    },
  ]


  return (
    <SafeAreaView style={{flex: 1}}>
      <Menu.Header 
        name={user.name} 
        role="Personal" 
        description="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado" 
      />
      <Menu.List items={items} />
    </SafeAreaView>
  );
}

