import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { validateLogin, LoginErrors } from "@/utils/authValidation";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TouchableOpacity,
    Dimensions
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import {
    ChevronLeft,
    ArrowRight,
    Mail,
    Lock,
    Info
} from "lucide-react-native";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
    const navigation = useNavigation();
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<LoginErrors>({});

    async function handleLogin() {
        setLoading(true);
        try {
            const validationErrors = validateLogin(email, password);

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setTimeout(() => setErrors({}), 2500);
                setLoading(false);
                return;
            }

            const result = await signIn(email, password);
            if (!result.success) {
                alert("Credenciais inválidas!");
            }
        } catch (error) {
            alert("Ocorreu um erro ao tentar entrar!");
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
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <ChevronLeft size={28} color="#111827" />
                        </TouchableOpacity>

                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerSubtitle}>Autenticação</Text>
                            <Text style={styles.headerTitle}>Acesse sua conta</Text>
                        </View>

                        <View style={{ width: 45 }} />
                    </View>

                    <View style={styles.alertWrapper}>
                        <View style={styles.alertCard}>
                            <View style={styles.alertIcon}>
                                <Info size={16} color="#92400E" />
                            </View>
                            <Text style={styles.alertText}>
                                Preencha seus dados de acesso abaixo para prosseguir com a autenticação!
                            </Text>
                        </View>
                        <View style={styles.balloonArrow} />
                    </View>

                    <View style={styles.formContent}>
                        <View style={styles.formIntro}>
                            <Text style={styles.greetingText}>Bem-vindo!</Text>
                            <Text style={styles.instructionText}>Identifique-se para continuar.</Text>
                        </View>

                        <CustomInput
                            placeholder="Digite seu email"
                            label="Email"
                            onChangeText={setEmail}
                            error={errors.email}
                            icon={<Mail size={20} color="#6B7280" />}
                            autoCapitalize="none"
                        />

                        <View style={{ height: 8 }} />

                        <CustomInput
                            label="Senha"
                            placeholder="••••••••"
                            isPassword={true}
                            onChangeText={setPassword}
                            error={errors.password}
                            icon={<Lock size={20} color="#6B7280" />}
                        />

                        <View style={styles.forgetPassword}>
                            <Pressable
                                onPress={() => navigation.navigate("ForgetPassword" as never)}
                                hitSlop={10}
                            >
                                <Text style={styles.forgetPasswordText}>Esqueci minha senha!</Text>
                            </Pressable>
                        </View>

                        <Button
                            title="Entrar agora"
                            onPress={handleLogin}
                            variant="secondary"
                            icon={<ArrowRight color="#FFF" size={20} />}
                            loading={loading}
                            disabled={loading || !email || !password}
                            style={styles.loginButton}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Ainda não tem acesso?</Text>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}> Contate o administrador</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        backgroundColor: "#FFCC00",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#FFCC00',
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
    backBtn: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
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
    formIntro: {
        marginBottom: 24,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: "800",
        color: "#111827",
    },
    instructionText: {
        fontSize: 15,
        color: "#6B7280",
        marginTop: 4,
    },
    forgetPassword: {
        alignItems: "flex-end",
        marginVertical: 16,
    },
    forgetPasswordText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },
    loginButton: {
        height: 54,
        borderRadius: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: 30,
    },
    footerText: {
        color: '#9CA3AF',
        fontSize: 14,
    },
    footerLink: {
        color: '#111827',
        fontSize: 14,
        fontWeight: '700',
    }
});