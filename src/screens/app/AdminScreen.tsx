import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    Platform,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
    User,
    Settings,
    ShieldCheck,
    LogOut,
    ChevronRight,
    BarChart3,
    Users,
    Wallet,
    ShieldAlert
} from "lucide-react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import MetricCard from "@/components/MetricCard";
import DropdownItem from "@/components/DropdownItem";

export default function AdminScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Painel Administrativo</Text>
                        <Text style={styles.username}>{user?.name || "Diretor"}</Text>
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
                                        onPress={toggleMenu}
                                    />
                                    <DropdownItem
                                        icon={<ShieldCheck size={18} color="#475569" />}
                                        label="Segurança"
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
                    <Text style={styles.sectionTitleText}>Visão Geral do Negócio</Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.carouselWrapper}>
                        <MetricCard />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Gestão de Fluxo</Text>

                        <TouchableOpacity style={styles.adminCard}>
                            <View style={styles.iconBox}>
                                <BarChart3 color="#FFCC00" size={24} />
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Relatórios Mensais</Text>
                                <Text style={styles.cardSub}>Veja o faturamento e metas</Text>
                            </View>
                            <ChevronRight color="#475569" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.adminCard}>
                            <View style={styles.iconBox}>
                                <Users color="#FFCC00" size={24} />
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Gerenciar Equipe</Text>
                                <Text style={styles.cardSub}>Mecânicos e Operadores</Text>
                            </View>
                            <ChevronRight color="#475569" size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Financeiro e Segurança</Text>

                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.miniCard, { flex: 1 }]}>
                                <Wallet color="#FFCC00" size={20} />
                                <Text style={styles.miniCardTitle}>Caixa</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.miniCard, { flex: 1 }]}>
                                <ShieldAlert color="#FFCC00" size={20} />
                                <Text style={styles.miniCardTitle}>Logs</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
        backgroundColor: "#0F172A"
    },
    header: {
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFCC00',
        borderBottomRightRadius: 28,
        borderBottomLeftRadius: 28,
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
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    dropdownMenu: {
        marginTop: 80,
        marginRight: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 8,
        width: 200,
        elevation: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 4,
    },
    sectionTitleBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
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
        fontWeight: '800',
        color: '#F8F9FA',
    },
    container: {
        padding: 20,
        paddingBottom: 120
    },
    carouselWrapper: {
        marginBottom: 25,
    },
    section: {
        marginBottom: 25
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: "800",
        color: "#FFCC00",
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    adminCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#334155'
    },
    iconBox: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255, 204, 0, 0.1)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContent: {
        flex: 1,
        marginLeft: 15
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F8F9FA'
    },
    cardSub: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2
    },
    row: {
        flexDirection: 'row',
        gap: 12
    },
    miniCard: {
        backgroundColor: '#1E293B',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
        gap: 8
    },
    miniCardTitle: {
        color: '#F8F9FA',
        fontWeight: '700',
        fontSize: 14
    }
});