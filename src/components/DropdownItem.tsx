import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

interface DropdownItemProps {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
    danger?: boolean;
}

export default function DropdownItem({
    icon,
    label,
    onPress,
    danger = false
}: DropdownItemProps) {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            {icon}
            <Text style={[styles.menuText, danger && { color: '#EF4444' }]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
        borderRadius: 10,
    },

    menuText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
    },
});