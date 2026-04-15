import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
    ChevronLeft,
    User,
    Car,
    Save,
    Search,
    AlertCircle,
    Clipboard
} from "lucide-react-native";

import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import Button from "@/components/Button";

const CLIENTS = [
    { id: '1', name: 'Marcos Mello' },
    { id: '2', name: 'Ana Silva' },
    { id: '3', name: 'Ricardo Jorge' },
    { id: '4', name: 'Beatriz Costa' },
];

const VEHICLES = [
    { id: '1', name: 'Honda Civic - REE-2823' },
    { id: '2', name: 'Toyota Corolla - ABC-1234' },
    { id: '3', name: 'Fiat Toro - XYZ-9988' },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function NewAppointmentScreen() {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<"client" | "vehicle">("client");

    const [selectedClient, setSelectedClient] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [description, setDescription] = useState("");
    const [searchText, setSearchText] = useState("");

    const [loading, setLoading] = useState(false);

    const dataForModal = modalType === "client" ? CLIENTS : VEHICLES;
    const filteredData = dataForModal.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const openModal = (type: "client" | "vehicle") => {
        setModalType(type);
        setSearchText("");
        setModalVisible(true);
    };

    const handleSelectItem = (name: string) => {
        if (modalType === "client") setSelectedClient(name);
        else setSelectedVehicle(name);

        setModalVisible(false);
    };

    const handleFinish = (): void => {
        setLoading(true);

        try {
            setTimeout(() => {
                alert(`Dados salvos: Nome: ${selectedClient}, Veículo: ${selectedVehicle}, Descrição: ${description.trim() === "" ? "Sem descrição!" : description}`);
            }, 800);

        } finally {
            setLoading(false);
        }

    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaTop} edges={["top"]} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft size={28} color="#111827" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerSubtitle}>Área de Cadastro</Text>
                        <Text style={styles.headerTitle}>Novo Agendamento</Text>
                    </View>
                    <View style={{ width: 45 }} />
                </View>

                <View style={{ backgroundColor: '#FFCC00', flex: 1 }}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.sectionCard}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.iconCircle}>
                                    <User size={20} color="#FFF" />
                                </View>
                                <Text style={styles.sectionTitle}>Dados do Proprietário</Text>
                            </View>

                            <CustomSelect
                                label="Nome do proprietário"
                                placeholder="Selecione o nome..."
                                value={selectedClient}
                                onPress={() => openModal("client")}
                                icon={<User size={20} color="#111827" />}
                            />
                        </View>

                        {selectedClient !== "" && (
                            <View style={styles.sectionCard}>
                                <View style={styles.sectionHeader}>
                                    <View style={styles.iconCircle}>
                                        <Car size={20} color="#FFF" />
                                    </View>
                                    <Text style={styles.sectionTitle}>Detalhes do Serviço</Text>
                                </View>

                                <CustomSelect
                                    label="Veículo"
                                    placeholder="Selecione o veículo..."
                                    value={selectedVehicle}
                                    onPress={() => openModal("vehicle")}
                                    icon={<Car size={20} color="#111827" />}
                                    style={{ marginBottom: 20 }}
                                />

                                <CustomInput
                                    label="Descrição do Problema"
                                    placeholder="Descreva o que está acontecendo com o carro..."
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    style={styles.textArea}
                                />

                                <Button
                                    title="Salvar"
                                    variant="secondary"
                                    onPress={handleFinish}
                                    icon={<Save color="#FFF" />}
                                    iconPosition="left"
                                    loading={loading}
                                    disabled={
                                        loading ||
                                        !selectedClient ||
                                        !selectedVehicle
                                    }
                                />
                            </View>
                        )}
                    </ScrollView>
                </View>

                <Modal visible={modalVisible} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={styles.overlayCloseArea} />
                        </TouchableWithoutFeedback>

                        <View style={[styles.modalContainer, { height: SCREEN_HEIGHT * 0.7 }]}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <View style={styles.modalIndicator} />
                                    <Text style={styles.modalTitle}>
                                        {modalType === "client" ? "Selecionar Cliente" : "Selecionar Veículo"}
                                    </Text>
                                </View>

                                <View style={styles.searchContainer}>
                                    <CustomInput
                                        placeholder="Buscar..."
                                        value={searchText}
                                        onChangeText={setSearchText}
                                        icon={<Search size={20} color="#64748B" />}
                                    />
                                </View>

                                <FlatList
                                    data={filteredData}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.optionItem}
                                            onPress={() => handleSelectItem(item.name)}
                                        >
                                            <Text style={styles.optionText}>{item.name}</Text>
                                            {(selectedClient === item.name || selectedVehicle === item.name) && (
                                                <View style={styles.activeDot} />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => <View style={styles.modalDivider} />}
                                    showsVerticalScrollIndicator={false}

                                    ListEmptyComponent={
                                        <View style={styles.emptyContainer}>
                                            <Search size={40} color="#CBD5E1" style={{ marginBottom: 12 }} />
                                            <Text style={styles.emptyText}>
                                                Nenhum {modalType === "client" ? "cliente" : "veículo"} encontrado.
                                            </Text>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA"
    },
    safeAreaTop: {
        backgroundColor: "#FFCC00"
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
        alignItems: 'center'
    },
    headerTitleContainer: {
        alignItems: 'center'
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#453700',
        opacity: 0.7,
        textTransform: 'uppercase'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111827'
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden'
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40
    },
    sectionCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 24,
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 5 },
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#111827',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827'
    },

    textArea: {
        height: 120,
        paddingTop: 15,
    },

    btnFinish: {
        backgroundColor: '#FFCC00',
        height: 56,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 30,
        elevation: 2,
    },
    btnFinishText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#111827',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end'
    },
    overlayCloseArea: {
        flex: 1
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    modalContent: {
        flex: 1,
        paddingHorizontal: 20
    },
    modalHeader: {
        alignItems: 'center',
        paddingVertical: 18
    },
    modalIndicator: {
        width: 46,
        height: 6,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        marginBottom: 10
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827'
    },
    searchContainer: {
        marginBottom: 15
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    optionText: {
        fontSize: 16,
        color: '#475569',
        fontWeight: '500'
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFCC00'
    },
    modalDivider: {
        height: 1,
        backgroundColor: '#F1F5F9'
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#94A3B8',
        fontWeight: '500',
        textAlign: 'center',
    },
});