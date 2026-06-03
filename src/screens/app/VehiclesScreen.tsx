import React, { useState } from "react";
import {
    View, Text, KeyboardAvoidingView, Platform, StyleSheet,
    TouchableOpacity, Modal, TouchableWithoutFeedback,
    FlatList, ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    User, Plus, Search, AlertCircle, Settings, ShieldCheck,
    LogOut, CreditCard, ChevronRight, MessageCircleWarning,
} from "lucide-react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import DropdownItem from "@/components/DropdownItem";
import CustomInput from "@/components/CustomInput";

import { useVehicles } from "@/hooks/useVehicles";
import { Vehicle } from "@/services/vehicleService";
import { formatPlate } from "@/utils/formatters";

const renderVehicle = ({ item, navigation }: { item: Vehicle; navigation: any }) => (
    <TouchableOpacity
        style={[styles.clientCard, { borderLeftColor: "#FFCC00" }]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("VehicleDetails", { vehicleData: item })}
    >
        <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{item.brand} {item.model}</Text>
            <View style={styles.clientSubInfo}>
                <CreditCard size={14} color="#64748B" />
                <Text style={[styles.clientPhone, { fontWeight: "700", color: "#334155" }]}>
                    {formatPlate(item.plate)}
                </Text>
            </View>
            <View style={styles.clientSubInfo}>
                <User size={14} color="#64748B" />
                <Text style={styles.clientVehicles}>
                    {item.ownerName || "Proprietário não informado"}
                </Text>
            </View>
        </View>
        <View style={styles.cardActions}>
            <ChevronRight size={20} color="#CBD5E1" />
        </View>
    </TouchableOpacity>
);

export default function VehiclesScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    const { vehicles, loading, error, search, setSearch } = useVehicles();

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Seja Bem-Vindo(a),</Text>
                        <Text style={styles.username}>{user?.name || "Operador"}</Text>
                    </View>
                    <TouchableOpacity style={styles.profileBtn} onPress={toggleMenu}>
                        <User size={24} color="#FFCC00" />
                    </TouchableOpacity>

                    <Modal
                        visible={menuVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={toggleMenu}
                    >
                        <TouchableWithoutFeedback onPress={toggleMenu}>
                            <View style={styles.modalOverlay}>
                                <View style={styles.dropdownMenu}>
                                    <DropdownItem
                                        icon={<Settings size={18} color="#475569" />}
                                        label="Configurações"
                                        onPress={() => { toggleMenu(); }}
                                    />
                                    <DropdownItem
                                        icon={<ShieldCheck size={18} color="#475569" />}
                                        label="Privacidade"
                                        onPress={toggleMenu}
                                    />
                                    <View style={styles.divider} />
                                    <DropdownItem
                                        icon={<LogOut size={18} color="#EF4444" />}
                                        label="Sair"
                                        onPress={() => { toggleMenu(); signOut(); }}
                                        danger
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>

                <View style={styles.sectionTitleBar}>
                    <View style={styles.indicator} />
                    <Text style={styles.sectionTitleText}>Veículos</Text>
                </View>

                <View style={styles.fieldSearch}>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            placeholder="Buscar veículo..."
                            icon={<Search color="#64748B" size={20} />}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.userBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("NewCustomer" as never)}
                    >
                        <Plus size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.emptyContainer}>
                        <ActivityIndicator size="large" color="#FFCC00" />
                        <Text style={styles.emptyText}>Carregando veículos...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.emptyContainer}>
                        <AlertCircle size={40} color="#EF4444" />
                        <Text style={[styles.emptyText, { color: "#EF4444" }]}>{error}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={vehicles}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderVehicle({ item, navigation })}
                        contentContainerStyle={[styles.listContent, { paddingBottom: 120 }]}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.listHeader}>
                                <Text style={styles.resultsCount}>
                                    {vehicles.length === 0
                                        ? "Nenhum veículo cadastrado"
                                        : `Mostrando ${vehicles.length} veículo${vehicles.length > 1 ? "s" : ""}`
                                    }
                                </Text>
                            </View>
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <MessageCircleWarning size={40} color="#CBD5E1" />
                                <Text style={styles.emptyText}>Nenhum veículo encontrado</Text>
                            </View>
                        }
                    />
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFCC00" },
    flex: { flex: 1, backgroundColor: "#F8F9FA" },
    header: {
        zIndex: 10, flexDirection: "row", justifyContent: "space-between",
        alignItems: "center", paddingHorizontal: 20, paddingVertical: 20,
        backgroundColor: "#FFCC00", borderBottomRightRadius: 24, borderBottomLeftRadius: 24,
    },
    greeting: { fontSize: 13, color: "#453700", fontWeight: "600", opacity: 0.8 },
    username: { fontSize: 24, fontWeight: "800", color: "#1A1C1E" },
    profileBtn: {
        width: 48, height: 48, borderRadius: 8, backgroundColor: "#111827",
        justifyContent: "center", alignItems: "center", elevation: 4,
    },
    modalOverlay: {
        flex: 1, backgroundColor: "rgba(0,0,0,0.05)",
        justifyContent: "flex-start", alignItems: "flex-end",
    },
    dropdownMenu: {
        marginTop: 80, marginRight: 20, backgroundColor: "#FFF",
        borderRadius: 16, padding: 8, width: 200, elevation: 10,
        shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 4 },
    sectionTitleBar: {
        flexDirection: "row", alignItems: "center",
        paddingHorizontal: 20, paddingVertical: 15, backgroundColor: "#F8F9FA",
    },
    indicator: {
        width: 8, height: 8, backgroundColor: "#FFCC00", borderRadius: 4,
        marginRight: 10, shadowColor: "#FFCC00", shadowOpacity: 0.8,
        shadowRadius: 5, elevation: 8,
    },
    sectionTitleText: { fontSize: 18, fontWeight: "700", color: "#111827" },
    fieldSearch: {
        flexDirection: "row", alignItems: "flex-start",
        paddingHorizontal: 20, paddingTop: 20, gap: 12, backgroundColor: "#F8F9FA",
    },
    inputContainer: { flex: 1 },
    userBtn: {
        width: 60, height: 60, borderRadius: 8, backgroundColor: "#111827",
        justifyContent: "center", alignItems: "center", elevation: 4,
        shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10,
    },
    clientCard: {
        flexDirection: "row", backgroundColor: "#FFF", borderRadius: 20,
        padding: 15, marginBottom: 12, alignItems: "center", borderLeftWidth: 6,
        elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 }, borderWidth: 1, borderColor: "#F1F5F9",
    },
    clientInfo: { flex: 1, marginLeft: 15 },
    clientName: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 2 },
    clientSubInfo: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    clientPhone: { fontSize: 13, color: "#64748B", marginLeft: 5 },
    clientVehicles: { fontSize: 13, color: "#64748B", marginLeft: 5 },
    cardActions: { flexDirection: "row", alignItems: "center" },
    listContent: { paddingHorizontal: 20, paddingBottom: 40 },
    listHeader: {
        marginTop: 5, marginBottom: 15,
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    },
    resultsCount: {
        fontSize: 13, color: "#94A3B8", fontWeight: "600",
        textTransform: "uppercase", letterSpacing: 0.5,
    },
    emptyContainer: { alignItems: "center", marginTop: 50, opacity: 0.5 },
    emptyText: { marginTop: 10, fontSize: 16, color: "#64748B" },
});