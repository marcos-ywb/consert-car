import React from "react";

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle
} from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
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

    const getVariantStyle = () => {
        switch (variant) {
            case "secondary": return styles.secondary;
            case "danger": return styles.danger;
            default: return styles.primary;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case "secondary": return styles.secondaryText;
            case "danger": return styles.dangerText;
            default: return styles.primaryText;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.base,
                getVariantStyle(),
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
                    color={variant === "primary" ? "#000" : "#FFF"}
                />
            ) : (
                <View style={[
                    styles.content,
                    { flexDirection: iconPosition === "left" ? "row-reverse" : "row" }
                ]}>
                    <Text style={[styles.text, getTextStyle()]}>
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
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
    },

    primary: {
        backgroundColor: "#FFCC00",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    secondary: {
        backgroundColor: "#111827",
        borderWidth: 1.5,
        borderColor: "#374151",
    },

    danger: {
        backgroundColor: "#EF4444",
    },

    disabled: {
        opacity: 0.5,
    },

    text: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3
    },

    primaryText: {
        color: "#000",
    },

    secondaryText: {
        color: "#FFF",
    },

    dangerText: {
        color: "#FFF",
    },

    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    icon: {
        justifyContent: "center",
        alignItems: "center",
    },
});