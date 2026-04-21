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
    ScrollView,
    Linking,
    Alert
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
    Phone,
    ChevronRight,
    Info,
    Car,
    MessageCircle,
    Plus,
    Search,
    MessageCircleWarning
} from "lucide-react-native";

const STATUS = ["Todos", "Pendente", "Em Andamento", "Concluído", "Cancelado"];

const APPOINTMENTS: any[] = [
    { id: "1", clientName: "Marcos Mello", phone: "(62) 99700-0563", vehicle: "Honda Civic", plate: "REE-2823", dateTime: "2026-04-14T15:30:27.777Z", status: "Pendente" },
    { id: "2", clientName: "João Silva", phone: "(38) 9 8888-8888", vehicle: "Toyota Corolla", plate: "ABC-1234", dateTime: "2026-04-14:15-30", status: "Em Andamento" },
    { id: "3", clientName: "Ana Clara", phone: "(38) 9 7777-7777", vehicle: "Fiat Toro", plate: "XYZ-5555", dateTime: "2026-04-14:15-30", status: "Concluído" },
    { id: "4", clientName: "Pedro Souza", phone: "(38) 9 6666-6666", vehicle: "Jeep Compass", plate: "KLT-8888", dateTime: "2026-04-14:15-30", status: "Cancelado" },
];

const sendWhatsAppMessage = async (phone: string, clientName: string) => {
    const cleanNumber = phone.replace(/\D/g, "");
    const fullNumber = cleanNumber.startsWith("55") ? cleanNumber : `55${cleanNumber}`;
    const message = encodeURIComponent(`Olá ${clientName}, tudo bem? Aqui é da Consert-Car e gostaríamos de falar sobre seu agendamento conosco!`);

    const urlProtocol = `whatsapp://send?phone=${fullNumber}&text=${message}`;
    const urlWeb = `https://wa.me/${fullNumber}?text=${message}`;

    try {
        const supported = await Linking.canOpenURL(urlProtocol);
        if (supported) {
            await Linking.openURL(urlProtocol);
        } else {
            await Linking.openURL(urlWeb);
        }
    } catch (error) {
        console.error("Erro ao abrir WhatsApp", error);
    }
};

const StatusFilter = ({ selected, onSelect }: { selected: string, onSelect: (s: string) => void }) => {
    return (
        <View style={styles.filterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {STATUS.map((status) => {
                    const isSelected = selected === status;
                    return (
                        <TouchableOpacity
                            key={status}
                            onPress={() => onSelect(status)}
                            style={[
                                styles.button,
                                isSelected ? styles.buttonActive : styles.buttonInactive
                            ]}
                        >
                            <Text style={[
                                styles.text,
                                isSelected ? styles.textActive : styles.textInactive
                            ]}>
                                {status}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const renderAppointment = ({ item, navigation }: any) => {
    const statusConfig: any = {
        Pendente: { color: "#F59E0B", bg: "#FEF3C7" },
        Concluído: { color: "#10B981", bg: "#D1FAE5" },
        Cancelado: { color: "#EF4444", bg: "#FEE2E2" },
        "Em Andamento": { color: "#3B82F6", bg: "#DBEAFE" },
    };

    const currentStatus = statusConfig[item.status] || statusConfig["Em Andamento"];

    return (
        <TouchableOpacity
            style={[
                styles.appointmentCard,
                { borderLeftColor: currentStatus.color }
            ]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("AppointmentDetails", { appointmentData: item })}
        >
            <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentClientName} numberOfLines={1}>{item.clientName}</Text>
                <View style={styles.infoRow}>
                    <Phone size={13} color="#94A3B8" />
                    <Text style={styles.appointmentSubText}>{item.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Car size={13} color="#94A3B8" />
                    <Text style={styles.appointmentSubText}>{item.vehicle} • <Text style={styles.plateText}>{item.plate}</Text></Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: currentStatus.bg }]}>
                    <Info size={12} color={currentStatus.color} />
                    <Text style={[styles.statusText, { color: currentStatus.color }]}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={styles.whatsappButton}
                    onPress={() => sendWhatsAppMessage(item.phone, item.clientName)}
                >
                    <MessageCircle size={18} color="#F59E0B" fill="rgba(245, 158, 11, 0.1)" />
                </TouchableOpacity>
                <ChevronRight size={18} color="#CBD5E1" strokeWidth={3} />
            </View>
        </TouchableOpacity>
    );
};

export default function AppointmentsScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Todos");

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const filteredAppointments = APPOINTMENTS.filter((item) => {
        const matchesSearch =
            item.clientName.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.vehicle.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.plate.toLowerCase().includes(searchItem.toLowerCase());

        const matchesStatus = selectedStatus === "Todos" || item.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    const countAppointments = filteredAppointments.length;

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
                    <Text style={styles.sectionTitleText}>Agendamentos</Text>
                </View>

                <View style={styles.fieldSearch}>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            placeholder="Buscar agendamento..."
                            icon={<Search color="#64748B" size={20} />}
                            value={searchItem}
                            onChangeText={setSearchItem}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.userBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("NewAppointment" as never)}
                    >
                        <Plus size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.filterStatusField}>
                    <StatusFilter
                        selected={selectedStatus}
                        onSelect={setSelectedStatus}
                    />
                </View>

                <FlatList
                    data={filteredAppointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderAppointment({ item, navigation })}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.listHeader}>
                            <Text style={styles.resultsCount}>
                                {countAppointments === 0
                                    ? "Nenhum agendamento cadastrado"
                                    : `Mostrando ${countAppointments} agendamento${countAppointments > 1 ? 's' : ''}`

                                }
                            </Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MessageCircleWarning size={40} color="#CBD5E1" />
                            <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
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
        width: 8,
        height: 8,
        backgroundColor: '#FFCC00',
        borderRadius: 4,
        marginRight: 10,
        shadowColor: "#FFCC00",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 8
    },
    sectionTitleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827'
    },
    fieldSearch: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 12,
    },
    inputContainer: {
        flex: 1
    },
    userBtn: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#111827',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    filterStatusField: {
        marginVertical: 10
    },





    filterContainer: {
        paddingVertical: 5
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 8
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 12
    },
    buttonActive: {
        backgroundColor: '#FFCC00',
        borderColor: "#FFCC00"
    },
    buttonInactive: {
        backgroundColor: '#FFF',
        borderColor: '#E2E8F0'
    },
    text: {
        fontWeight: '700',
        fontSize: 13
    },
    textActive: {
        color: '#111827'
    },
    textInactive: {
        color: '#64748B'
    },






    appointmentCard: {
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
    appointmentInfo: {
        flex: 1,
        marginLeft: 15
    },
    appointmentClientName: {
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
    appointmentSubText: {
        fontSize: 13,
        color: '#64748B',
        marginLeft: 6
    },
    plateText: {
        fontWeight: '700',
        color: '#475569'
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    whatsappButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FFFBEB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#FEF3C7'
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 12
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
        marginLeft: 4,
        textTransform: 'uppercase'
    },







    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 120
    },
    listHeader: {
        marginTop: 5,
        marginBottom: 15
    },
    resultsCount: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5
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