import React, { useState } from "react";

import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator,
    FlatList
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
    ShieldAlert,
    ChevronLeft,
    Search,
    Plus,
    AlertCircle,
    MessageCircleWarning,
    MessageCircle,
    Car,
    X,
    Phone,
    Mail,
    CheckCircle,
    XCircle
} from "lucide-react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import { useTeam } from "@/hooks/useTeam";
import { Usuario } from "@/services/teamService";

import DropdownItem from "@/components/DropdownItem";
import CustomInput from "@/components/CustomInput";
import { useRoleGuard } from "@/hooks/useRoleGuard";

import { formatRoleName, formatPhone } from "@/utils/formatters";

const ROLE_LABELS: Record<string, string> = {
    OWNER: "Proprietário",
    ADMIN: "Administrador",
    MECANICO: "Mecânico",
    ATENDENTE: "Atendente",
};

const ROLE_COLORS: Record<string, { color: string; bg: string }> = {
    OWNER: { color: "#7C3AED", bg: "#EDE9FE" },
    ADMIN: { color: "#2563EB", bg: "#DBEAFE" },
    MECANICO: { color: "#D97706", bg: "#FEF3C7" },
    ATENDENTE: { color: "#059669", bg: "#D1FAE5" },
};

const renderEmployee = ({ item, navigation, isCurrentUser }: { item: Usuario; navigation: any; isCurrentUser?: boolean }) => {
    const role = ROLE_COLORS[item.cargo] ?? ROLE_COLORS["ATENDENTE"];

    return (
        <TouchableOpacity
            style={[
                styles.clientCard,
                { borderLeftColor: role.color },
                isCurrentUser && styles.clientCardHighlight,
            ]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("EmployeeDetails", { employeeData: item })}
        >
            <View style={styles.clientInfo}>
                <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <Text style={styles.clientName}>{item.nome}</Text>

                    {isCurrentUser && (
                        <View style={styles.youBadge}>
                            <Text style={styles.youBadgeText}>Você</Text>
                        </View>
                    )}

                    <View style={[styles.roleBadge, { backgroundColor: role.bg }]}>
                        <Text style={[styles.roleText, { color: role.color }]}>
                            {ROLE_LABELS[item.cargo]}
                        </Text>
                    </View>
                </View>

                <View style={styles.clientSubInfo}>
                    <Phone size={14} color="#64748B" />
                    <Text style={styles.clientPhone}>{formatPhone(item.telefone)}</Text>
                </View>

                <View style={styles.clientSubInfo}>
                    <Mail size={14} color="#64748B" />
                    <Text style={styles.clientPhone} numberOfLines={1}>{item.email}</Text>
                </View>

                <View style={styles.clientSubInfo}>
                    {item.status
                        ? <CheckCircle size={14} color="#10B981" />
                        : <XCircle size={14} color="#EF4444" />
                    }
                    <Text style={[
                        styles.clientVehicles,
                        { color: item.status ? "#10B981" : "#EF4444" }
                    ]}>
                        {item.status ? "Ativo" : "Inativo"}
                    </Text>
                    {Boolean(item.deve_trocar_senha) && (
                        <View style={styles.pendingBadge}>
                            <Text style={styles.pendingText}>Senha pendente</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => /*sendWhatsAppMessage(item.telefone, item.nome)*/ console.log("sendWhatsAppMessage")}
                >
                    <MessageCircle size={20} color="#FFCC00" />
                </TouchableOpacity>
                <ChevronRight size={20} color="#F8F9FA" />
            </View>
        </TouchableOpacity>
    );
};

export default function TeamScreen() {
    useRoleGuard("TeamScreen");
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    const { team, loading, error, search, setSearch } = useTeam();

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <KeyboardAvoidingView
                style={styles.flex}
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

                    <View>
                        <Text style={styles.greeting}>Painel Administrativo</Text>
                        <Text style={styles.username}>{user?.name || "Administrador"}</Text>

                        <View style={styles.roleBadgeContainer}>
                            <Text style={styles.roleBadgeText}>{formatRoleName(String(user?.role))}</Text>
                        </View>
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
                    <Text style={styles.sectionTitleText}>Gerenciamento de Equipe</Text>
                </View>

                <View style={styles.fieldSearch}>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            placeholder="Buscar colaboradores..."
                            icon={<Search color="#64748B" size={20} />}
                            value={search}
                            onChangeText={setSearch}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.userBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("NewCustomer" as never)}
                    >
                        <Plus size={24} color="#0F172A" />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.emptyContainer}>
                        <ActivityIndicator size="large" color="#FFCC00" />
                        <Text style={styles.emptyText}>Carregando colaboradores...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.emptyContainer}>
                        <AlertCircle size={40} color="#EF4444" />
                        <Text style={[styles.emptyText, { color: "#EF4444" }]}>{error}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={team}
                        keyExtractor={item => String(item.usuario_id)}
                        renderItem={({ item, index }) => (
                            <>
                                {renderEmployee({ item, navigation, isCurrentUser: item.usuario_id === user?.id })}
                                {index === 0 && team.length > 1 && (
                                    <View style={styles.dividerSection}>
                                        <View style={styles.dividerLine} />
                                        <Text style={styles.dividerLabel}>Colaboradores</Text>
                                        <View style={styles.dividerLine} />
                                    </View>
                                )}
                            </>
                        )}
                        contentContainerStyle={[styles.listContent, { paddingBottom: 120 }]}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.listHeader}>
                                <Text style={styles.resultsCount}>
                                    {team.length === 0
                                        ? "Nenhum colaborador cadastrado"
                                        : `Mostrando ${team.length} colaborador${team.length > 1 ? "es" : ""}`
                                    }
                                </Text>
                            </View>
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <MessageCircleWarning size={40} color="#CBD5E1" />
                                <Text style={styles.emptyText}>Nenhum colaborador encontrado</Text>
                            </View>
                        }
                    />
                )}














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

    roleBadgeContainer: {
        backgroundColor: "#111827",
        padding: 5,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    roleBadgeText: {
        color: "#FFCC00",
        fontWeight: 800,
        letterSpacing: 4,
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

    backBtn: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
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

    fieldSearch: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 12,
        backgroundColor: '#0F172A',
    },

    inputContainer: {
        flex: 1,
    },

    userBtn: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#FFCC00',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
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

    listHeader: {
        marginTop: 5,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    resultsCount: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },

    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },

    clientCard: {
        flexDirection: 'row',
        backgroundColor: '#1E293B',
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
        borderColor: '#334155',
    },

    clientInfo: {
        flex: 1,
        marginLeft: 15
    },

    clientName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F8F9FA',
        marginBottom: 2
    },

    clientSubInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },

    clientPhone: {
        fontSize: 13,
        color: '#94A3B8',
        marginLeft: 5
    },

    clientVehicles: {
        fontSize: 13,
        color: '#64748B',
        marginLeft: 5
    },

    cardActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#334155",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    roleBadge: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
    },

    roleText: {
        fontSize: 10,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 0.3,
    },

    pendingBadge: {
        marginLeft: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor: "#FEF3C7",
    },

    pendingText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#D97706",
    },

    input: {
        backgroundColor: '#1E293B',
        color: '#F8F9FA',
    },

    clientCardHighlight: {
        borderColor: "#334155",
        //backgroundColor: "#1E3A5F",
    },
    youBadge: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: "#FFCC00",
    },

    youBadgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#111827",
        textTransform: "uppercase",
        letterSpacing: 0.3,
    },

    dividerSection: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
        paddingHorizontal: 4,
        gap: 10,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#334155",
    },

    dividerLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#475569",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
});