import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
    View,
    ScrollView,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Dimensions,
    Pressable
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

import {
    ChevronLeft,
    ArrowRight,
    Mail,
    Info
} from "lucide-react-native";

import { validateForgetPassword, ForgetPasswordErrors } from "@/utils/authValidation";

const { height } = Dimensions.get("window");

export default function ForgetPasswordScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ForgetPasswordErrors>({});

    function handleForgetPassword() {
        setLoading(true);
        try {
            const validationErrors = validateForgetPassword(email);

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setTimeout(() => setErrors({}), 2500);
                return;
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
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <ChevronLeft size={28} color="#111827" />
                        </TouchableOpacity>

                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerSubtitle}>Segurança</Text>
                            <Text style={styles.headerTitle}>Recuperar Senha</Text>
                        </View>

                        <View style={{ width: 45 }} />
                    </View>

                    <View style={styles.alertWrapper}>
                        <View style={styles.alertCard}>
                            <View style={styles.alertIcon}>
                                <Info size={16} color="#92400E" />
                            </View>
                            <Text style={styles.alertText}>
                                Digite seu e-mail abaixo para receber as instruções de redefinição.
                            </Text>
                        </View>
                        <View style={styles.balloonArrow} />
                    </View>

                    <View style={styles.formContent}>
                        <View style={styles.formIntro}>
                            <Text style={styles.greetingText}>Esqueceu a senha?</Text>
                            <Text style={styles.instructionText}>
                                Não se preocupe, acontece com os melhores!
                            </Text>
                        </View>

                        <CustomInput
                            label="E-mail de Recuperação"
                            placeholder="Digite seu e-mail"
                            error={errors.email}
                            onChangeText={setEmail}
                            icon={<Mail size={20} color="#6B7280" />}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <View style={{ height: 24 }} />

                        <Button
                            title="Enviar código"
                            onPress={handleForgetPassword}
                            variant="secondary"
                            icon={<ArrowRight color="#FFF" size={20} />}
                            loading={loading}
                            disabled={loading || !email}
                            style={styles.actionButton}
                        />

                        <TouchableOpacity
                            style={styles.footerLinkContainer}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.footerText}>Lembrei a senha! </Text>
                            <Text style={styles.footerLink}>Voltar para o login</Text>
                        </TouchableOpacity>
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
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    backBtn: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 30,
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
        lineHeight: 22,
    },
    actionButton: {
        height: 54,
        borderRadius: 16,
    },
    footerLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
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