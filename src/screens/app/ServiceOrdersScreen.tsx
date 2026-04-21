import React, { useState } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import DropdownItem from "@/components/DropdownItem";
import CustomInput from "@/components/CustomInput";

import {
    User,
    Settings,
    ShieldCheck,
    LogOut,
    Search,
    Plus,
    FileText,
    Car,
    Clock,
    ChevronRight,
    MessageCircleWarning,
    Wrench
} from "lucide-react-native";

const SERVICE_ORDERS = [
    {
        id: "101",
        customer: "Marcos Mello",
        vehicle: "Honda Civic",
        plate: "REE-2823",
        service: "Troca de Óleo e Filtros",
        value: "450,00",
        status: "Em Aberto",
        date: "21 Abr 2026"
    },
    {
        id: "102",
        customer: "Bruno Santos",
        vehicle: "Toyota Corolla",
        plate: "ABC-1234",
        service: "Revisão de Freios",
        value: "890,00",
        status: "Em Execução",
        date: "20 Abr 2026"
    },
    {
        id: "103",
        customer: "Ana Clara",
        vehicle: "Fiat Toro",
        plate: "XYZ-5555",
        service: "Alinhamento e Balanceamento",
        value: "180,00",
        status: "Finalizada",
        date: "19 Abr 2026"
    },
    {
        id: "104",
        customer: "Diego Ferreira",
        vehicle: "Jeep Compass",
        plate: "KLT-8888",
        service: "Reparo no Ar Condicionado",
        value: "1.200,00",
        status: "Aguardando Peças",
        date: "18 Abr 2026"
    }
];

const renderOS = ({ item, navigation }: any) => {
    const statusStyles: any = {
        "Em Aberto": { color: "#64748B", bg: "#F1F5F9" },
        "Em Execução": { color: "#3B82F6", bg: "#DBEAFE" },
        "Finalizada": { color: "#10B981", bg: "#D1FAE5" },
        "Aguardando Peças": { color: "#F59E0B", bg: "#FEF3C7" },
    };

    const currentStatus = statusStyles[item.status] || statusStyles["Em Aberto"];

    return (
        <TouchableOpacity
            style={[styles.osCard, { borderLeftColor: currentStatus.color }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("OSDetails", { osId: item.id })}
        >
            <View style={styles.osInfo}>
                <View style={styles.osHeaderRow}>
                    <Text style={styles.osNumber}>OS #{item.id}</Text>
                    <Text style={styles.osDate}>{item.date}</Text>
                </View>

                <Text style={styles.osCustomer} numberOfLines={1}>{item.customer}</Text>

                <View style={styles.infoRow}>
                    <Car size={14} color="#94A3B8" />
                    <Text style={styles.osSubText}>{item.vehicle} • {item.plate}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Wrench size={14} color="#94A3B8" />
                    <Text style={styles.osSubText} numberOfLines={1}>{item.service}</Text>
                </View>

                <View style={styles.footerRow}>
                    <View style={[styles.statusBadge, { backgroundColor: currentStatus.bg }]}>
                        <Text style={[styles.statusText, { color: currentStatus.color }]}>{item.status}</Text>
                    </View>
                    <Text style={styles.osPrice}>R$ {item.value}</Text>
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
    const [searchItem, setSearchItem] = useState("");

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const filteredOS = SERVICE_ORDERS.filter((os) =>
        os.customer.toLowerCase().includes(searchItem.toLowerCase()) ||
        os.plate.toLowerCase().includes(searchItem.toLowerCase()) ||
        os.id.includes(searchItem)
    );

    const countOs = filteredOS.length;

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
                            value={searchItem}
                            onChangeText={setSearchItem}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("NewOS" as never)}
                    >
                        <Plus size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredOS}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderOS({ item, navigation })}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.listHeader}>
                            <Text style={styles.resultsCount}>
                                {countOs === 0
                                    ? "Nenhuma ordem de serviço cadastrada"
                                    : `Mostrando ${countOs} ${countOs === 1 ? "ordem de serviço" : "ordens de serviço"}`
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFCC00"
    },
    flex: {
        flex: 1,
        backgroundColor: "#F8F9FA"
    },
    header: {
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFCC00',
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
    },
    greeting: {
        fontSize: 13,
        color: "#453700",
        fontWeight: '600',
        opacity: 0.8
    },
    username: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1A1C1E"
    },
    profileBtn: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#111827',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    dropdownMenu: {
        marginTop: 80,
        marginRight: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 8,
        width: 200,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 4
    },
    sectionTitleBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    indicator: {
        width: 4,
        height: 20,
        backgroundColor: '#FFCC00',
        borderRadius: 2,
        marginRight: 10
    },
    sectionTitleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827'
    },
    fieldSearch: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 10,
        gap: 12,
    },
    inputContainer: {
        flex: 1
    },
    actionBtn: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#111827',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    osCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        marginBottom: 12,
        alignItems: 'center',
        borderLeftWidth: 6,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    osInfo: {
        flex: 1,
        marginLeft: 10
    },
    osHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    osNumber: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        textTransform: 'uppercase'
    },
    osDate: {
        fontSize: 12,
        color: '#94A3B8'
    },
    osCustomer: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 6
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    osSubText: {
        fontSize: 13,
        color: '#64748B',
        marginLeft: 8
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F8F9FA'
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase'
    },
    osPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1E293B'
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 120
    },
    listHeader: {
        marginVertical: 15
    },
    resultsCount: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
        opacity: 0.5
    },
    emptyText: {
        marginTop: 10,
        fontSize: 16,
        color: '#64748B'
    },
});