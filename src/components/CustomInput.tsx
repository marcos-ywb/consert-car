import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity
} from "react-native";

import { COLORS } from "@/styles/theme";
import { Eye, EyeOff } from "lucide-react-native";

interface CustomInputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    isPassword?: boolean;
}

export default function CustomInput({
    label,
    placeholder,
    error,
    icon,
    isPassword = false,
    style,
    ...rest
}: CustomInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputWrapper}>
                {icon && (
                    <View style={styles.iconLeft}>
                        {icon}
                    </View>
                )}

                <TextInput
                    style={[
                        styles.input,
                        error ? styles.inputError : null,
                        icon ? { paddingLeft: 54 } : null,
                        isPassword ? { paddingRight: 54 } : null,
                        style
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={error ? "red" : "#DDD8D7"}
                    secureTextEntry={isPassword && !showPassword}
                    autoCapitalize="none"
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeButton}
                        activeOpacity={0.7}
                        onPress={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ?
                            <EyeOff size={22} color="#111827" /> :
                            <Eye size={22} color="#111827" />
                        }
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.errorContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 2,
    },
    label: {
        fontSize: 16,
        color: "#000",
        marginBottom: 11,
        fontWeight: '500'
    },
    inputWrapper: {
        justifyContent: "center",
        width: '100%',
    },
    input: {
        height: 60,
        backgroundColor: "#FAF5F4",
        fontSize: 16,
        borderRadius: 8,
        paddingHorizontal: 24,
        color: "#1A1C1E",
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1
    },
    iconLeft: {
        position: "absolute",
        left: 18,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
        color: "#111827"
    },
    eyeButton: {
        position: "absolute",
        right: 18,
        zIndex: 10,
        padding: 4,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
    errorContainer: {
        minHeight: 20,
    },
});