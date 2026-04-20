import React, { useState } from "react";

import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    FlatList
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    User,
    CalendarPlus,
    UserPlus,
    Plus,
    Car,
    Search,
    AlertCircle,
    Package,
    Settings,
    ShieldCheck,
    LogOut,
    CreditCard,
    ChevronRight,
    MessageCircleWarning
} from "lucide-react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import DropdownItem from "@/components/DropdownItem";
import CustomInput from "@/components/CustomInput";


import { COLORS } from "@/styles/theme";

const renderVehicle = ({ item, navigation }: any) => (
    <TouchableOpacity
        style={[
            styles.clientCard,
            { borderLeftColor: "#FFCC00" }
        ]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("VehicleDetails", { vehicleData: item })}
    >
        {/* 
        <View style={[styles.avatar, { backgroundColor: `${COLORS.primary.DEFAULT}10` }]}>
            <Car size={24} color={COLORS.primary.DEFAULT} />
        </View>
        */}

        <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{item.brand} {item.name}</Text>

            <View style={styles.clientSubInfo}>
                <CreditCard size={14} color="#64748B" />
                <Text style={[styles.clientPhone, { fontWeight: '700', color: '#334155' }]}>
                    {item.plate.toUpperCase()}
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
            {item.inService && (
                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                </View>
            )}
            <ChevronRight size={20} color="#CBD5E1" />
        </View>
    </TouchableOpacity>
);

const VEHICLES: any[] = [
    { id: "1", name: "Celta", brand: "GM", vehicleType: "Carro", plate: "ABC-1234", ownerName: "João Silva" },
    { id: "2", name: "Civic", brand: "Honda", vehicleType: "Carro", plate: "DEF-5678", ownerName: "Maria Souza" },
    { id: "3", name: "Mustang", brand: "Ford", vehicleType: "Carro", plate: "GHI-9012", ownerName: "Pedro Santos" },
    { id: "4", name: "Fiesta", brand: "Ford", vehicleType: "Carro", plate: "JKL-3456", ownerName: "Ana Oliveira" },
    { id: "5", name: "Corsa", brand: "GM", vehicleType: "Carro", plate: "MNO-7890", ownerName: "Lucas Souza" },
    { id: "6", name: "Cruze", brand: "GM", vehicleType: "Carro", plate: "PQR-0123", ownerName: "Maria Souza" },
    { id: "7", name: "Civic", brand: "Honda", vehicleType: "Carro", plate: "STU-4567", ownerName: "Pedro Santos" },
    { id: "8", name: "Civic", brand: "Honda", vehicleType: "Carro", plate: "VWX-8901", ownerName: "Ana Oliveira" },
    { id: "9", name: "Civic", brand: "Honda", vehicleType: "Carro", plate: "YZA-2345", ownerName: "Lucas Souza" },
    { id: "10", name: "Civic", brand: "Honda", vehicleType: "Carro", plate: "BCD-6789", ownerName: "Maria Souza" },
];

export default function VehicleScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    const [searchItem, setSearchItem] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState(VEHICLES);

    const handleSearch = (text: string) => {
        setSearchItem(text);

        if (text === "") {
            setFilteredVehicles(VEHICLES);
        } else {
            const filtered = VEHICLES.filter((vehicle) =>
                vehicle.name.toLowerCase().includes(text.toLowerCase()) ||
                vehicle.brand.toLowerCase().includes(text.toLowerCase()) ||
                vehicle.vehicleType.toLowerCase().includes(text.toLowerCase()) ||
                vehicle.plate.toLowerCase().includes(text.toLocaleLowerCase())
            );
            setFilteredVehicles(filtered);
        }
    };

    const countVehicles = filteredVehicles.length;

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}
        >
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
                    <Text style={styles.sectionTitleText}>Veículos</Text>
                </View>

                <View style={styles.fieldSearch}>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            placeholder="Buscar veículo..."
                            icon={<Search color="#64748B" size={20} />}
                            value={searchItem}
                            onChangeText={handleSearch}
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




                <FlatList
                    data={filteredVehicles}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderVehicle({ item, navigation })}
                    contentContainerStyle={[styles.listContent, { paddingBottom: 120 }]}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.listHeader}>
                            <Text style={styles.resultsCount}>
                                {countVehicles === 0
                                    ? "Nenhum veículo cadastrado"
                                    : `Mostrando ${countVehicles} veículo${countVehicles > 1 ? 's' : ''}`
                                }
                            </Text>
                        </View>
                    }

                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MessageCircleWarning size={40} color="#CBD5E1" />
                            <Text style={styles.emptyText}>Nenhum cliente encontrado</Text>
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
        width: 4,
        height: 20,
        backgroundColor: '#FFCC00',
        borderRadius: 2,
        marginRight: 10,
    },
    sectionTitleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },








    fieldSearch: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 12,
        backgroundColor: '#F8F9FA',
    },

    inputContainer: {
        flex: 1,
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



    clientCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#FFCC0025',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFCC0040'
    },

    clientInfo: {
        flex: 1,
        marginLeft: 15
    },
    clientName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 2
    },
    clientSubInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    clientPhone: {
        fontSize: 13,
        color: '#64748B',
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

    statusBadge: {
        marginRight: 8,
        padding: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
    },

    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40
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