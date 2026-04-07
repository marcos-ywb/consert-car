import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from "react-native";

import {
    ChevronRight
} from "lucide-react-native";

interface AppointmentItemProps {
    time: string;
    client: string;
    service: string;
    car: string;
    onPress: () => void
}

export default function AppointmentItem({
    time,
    client,
    service,
    car,
    onPress
}: AppointmentItemProps) {
    return (
        <TouchableOpacity
            style={styles.appointmentCard}
            onPress={onPress}
        >
            <View style={styles.timeTag}>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={styles.appointmentInfo}>
                <Text style={styles.clientName}>{client}</Text>
                <Text style={styles.carDetails}>{service} • {car}</Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    appointmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 18,
        marginBottom: 12,
        elevation: 2,
    },

    timeTag: {
        backgroundColor: '#111827',
        padding: 8,
        borderRadius: 10,
        marginRight: 15
    },

    timeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#FFF'
    },

    appointmentInfo: {
        flex: 1
    },

    clientName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1C1E'
    },

    carDetails: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 2
    },
});