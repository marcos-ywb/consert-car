import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

interface AlertCardProps {
    icon: React.ReactNode;
    text: string;
    color: string;
}

export default function AlertCard({
    icon,
    text,
    color
}: AlertCardProps) {
    return (
        <View style={[styles.alertCard, { borderLeftColor: color }]}>
            {icon}
            <Text style={styles.alertText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        gap: 12,
        marginBottom: 10,
        borderLeftWidth: 5,
    },
    alertText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827"
    },
});