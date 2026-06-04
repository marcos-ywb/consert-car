import React, { useState } from "react";
import {
    View, Text, KeyboardAvoidingView, StyleSheet, Platform,
    TouchableOpacity, Modal, TouchableWithoutFeedback,
    FlatList, ScrollView, ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import DropdownItem from "@/components/DropdownItem";
import CustomInput from "@/components/CustomInput";

import {
    User, Settings, ShieldCheck, LogOut, Search, Plus,
    Car, ChevronRight, MessageCircleWarning, Wrench, AlertCircle,
} from "lucide-react-native";

import { useOrders } from "@/hooks/useOrders";
import { ServiceOrder } from "@/services/orderService";
import { formatDatetime, formatPlate } from "@/utils/formatters";

const STATUS_LABELS = ["TODOS", "ABERTA", "EM_ANDAMENTO", "AGUARDANDO_PECA", "FINALIZADA", "CANCELADA"];

const STATUS_DISPLAY: Record<string, string> = {
    TODOS: "Todos",
    ABERTA: "Em Aberto",
    EM_ANDAMENTO: "Em Execução",
    AGUARDANDO_PECA: "Aguard. Peças",
    FINALIZADA: "Finalizada",
    CANCELADA: "Cancelada",
};

const statusConfig: Record<string, { color: string; bg: string }> = {
    ABERTA: { color: "#64748B", bg: "#F1F5F9" },
    EM_ANDAMENTO: { color: "#3B82F6", bg: "#DBEAFE" },
    AGUARDANDO_PECA: { color: "#F59E0B", bg: "#FEF3C7" },
    FINALIZADA: { color: "#10B981", bg: "#D1FAE5" },
    CANCELADA: { color: "#EF4444", bg: "#FEE2E2" },
};

const StatusFilter = ({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) => (
    <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {STATUS_LABELS.map((s) => {
                const isSelected = selected === s;
                return (
                    <TouchableOpacity
                        key={s}
                        onPress={() => onSelect(s)}
                        style={[styles.filterBtn, isSelected ? styles.filterBtnActive : styles.filterBtnInactive]}
                    >
                        <Text style={[styles.filterText, isSelected ? styles.filterTextActive : styles.filterTextInactive]}>
                            {STATUS_DISPLAY[s]}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    </View>
);

const OSCard = ({ item, navigation }: { item: ServiceOrder; navigation: any }) => {
    const current = statusConfig[item.status] ?? statusConfig["ABERTA"];

    return (
        <TouchableOpacity
            style={[styles.osCard, { borderLeftColor: current.color }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("OSDetails", { orderData: item })}
        >
            <View style={styles.osInfo}>
                <View style={styles.osHeaderRow}>
                    <Text style={styles.osNumber}>OS #{item.id}</Text>
                    <Text style={styles.osDate}>{formatDatetime(item.dataEntrada)}</Text>
                </View>

                <Text style={styles.osCustomer} numberOfLines={1}>{item.clienteNome}</Text>

                <View style={styles.infoRow}>
                    <Car size={14} color="#94A3B8" />
                    <Text style={styles.osSubText}>
                        {item.veiculoMarca} {item.veiculoModelo} • <Text style={styles.plateText}>{formatPlate(item.veiculoPlaca)}</Text>
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Wrench size={14} color="#94A3B8" />
                    <Text style={styles.osSubText} numberOfLines={1}>{item.descricaoServico}</Text>
                </View>

                <View style={styles.footerRow}>
                    <View style={[styles.statusBadge, { backgroundColor: current.bg }]}>
                        <Text style={[styles.statusText, { color: current.color }]}>
                            {STATUS_DISPLAY[item.status]}
                        </Text>
                    </View>
                    <Text style={styles.osPrice}>
                        R$ {item.valorTotal.toFixed(2).replace(".", ",")}
                    </Text>
                </View>
            </View>
            <ChevronRight size={18} color="#CBD5E1" strokeWidth={3} />
        </TouchableOpacity>
    );
};

export default function ServiceOrdersScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    const { orders, loading, error, search, setSearch, status, setStatus } = useOrders();

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Seja Bem-Vindo(a),</Text>
                        <Text style={styles.username}>{user?.name || "Operador"}</Text>
                    </View>
                    <TouchableOpacity style={styles.profileBtn} onPress={toggleMenu}>
                        <User size={24} color="#FFCC00" />
                    </TouchableOpacity>

                    <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={toggleMenu}>
                        <TouchableWithoutFeedback onPress={toggleMenu}>
                            <View style={styles.modalOverlay}>
                                <View style={styles.dropdownMenu}>
                                    <DropdownItem icon={<Settings size={18} color="#475569" />} label="Configurações" onPress={toggleMenu} />
                                    <DropdownItem icon={<ShieldCheck size={18} color="#475569" />} label="Privacidade" onPress={toggleMenu} />
                                    <View style={styles.divider} />
                                    <DropdownItem icon={<LogOut size={18} color="#EF4444" />} label="Sair" onPress={() => { toggleMenu(); signOut(); }} danger />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>

                <View style={styles.sectionTitleBar}>
                    <View style={styles.indicator} />
                    <Text style={styles.sectionTitleText}>Ordens de Serviço</Text>
                </View>

                <View style={styles.fieldSearch}>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            placeholder="Buscar por cliente, placa ou OS..."
                            icon={<Search color="#64748B" size={20} />}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.userBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("NewOS" as never)}
                    >
                        <Plus size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.filterStatusField}>
                    <StatusFilter selected={status} onSelect={setStatus} />
                </View>

                {loading ? (
                    <View style={styles.emptyContainer}>
                        <ActivityIndicator size="large" color="#FFCC00" />
                        <Text style={styles.emptyText}>Carregando ordens de serviço...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.emptyContainer}>
                        <AlertCircle size={40} color="#EF4444" />
                        <Text style={[styles.emptyText, { color: "#EF4444" }]}>{error}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <OSCard item={item} navigation={navigation} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.listHeader}>
                                <Text style={styles.resultsCount}>
                                    {orders.length === 0
                                        ? "Nenhuma ordem de serviço cadastrada"
                                        : `Mostrando ${orders.length} ${orders.length === 1 ? "ordem" : "ordens"} de serviço`
                                    }
                                </Text>
                            </View>
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <MessageCircleWarning size={40} color="#CBD5E1" />
                                <Text style={styles.emptyText}>Nenhuma ordem de serviço encontrada</Text>
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
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.05)", justifyContent: "flex-start", alignItems: "flex-end" },
    dropdownMenu: {
        marginTop: 80, marginRight: 20, backgroundColor: "#FFF",
        borderRadius: 16, padding: 8, width: 200, elevation: 10,
        shadowColor: "#000", shadowOpacity: 0.15,
    },
    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 4 },
    sectionTitleBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 15 },
    indicator: {
        width: 8, height: 8, backgroundColor: "#FFCC00", borderRadius: 4,
        marginRight: 10, shadowColor: "#FFCC00", shadowOpacity: 0.8, shadowRadius: 5, elevation: 8,
    },
    sectionTitleText: { fontSize: 18, fontWeight: "700", color: "#111827" },
    fieldSearch: { flexDirection: "row", paddingHorizontal: 20, paddingTop: 20, gap: 12 },
    inputContainer: { flex: 1 },
    userBtn: {
        width: 60, height: 60, borderRadius: 8, backgroundColor: "#111827",
        justifyContent: "center", alignItems: "center", elevation: 4,
        shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10,
    },
    filterStatusField: { marginVertical: 10 },
    filterContainer: { paddingVertical: 5 },
    scrollContent: { paddingHorizontal: 20, gap: 8 },
    filterBtn: { paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderRadius: 12 },
    filterBtnActive: { backgroundColor: "#FFCC00", borderColor: "#FFCC00" },
    filterBtnInactive: { backgroundColor: "#FFF", borderColor: "#E2E8F0" },
    filterText: { fontWeight: "700", fontSize: 13 },
    filterTextActive: { color: "#111827" },
    filterTextInactive: { color: "#64748B" },
    osCard: {
        flexDirection: "row", backgroundColor: "#FFF", borderRadius: 20, padding: 15,
        marginBottom: 12, alignItems: "center", borderLeftWidth: 6, elevation: 2,
        shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 }, borderWidth: 1, borderColor: "#F1F5F9",
    },
    osInfo: { flex: 1, marginLeft: 15 },
    osHeaderRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
    osNumber: { fontSize: 12, fontWeight: "800", color: "#94A3B8", textTransform: "uppercase" },
    osDate: { fontSize: 12, color: "#94A3B8" },
    osCustomer: { fontSize: 16, fontWeight: "700", color: "#1E293B", marginBottom: 6 },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    osSubText: { fontSize: 13, color: "#64748B", marginLeft: 6 },
    plateText: { fontWeight: "700", color: "#475569" },
    footerRow: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#F8F9FA",
    },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusText: { fontSize: 11, fontWeight: "800", textTransform: "uppercase" },
    osPrice: { fontSize: 15, fontWeight: "800", color: "#1E293B" },
    listContent: { paddingHorizontal: 20, paddingBottom: 120 },
    listHeader: { marginTop: 5, marginBottom: 15 },
    resultsCount: { fontSize: 13, color: "#94A3B8", fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
    emptyContainer: { alignItems: "center", marginTop: 50, opacity: 0.5 },
    emptyText: { marginTop: 10, fontSize: 16, color: "#64748B" },
});