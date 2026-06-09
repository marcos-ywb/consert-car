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
    LayoutAnimation,
    UIManager,
    Pressable,
    ActivityIndicator
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    User,
    CalendarPlus,
    UserPlus,
    Car,
    Search,
    AlertCircle,
    Package,
    Settings,
    ShieldCheck,
    LogOut,
    ChevronDown,
    ChevronUp,
    Send,
    Calendar,
    X
} from "lucide-react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import { searchService, SearchResults } from "@/services/searchService";


import QuickAction from "@/components/QuickAction";
import AppointmentItem from "@/components/AppointmentItem";
import AlertCard from "@/components/AlertCard";
import DropdownItem from "@/components/DropdownItem";

import CustomInput from "@/components/CustomInput";

import { useAppointments } from "@/hooks/useAppointments";

import { formatDatetime, formatPhone, formatPlate, formatAppointmentStatus } from "@/utils/formatters";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation<any>();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);


    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [searchResults, setSearchResults] = useState<SearchResults>({
        clientes: [], veiculos: [], agendamentos: []
    });

    const [searchLoading, setSearchLoading] = useState(false);

    const [searchHint, setSearchHint] = useState("");



    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearchInput = () => {
        setSearchVisible((prev) => {
            if (prev) {
                setSearchQuery("");
                setSearchResults({
                    clientes: [],
                    veiculos: [],
                    agendamentos: []
                });
            }
            return !prev;
        });
    };

    const handleSearch = async (text: string) => {
        setSearchQuery(text);

        if (text.trim().length === 0) {
            setSearchHint("");
            setSearchResults({ clientes: [], veiculos: [], agendamentos: [] });
            return;
        }

        if (text.trim().length < 2) {
            setSearchHint("Digite ao menos 2 caracteres para buscar!");
            setSearchResults({ clientes: [], veiculos: [], agendamentos: [] });
            return;
        }

        setSearchHint("");

        try {
            setSearchLoading(true);
            const results = await searchService.search(text.trim());
            setSearchResults(results);
        } catch {
            setSearchHint("Erro ao realizar a busca. Tente novamente.");
        } finally {
            setSearchLoading(false);
        }
    };

    const totalResults =
        searchResults.clientes.length +
        searchResults.veiculos.length +
        searchResults.agendamentos.length;

    const toggleExpand = () => {
        if (appointments.length > 2) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsExpanded(!isExpanded);
        }
    };

    const { appointments, loading } = useAppointments();

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
                                        onPress={() => { toggleMenu(); signOut() }}
                                        danger
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>

                <View style={styles.sectionTitleBar}>
                    <View style={styles.indicator} />
                    <Text style={styles.sectionTitleText}>Home</Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ações rápidas</Text>
                        <View style={styles.actionGrid}>
                            <QuickAction
                                icon={<CalendarPlus size={24} color="#111827" />}
                                label="Agenda"
                                onPress={() => navigation.navigate("NewAppointment" as never)}
                            />

                            <QuickAction
                                icon={<UserPlus size={24} color="#111827" />}
                                label="Cliente"
                                onPress={() => navigation.navigate("NewCustomer" as never)}
                            />
                            <QuickAction
                                icon={<Car size={24} color="#111827" />}
                                label="Veículo"
                                onPress={() => navigation.navigate("NewCustomer" as never)}
                            />

                            <QuickAction
                                icon={<Search size={24} color="#111827" />}
                                label="Buscar"
                                onPress={toggleSearchInput}
                            />

                            <Modal
                                visible={searchVisible}
                                transparent
                                animationType="slide"
                                onRequestClose={toggleSearchInput}
                            >
                                <View style={styles.searchModal}>
                                    {/* Header do modal */}
                                    <View style={styles.searchModalHeader}>
                                        <View style={{ flex: 1 }}>
                                            <CustomInput
                                                placeholder="Buscar clientes, veículos, agendamentos..."
                                                value={searchQuery}
                                                onChangeText={handleSearch}
                                                autoCorrect={false}
                                                icon={searchLoading
                                                    ? <ActivityIndicator size="small" color="#FFCC00" />
                                                    : <Search size={20} color="#64748B" />
                                                }
                                            />
                                        </View>
                                        <TouchableOpacity onPress={toggleSearchInput} style={styles.searchCloseBtn}>
                                            <X size={20} color="#64748B" />
                                        </TouchableOpacity>
                                    </View>

                                    {searchHint !== "" && (
                                        <View style={styles.searchHint}>
                                            <Text style={styles.searchHintText}>{searchHint}</Text>
                                        </View>
                                    )}

                                    <ScrollView
                                        style={styles.searchResults}
                                        keyboardShouldPersistTaps="handled"
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {/* Estado inicial */}
                                        {searchQuery.length === 0 && (
                                            <View style={styles.searchEmptyState}>
                                                <Search size={40} color="#E2E8F0" />
                                                <Text style={styles.searchEmptyTitle}>Busca Global</Text>
                                                <Text style={styles.searchEmptySubtitle}>
                                                    Digite o nome de um cliente, placa ou modelo de veículo
                                                </Text>
                                            </View>
                                        )}

                                        {/* Sem resultados */}
                                        {searchQuery.length >= 2 && !searchLoading && totalResults === 0 && (
                                            <View style={styles.searchEmptyState}>
                                                <AlertCircle size={40} color="#E2E8F0" />
                                                <Text style={styles.searchEmptyTitle}>Sem resultados</Text>
                                                <Text style={styles.searchEmptySubtitle}>
                                                    Nenhum resultado encontrado para "{searchQuery}"
                                                </Text>
                                            </View>
                                        )}

                                        {/* Clientes */}
                                        {searchResults.clientes.length > 0 && (
                                            <View style={styles.searchGroup}>
                                                <View style={styles.searchGroupHeader}>
                                                    <User size={14} color="#94A3B8" />
                                                    <Text style={styles.searchGroupLabel}>Clientes</Text>
                                                </View>
                                                {searchResults.clientes.map(c => (
                                                    <TouchableOpacity
                                                        key={c.cliente_id}
                                                        style={styles.searchResultItem}
                                                        onPress={() => {
                                                            toggleSearchInput();
                                                            navigation.navigate("CustomerDetails", {
                                                                customerData: { id: String(c.cliente_id), name: c.nome, phone: c.telefone }
                                                            });
                                                        }}
                                                    >
                                                        <View style={styles.searchResultIcon}>
                                                            <User size={16} color="#FFCC00" />
                                                        </View>
                                                        <View style={styles.searchResultText}>
                                                            <Text style={styles.searchResultTitle}>{c.nome}</Text>
                                                            <Text style={styles.searchResultSub}>{formatPhone(c.telefone)}</Text>
                                                        </View>
                                                        <Search size={14} color="#CBD5E1" />
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}

                                        {/* Veículos */}
                                        {searchResults.veiculos.length > 0 && (
                                            <View style={styles.searchGroup}>
                                                <View style={styles.searchGroupHeader}>
                                                    <Car size={14} color="#94A3B8" />
                                                    <Text style={styles.searchGroupLabel}>Veículos</Text>
                                                </View>
                                                {searchResults.veiculos.map(v => (
                                                    <TouchableOpacity
                                                        key={v.veiculo_id}
                                                        style={styles.searchResultItem}
                                                        onPress={() => {
                                                            toggleSearchInput();
                                                            navigation.navigate("VehicleDetails", {
                                                                vehicleData: { vehicleId: String(v.veiculo_id) }
                                                            });
                                                        }}
                                                    >
                                                        <View style={styles.searchResultIcon}>
                                                            <Car size={16} color="#FFCC00" />
                                                        </View>
                                                        <View style={styles.searchResultText}>
                                                            <Text style={styles.searchResultTitle}>
                                                                {v.marca} {v.modelo} • {formatPlate(v.placa)}
                                                            </Text>
                                                            <Text style={styles.searchResultSub}>{v.proprietario}</Text>
                                                        </View>
                                                        <Search size={14} color="#CBD5E1" />
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}

                                        {/* Agendamentos */}
                                        {searchResults.agendamentos.length > 0 && (
                                            <View style={styles.searchGroup}>
                                                <View style={styles.searchGroupHeader}>
                                                    <Calendar size={14} color="#94A3B8" />
                                                    <Text style={styles.searchGroupLabel}>Agendamentos</Text>
                                                </View>
                                                {searchResults.agendamentos.map(a => (
                                                    <TouchableOpacity
                                                        key={a.agendamento_id}
                                                        style={styles.searchResultItem}
                                                        onPress={() => {
                                                            toggleSearchInput();
                                                            navigation.navigate("AppointmentDetails", {
                                                                appointmentData: { id: String(a.agendamento_id) }
                                                            });
                                                        }}
                                                    >
                                                        <View style={styles.searchResultIcon}>
                                                            <Calendar size={16} color="#FFCC00" />
                                                        </View>
                                                        <View style={styles.searchResultText}>
                                                            <Text style={styles.searchResultTitle}>{a.cliente_nome}</Text>
                                                            <Text style={styles.searchResultSub}>
                                                                {a.veiculo_marca} {a.veiculo_modelo} • {formatAppointmentStatus(a.status)}
                                                            </Text>
                                                        </View>
                                                        <Search size={14} color="#CBD5E1" />
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}

                                        <View style={{ height: 40 }} />
                                    </ScrollView>
                                </View>
                            </Modal>

                        </View>


                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Agenda de hoje</Text>
                            <Pressable
                                onPress={toggleExpand}
                                style={({ pressed }) => [
                                    {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        opacity: pressed ? 0.5 : 1,
                                    }
                                ]}
                            >
                                <Text style={styles.seeMore}>
                                    {isExpanded ? "Ver menos " : "Ver todos "}
                                </Text>
                                {isExpanded ? (
                                    <ChevronUp size={16} color="#475569" />
                                ) : (
                                    <ChevronDown size={16} color="#475569" />
                                )}
                            </Pressable>
                        </View>

                        {appointments.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Nenhum agendamento para hoje cadastrado!</Text>
                            </View>
                        ) : (
                            <View style={styles.listContainer}>
                                {appointments
                                    .slice(0, isExpanded ? appointments.length : 2)
                                    .map((item) => (
                                        <AppointmentItem
                                            key={item.clientId} //mudar para agendamentoId
                                            time={
                                                formatDatetime(
                                                    item.scheduledAt,
                                                    true
                                                )
                                            }
                                            client={item.clientName}
                                            service={String(item.description)}
                                            car={`${item.vehicleBrand} ${item.vehicleModel} (${item.vehiclePlate})`}
                                            onPress={() => navigation.navigate("AppointmentDetails", { appointmentData: item })}
                                        />
                                    ))
                                }
                            </View>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Alertas do sistema</Text>
                        <AlertCard icon={<AlertCircle size={20} color="#EF4444" />} text="2 serviços com atraso crítico" color="#EF4444" />
                        <AlertCard icon={<Package size={20} color="#F97316" />} text="Estoque baixo: Filtro de óleo" color="#F97316" />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
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
    container: {
        padding: 20,
        paddingBottom: 70
    },
    section: {
        width: "100%",
        alignItems: "stretch",
        marginBottom: 25
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    seeMore: {
        color: "#64748B",
        fontSize: 14,
        fontWeight: '600'
    },
    actionGrid: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
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
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
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
        paddingVertical: 15,
        backgroundColor: '#F8F9FA',
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
        color: '#111827',
    },

    searchField: {
        marginTop: 16,
        width: '100%',
    },

    inputField: {
        width: '100%',
    },

    buttonField: {
        paddingTop: 8,
        width: '100%',
    },

    listContainer: {
        width: "100%",
        alignItems: "stretch",
        gap: 12,
    },
    emptyContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },

    emptyText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#64748B",
        textAlign: "center",
    },

    searchModal: {
        flex: 1,
        backgroundColor: "#FFF",
        marginTop: 60,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 20,
    },

    searchModalHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        gap: 12,
    },

    searchCloseBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },

    searchResults: {
        flex: 1,
        paddingHorizontal: 20,
    },

    searchEmptyState: {
        alignItems: "center",
        paddingTop: 60,
        gap: 12,
    },

    searchEmptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },

    searchEmptySubtitle: {
        fontSize: 14,
        color: "#94A3B8",
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 20,
    },

    searchGroup: {
        marginTop: 24,
    },

    searchGroupHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
    },

    searchGroupLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: 1,
    },

    searchResultItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F8F9FA",
        gap: 12,
    },

    searchResultIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#FFFBEB",
        justifyContent: "center",
        alignItems: "center",
    },

    searchResultText: {
        flex: 1,
    },

    searchResultTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },

    searchResultSub: {
        fontSize: 12,
        color: "#94A3B8",
        marginTop: 2,
    },

    searchHint: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        marginTop: 12,
    },

    searchHintText: {
        fontStyle: "italic",
        fontSize: 15,
        color: "#94A3B8",
        fontWeight: "500",
    },
});