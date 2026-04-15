import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Dimensions, Linking } from "react-native";
import { LogIn } from "lucide-react-native";
import Button from "@/components/Button";

const { height } = Dimensions.get("window");

const openLink = (url: string) => {
    Linking.openURL(url);
};

export default function MainScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header} />

            <View style={styles.fieldImage}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>
                <View style={styles.fieldTexts}>
                    <Text style={styles.title}>Bem-vindo(a)!</Text>
                    <Text style={styles.subtitle}>
                        Clique abaixo para acessar sua conta e começar a utilizar a plataforma.
                    </Text>
                </View>

                <View style={styles.fieldButtons}>
                    <View style={styles.button}>
                        <Button
                            title="Entrar no sistema"
                            variant="secondary"
                            onPress={() => {
                                navigation.navigate("Login" as never);
                            }}
                            icon={<LogIn color="#FFF" size={20} />}
                            style={styles.mainButton}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>
                        Idealização e Intermediação por{" "}
                        <Text
                            style={styles.linkText}
                            onPress={() => openLink("https://github.com/jEFF-AS")}
                        >
                            Jeferson Santos
                        </Text>
                    </Text>

                    <Text style={styles.versionText}>
                        Design e Código por{" "}
                        <Text
                            style={styles.linkText}
                            onPress={() => openLink("https://github.com/marcos-ywb")}
                        >
                            Marcos Mello
                        </Text>
                    </Text>

                    <Text style={[styles.versionText, { marginTop: 10 }]}>
                        © 2026 • Todos os direitos reservados
                    </Text>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
    },

    header: {
        backgroundColor: "#FFCC00",
        height: height * 0.1,
        borderBottomEndRadius: 50,
        borderBottomLeftRadius: 50,
    },

    fieldImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },

    image: {
        width: "80%",
        height: 200,
    },

    content: {
        backgroundColor: "#FFCC00",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 35,
        paddingTop: 50,
        paddingBottom: 40,
        gap: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 20,
    },

    fieldTexts: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    title: {
        fontSize: 34,
        fontWeight: "900",
        color: "#111827",
    },

    subtitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#453700",
        lineHeight: 26,
        opacity: 0.8,
    },

    fieldButtons: {
        width: "100%",
    },

    button: {
        width: "100%",
    },

    mainButton: {
        height: 58,
        borderRadius: 18,
    },

    footer: {
        alignItems: "center",
        marginTop: 20,
        paddingBottom: 10,
    },

    boldText: {
        fontWeight: "800",
        color: "#111827",
    },

    versionText: {
        fontSize: 12,
        color: "#453700",
        opacity: 0.4,
        fontWeight: "600",
    },

    linkText: {
        fontWeight: "bold",
        color: "#1A1A1A",
        textDecorationLine: "underline",
    },
});