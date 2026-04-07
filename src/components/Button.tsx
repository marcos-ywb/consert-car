import React from "react";

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle
} from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

export default function Button({
    title,
    onPress,
    variant = "primary",
    loading = false,
    disabled = false,
    style,
    icon,
    iconPosition = "right"
}: ButtonProps) {

    const isPrimary = variant === "primary";

    return (
        <TouchableOpacity
            style={[
                styles.base,
                isPrimary ? styles.primary : styles.secondary,
                disabled && styles.disabled,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.85}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={isPrimary ? "#000" : "#FFF"}
                />
            ) : (
                <View style={[
                    styles.content,
                    { flexDirection: iconPosition === "left" ? "row-reverse" : "row" }
                ]}>
                    <Text
                        style={[
                            styles.text,
                            isPrimary ? styles.primaryText : styles.secondaryText
                        ]}
                    >
                        {title}
                    </Text>

                    {icon && <View style={styles.icon}>{icon}</View>}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        height: 52,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center"
    },

    primary: {
        backgroundColor: "#FFF",
        shadowColor: "#FFCC00",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },

    secondary: {
        backgroundColor: "#111827",
        borderWidth: 1.5,
        borderColor: "#374151",
    },

    disabled: {
        opacity: 0.8,
    },

    text: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.3
    },

    primaryText: {
        color: "#000",
    },

    secondaryText: {
        color: "#FFF",
    },

    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    icon: {
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
});             