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
            onPress={onPress}
        >
            <View style={styles.iconContainer}>{icon}</View>
            <Text style={styles.actionLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actionTile: {
        width: '23%',
        alignItems: 'center',
        gap: 8
    },

    iconContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#FFCC00',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    actionLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155'
    },
});