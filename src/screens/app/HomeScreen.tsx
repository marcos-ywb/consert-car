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
    Pressable
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
    Send
} from "lucide-react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import CustomCarousel from "@/components/MetricCard";
import QuickAction from "@/components/QuickAction";
import AppointmentItem from "@/components/AppointmentItem";
import AlertCard from "@/components/AlertCard";
import DropdownItem from "@/components/DropdownItem";

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

import { validateGeneralSearch, GeneralSearchErrors } from "@/utils/authValidation";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    const [isExpanded, setIsExpanded] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<GeneralSearchErrors>({});

    const toggleSearchInput = () => {
        setSearchVisible((prev) => {
            if (prev) setSearchQuery("");
            return !prev;
        });
    };

    function sendSearch() {
        setLoading(true);

        try {
            const validationErrors = validateGeneralSearch(searchQuery);

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);

                setTimeout(() => {
                    setErrors({});
                }, 2500);

                return;

            }

            alert(`Busca efetuada: ${searchQuery}`);

        } finally {
            setLoading(false);
        }
    };

    const appointments = [
        { id: 1, time: "08:30", client: "João Silva", service: "Troca de óleo", car: "Gol 2015" },
        { id: 2, time: "10:00", client: "Carlos Souza", service: "Revisão de Freio", car: "HB20" },
        { id: 3, time: "11:30", client: "Paulo Mendes", service: "Alinhamento", car: "Civic" },
        { id: 4, time: "14:00", client: "Marcos Lima", service: "Troca de Pneu", car: "Corolla" },
        { id: 5, time: "16:00", client: "Joaquim Santos", service: "Revisão de Freio", car: "Civic" },
        { id: 6, time: "18:00", client: "Pedro Costa", service: "Revisão de Motor", car: "Civic" },
        { id: 7, time: "20:00", client: "Fernando Oliveira", service: "Revisão de Motor", car: "Civic" },

    ];

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

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
                                onPress={() => alert("Veículo")}
                            />
                            <QuickAction
                                icon={<Search size={24} color="#111827" />}
                                label="Buscar"
                                onPress={toggleSearchInput}
                            />
                        </View>

                        {searchVisible && (
                            <View style={styles.searchField}>
                                <View style={styles.inputField}>
                                    <CustomInput
                                        placeholder="Digite sua busca..."
                                        onChangeText={setSearchQuery}
                                        icon={<Search color="#64748B" size={20} />}
                                        error={errors.search}
                                    />
                                </View>

                                <View style={styles.buttonField}>
                                    <Button
                                        title="Buscar"
                                        onPress={sendSearch}
                                        variant="secondary"
                                        icon={<Send size={20} color="#FFF" />}
                                        loading={loading}
                                        disabled={
                                            loading ||
                                            !searchQuery
                                        }
                                    />
                                </View>
                            </View>
                        )}
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
                                        opacity: pressed ? 0.5 : 1, // Aplica opacidade apenas enquanto o dedo está na tela
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

                        {appointments
                            .slice(0, isExpanded ? appointments.length : 2)
                            .map((item) => (
                                <AppointmentItem
                                    key={item.id}
                                    time={item.time}
                                    client={item.client}
                                    service={item.service}
                                    car={item.car}
                                    onPress={() => alert(`Agendamento de ${item.client}`)}
                                />
                            ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Alertas do sistema</Text>
                        <AlertCard icon={<AlertCircle size={20} color="#EF4444" />} text="2 serviços com atraso crítico" color="#EF4444" />
                        <AlertCard icon={<Package size={20} color="#F97316" />} text="Estoque baixo: Filtro de óleo" color="#F97316" />
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
    carouselWrapper: {
        marginBottom: 30
    },
    section: {
        marginBottom: 25
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 15
    },
    seeMore: {
        color: "#64748B",
        fontSize: 14,
        fontWeight: '600'
    },
    actionGrid: {
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
    }
});