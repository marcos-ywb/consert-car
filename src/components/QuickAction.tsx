import React from "react";
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native";

interface QuickActionProps {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
}

export default function QuickAction({
    icon,
    label,
    onPress
}: QuickActionProps) {
    return (
        <TouchableOpacity
            style={styles.actionTile}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View>{icon}</View>
            <Text style={styles.actionLabel} numberOfLines={1}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actionTile: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        backgroundColor: '#FFCC00',
        gap: 8,
        borderRadius: 8,
        aspectRatio: 1,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    actionLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#334155'
    }
});