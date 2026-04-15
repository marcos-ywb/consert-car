import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle
} from "react-native";

import { ChevronDown } from "lucide-react-native";

interface CustomSelectProps {
    label?: string;
    placeholder: string;
    value?: string;
    error?: string;
    icon?: React.ReactNode;
    onPress: () => void;
    style?: ViewStyle;
}

export default function CustomSelect({
    label,
    placeholder,
    value,
    error,
    icon,
    onPress,
    style
}: CustomSelectProps) {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={styles.inputWrapper}
                activeOpacity={0.7}
                onPress={onPress}
            >
                {icon && (
                    <View style={styles.iconLeft}>
                        {icon}
                    </View>
                )}

                <View
                    style={[
                        styles.selectField,
                        error ? styles.inputError : null,
                        icon ? { paddingLeft: 54 } : { paddingHorizontal: 24 },
                    ]}
                >
                    <Text
                        style={[
                            styles.valueText,
                            !value ? styles.placeholderText : null,
                        ]}
                        numberOfLines={1}
                    >
                        {value ? value : placeholder}
                    </Text>
                </View>

                <View style={styles.iconRight}>
                    <ChevronDown size={22} color={error ? "red" : "#111827"} />
                </View>
            </TouchableOpacity>

            <View>
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
    selectField: {
        height: 60,
        backgroundColor: "#FAF5F4",
        borderRadius: 8,
        justifyContent: "center",
        paddingRight: 54, // Espaço para o ChevronDown
    },
    valueText: {
        fontSize: 16,
        color: "#1A1C1E",
    },
    placeholderText: {
        color: "#DDD8D7",
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
    },
    iconRight: {
        position: "absolute",
        right: 18,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
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