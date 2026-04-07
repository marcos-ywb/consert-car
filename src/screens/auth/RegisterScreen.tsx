import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";

import { validateRegister, RegisterErrors } from "@/utils/authValidation";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/styles/theme";

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

import {
    ArrowLeft,
    ArrowRight
} from "lucide-react-native";

export default function RegisterScreen() {
    const { signUp } = useAuth();
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<RegisterErrors>({});

    function handleRegister() {
        const validationErrors = validateRegister(name, email, phone, password);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            setTimeout(() => {
                setErrors({});
            }, 2500);

            return;
        }

        const success = signUp(name, email, phone, password);

        if (!success) {
            setErrors({
                email: "Email ou senha inválidos",
                password: "Email ou senha inválidos",
            })
        }
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.textContent}>


                        <Pressable onPress={() => navigation.goBack()}>
                            <View style={styles.navContent}>
                                <ArrowLeft size={24} />
                                <Text style={styles.nav}>Tela principal</Text>
                            </View>
                        </Pressable>

                        <View style={styles.titles}>
                            <Text style={styles.title}>Cadastro</Text>
                            <Text style={styles.subtitle}>
                                Preencha os dados abaixo para prosseguir!
                            </Text>
                        </View>

                    </View>

                    <View style={styles.formContent}>
                        <CustomInput
                            placeholder="Digite seu nome"
                            label="Nome"
                            onChangeText={setName}
                            error={errors.name}
                        />

                        <CustomInput
                            placeholder="Digite seu email"
                            label="Email"
                            onChangeText={setEmail}
                            error={errors.email}
                        />

                        <CustomInput
                            placeholder="Digite seu telefone"
                            label="Telefone"
                            onChangeText={setPhone}
                            error={errors.phone}
                        />

                        <CustomInput
                            placeholder="Digite sua senha"
                            label="Senha"
                            isPassword={true}
                            onChangeText={setPassword}
                            error={errors.password}
                        />

                        <Button
                            title="Cadastrar-se!"
                            variant="secondary"
                            onPress={handleRegister}
                            icon={<ArrowRight color="#FFF" />}
                        />

                        {/* 
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>
                                Já possui um cadastro?
                            </Text>

                            <Pressable
                                onPress={() => navigation.navigate("Login" as never)}
                                style={({ pressed }) => [
                                    { opacity: pressed ? 0.6 : 1 }
                                ]}
                            >
                                <Text style={styles.loginLink}>
                                    Logar-se!
                                </Text>
                            </Pressable>
                        </View>
                        */}

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFCC00"
    },

    flex: {
        flex: 1,
    },

    container: {
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "#FFCC00",
    },

    textContent: {
        padding: 24,
        gap: 24
    },

    navContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    nav: {
        marginTop: 0,
        fontSize: 16,
        fontWeight: 500,
        marginLeft: 6
    },

    titles: {
        gap: 16
    },

    title: {
        fontSize: 32,
        fontWeight: 700
    },

    subtitle: {
        fontSize: 24
    },

    formContent: {
        backgroundColor: "#FFF",
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50,
        padding: 24,
        paddingTop: 50,
    },

    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        gap: 6,
    },

    loginText: {
        fontSize: 14,
        color: "#6B7280",
    },

    loginLink: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFCC00",
    },
});