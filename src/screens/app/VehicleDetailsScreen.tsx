import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
    ChevronLeft,
    Car,
    Phone,
    User,
    ChevronRight,
    File,
    SquarePen,
    Trash2,
    Plus,
    CarFront,
    MapPinned,
    Map
} from "lucide-react-native";

import Button from "@/components/Button";

export default function VehicleDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                        <Text style={styles.headerSubtitle}>Área do Cliente</Text>
                        <Text style={styles.headerTitle}>Detalhes do Veículo</Text>
                    </View>

                    <View style={{ width: 45 }} />
                </View>



                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >









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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#FFCC00',
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

    scrollView: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 16
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
});