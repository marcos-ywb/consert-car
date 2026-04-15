import React, { useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Dimensions
} from "react-native";

import { validateChangePassword, ChangePasswordErrors } from "@/utils/authValidation";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

import { Check, Info, Lock } from "lucide-react-native";

const { height } = Dimensions.get("window");

export default function ChangePasswordScreen() {
    const { user, changePassword } = useAuth();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ChangePasswordErrors>({});

    function handleChangePassword() {
        setLoading(true);
        try {
            const validationErrors = validateChangePassword(password, confirmPassword);

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setTimeout(() => setErrors({}), 2500);
                return;
            }

            if (!user) return;
            const result = changePassword(user.email, password);

            if (!result.success) {
                alert("Não foi possível alterar a senha.");
            }
        } finally {
            setLoading(false);
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
                    <View style={styles.header}>


                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerSubtitle}>Segurança</Text>
                            <Text style={styles.headerTitle}>Nova Senha</Text>
                        </View>



                    </View>

                    <View style={styles.alertWrapper}>
                        <View style={styles.alertCard}>
                            <View style={styles.alertIcon}>
                                <Info size={16} color="#92400E" />
                            </View>
                            <Text style={styles.alertText}>
                                Você está usando uma senha padrão. Para sua segurança, crie uma nova senha agora.
                            </Text>
                        </View>
                        <View style={styles.balloonArrow} />
                    </View>

                    <View style={styles.formContent}>
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Olá, {user?.name?.split(" ")[0]}!</Text>
                            <Text style={styles.instructionText}>Defina uma senha forte para continuar.</Text>
                        </View>

                        <CustomInput
                            placeholder="Crie uma nova senha"
                            label="Nova Senha"
                            isPassword={true}
                            onChangeText={setPassword}
                            error={errors.password}
                            icon={<Lock size={20} color="#6B7280" />}
                        />

                        <View style={{ height: 12 }} />

                        <CustomInput
                            placeholder="Repita a nova senha"
                            label="Confirmar Senha"
                            isPassword={true}
                            onChangeText={setConfirmPassword}
                            error={errors.confirmPassword}
                            icon={<Check size={20} color="#6B7280" />}
                        />

                        <View style={{ height: 32 }} />

                        <Button
                            title="Atualizar Senha"
                            onPress={handleChangePassword}
                            variant="secondary"
                            icon={<Check color="#FFF" size={20} />}
                            loading={loading}
                            disabled={loading || !password || !confirmPassword}
                            style={styles.mainButton}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFCC00",
    },
    flex: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        backgroundColor: "#FFCC00",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#453700',
        opacity: 0.7,
        textTransform: 'uppercase',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111827',
    },
    profileCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#FFF",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    initialsText: {
        fontSize: 16,
        fontWeight: "800",
    },
    alertWrapper: {
        paddingHorizontal: 24,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    alertCard: {
        width: "100%",
        backgroundColor: "#FFF7ED",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderWidth: 1,
        borderColor: "#FED7AA",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    balloonArrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FFF7ED',
        marginTop: -1,
        zIndex: 2,
    },
    alertIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FFEDD5",
        alignItems: "center",
        justifyContent: "center",
    },
    alertText: {
        flex: 1,
        fontSize: 13,
        color: "#7C2D12",
        lineHeight: 18,
        fontWeight: "500",
    },
    formContent: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
        minHeight: height * 0.6,
    },
    welcomeContainer: {
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "800",
        color: "#111827",
    },
    instructionText: {
        fontSize: 15,
        color: "#6B7280",
        marginTop: 4,
    },
    mainButton: {
        height: 56,
        borderRadius: 16,
    },
});