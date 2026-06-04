import React, { useState, useCallback } from "react";
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
    Dimensions,
    ActivityIndicator,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import {
    ChevronLeft,
    User,
    Car,
    Save,
    Search,
    AlertCircle,
    CalendarClock,
} from "lucide-react-native";

import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import Button from "@/components/Button";

import { customerService, Customer, Veiculo } from "@/services/customerService";
import { appointmentService } from "@/services/appointmentService";
import { useAuth } from "@/contexts/AuthContext";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function NewAppointmentScreen() {
    const { user } = useAuth();
    const navigation = useNavigation();


    const [clientes, setClientes] = useState<Customer[]>([]);
    const [loadingClientes, setLoadingClientes] = useState(false);


    const [selectedCliente, setSelectedCliente] = useState<Customer | null>(null);
    const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);
    const [description, setDescription] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");


    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<"client" | "vehicle">("client");
    const [searchText, setSearchText] = useState("");


    const [loading, setLoading] = useState(false);


    useFocusEffect(
        useCallback(() => {
            const fetchClientes = async () => {
                try {
                    setLoadingClientes(true);
                    const data = await customerService.getAll();
                    setClientes(data);
                } catch {
                    Alert.alert("Erro", "Não foi possível carregar os clientes.");
                } finally {
                    setLoadingClientes(false);
                }
            };
            fetchClientes();
        }, [])
    );


    const modalData =
        modalType === "client"
            ? clientes.filter((c) =>
                c.name.toLowerCase().includes(searchText.toLowerCase())
            )
            : (selectedCliente?.veiculos ?? []).filter((v) =>
                `${v.marca} ${v.modelo} ${v.placa}`
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );


    const openModal = (type: "client" | "vehicle") => {
        setModalType(type);
        setSearchText("");
        setModalVisible(true);
    };

    const handleSelectCliente = (cliente: Customer) => {

        if (selectedCliente?.id !== cliente.id) {
            setSelectedVeiculo(null);
        }
        setSelectedCliente(cliente);
        setModalVisible(false);
    };

    const handleSelectVeiculo = (veiculo: Veiculo) => {
        setSelectedVeiculo(veiculo);
        setModalVisible(false);
    };

    const handleSubmit = async () => {
        if (!selectedCliente || !selectedVeiculo || !scheduledAt.trim()) {
            Alert.alert("Atenção", "Preencha cliente, veículo e data/hora do agendamento.");
            return;
        }

        const brFormat = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
        const isoFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

        let isoDate = scheduledAt.trim();

        if (brFormat.test(isoDate)) {
            isoDate = isoDate.replace(
                brFormat,
                (_, d, m, y, h, min) => `${y}-${m}-${d} ${h}:${min}:00`
            );
        } else if (isoFormat.test(isoDate)) {
            isoDate = `${isoDate}:00`;
        } else {
            Alert.alert("Atenção", "Use o formato: DD/MM/AAAA HH:MM\nEx: 15/06/2025 14:30");
            return;
        }

        try {
            setLoading(true);
            console.log(
                "Id do cliente: " + selectedCliente.id + "\n",
                "Id do veiculo: " + String(selectedVeiculo.veiculo_id) + "\n",
                "Data agendada: " + isoDate + "\n",
                "Descricao: " + description
            );
            await appointmentService.create({
                cliente_id: selectedCliente.id,
                veiculo_id: String(selectedVeiculo.veiculo_id),
                usuario_id: String(user!.id),
                data_agendada: isoDate,
                descricao_servico: description.trim() || undefined,
            });

            Alert.alert("Sucesso!", "Agendamento criado com sucesso.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch {
            Alert.alert("Erro", "Não foi possível criar o agendamento. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const applyDateMask = (value: string): string => {

        const digits = value.replace(/\D/g, "").slice(0, 12);

        let masked = digits;
        if (digits.length > 2) masked = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        if (digits.length > 4) masked = `${masked.slice(0, 5)}/${digits.slice(4)}`;
        if (digits.length > 8) masked = `${masked.slice(0, 10)} ${digits.slice(8)}`;
        if (digits.length > 10) masked = `${masked.slice(0, 13)}:${digits.slice(10)}`;

        return masked;
    };


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaTop} edges={["top"]} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
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
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerSubtitle}>Área de Cadastro</Text>
                        <Text style={styles.headerTitle}>Novo Agendamento</Text>
                    </View>
                    <View style={{ width: 45 }} />
                </View>

                <View style={{ backgroundColor: "#FFCC00", flex: 1 }}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
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
                                placeholder={
                                    loadingClientes
                                        ? "Carregando clientes..."
                                        : "Selecione o nome..."
                                }
                                value={selectedCliente?.name ?? ""}
                                onPress={() => !loadingClientes && openModal("client")}
                                icon={
                                    loadingClientes ? (
                                        <ActivityIndicator size="small" color="#111827" />
                                    ) : (
                                        <User size={20} color="#111827" />
                                    )
                                }
                            />
                        </View>


                        {selectedCliente && (
                            <View style={styles.sectionCard}>
                                <View style={styles.sectionHeader}>
                                    <View style={styles.iconCircle}>
                                        <Car size={20} color="#FFF" />
                                    </View>
                                    <Text style={styles.sectionTitle}>Detalhes do Serviço</Text>
                                </View>


                                {selectedCliente.veiculos.length === 0 ? (
                                    <View style={styles.warningBox}>
                                        <AlertCircle size={18} color="#F59E0B" />
                                        <Text style={styles.warningText}>
                                            Este cliente não possui veículos cadastrados.
                                        </Text>
                                    </View>
                                ) : (
                                    <CustomSelect
                                        label="Veículo"
                                        placeholder="Selecione o veículo..."
                                        value={
                                            selectedVeiculo
                                                ? `${selectedVeiculo.marca} ${selectedVeiculo.modelo} • ${selectedVeiculo.placa}`
                                                : ""
                                        }
                                        onPress={() => openModal("vehicle")}
                                        icon={<Car size={20} color="#111827" />}
                                        style={{ marginBottom: 20 }}
                                    />
                                )}

                                <CustomInput
                                    label="Data e Hora"
                                    placeholder="DD/MM/AAAA HH:MM"
                                    value={scheduledAt}
                                    onChangeText={(text) => setScheduledAt(applyDateMask(text))}
                                    icon={<CalendarClock size={20} color="#64748B" />}
                                    style={{ marginBottom: 20 }}
                                    keyboardType="numeric"
                                    maxLength={16}
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
                                    title="Salvar Agendamento"
                                    variant="secondary"
                                    onPress={handleSubmit}
                                    icon={<Save color="#FFF" />}
                                    iconPosition="left"
                                    loading={loading}
                                    disabled={loading || !selectedCliente || !selectedVeiculo || !scheduledAt.trim()}
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
                                        {modalType === "client"
                                            ? "Selecionar Cliente"
                                            : "Selecionar Veículo"}
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
                                    data={modalData as any[]}
                                    keyExtractor={(item) =>
                                        String(
                                            modalType === "client"
                                                ? (item as Customer).id
                                                : (item as Veiculo).veiculo_id
                                        )
                                    }
                                    renderItem={({ item }) => {
                                        const isCliente = modalType === "client";
                                        const label = isCliente
                                            ? (item as Customer).name
                                            : `${(item as Veiculo).marca} ${(item as Veiculo).modelo} • ${(item as Veiculo).placa}`;
                                        const isSelected = isCliente
                                            ? selectedCliente?.id === (item as Customer).id
                                            : selectedVeiculo?.veiculo_id === (item as Veiculo).veiculo_id;

                                        return (
                                            <TouchableOpacity
                                                style={styles.optionItem}
                                                activeOpacity={0.7}
                                                onPress={() =>
                                                    isCliente
                                                        ? handleSelectCliente(item as Customer)
                                                        : handleSelectVeiculo(item as Veiculo)
                                                }
                                            >
                                                <Text style={styles.optionText}>{label}</Text>
                                                {isSelected && <View style={styles.activeDot} />}
                                            </TouchableOpacity>
                                        );
                                    }}
                                    ItemSeparatorComponent={() => <View style={styles.modalDivider} />}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                    ListEmptyComponent={
                                        <View style={styles.emptyContainer}>
                                            <Search size={40} color="#CBD5E1" style={{ marginBottom: 12 }} />
                                            <Text style={styles.emptyText}>
                                                Nenhum{" "}
                                                {modalType === "client" ? "cliente" : "veículo"}{" "}
                                                encontrado.
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
    container: { flex: 1, backgroundColor: "#F8F9FA" },
    safeAreaTop: { backgroundColor: "#FFCC00" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "#FFCC00",
    },
    backBtn: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitleContainer: { alignItems: "center" },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#453700",
        opacity: 0.7,
        textTransform: "uppercase",
    },
    headerTitle: { fontSize: 20, fontWeight: "800", color: "#111827" },

    scrollView: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
    },
    scrollContent: { padding: 20, paddingBottom: 40 },

    sectionCard: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 24,
        marginBottom: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 5 },
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#111827",
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: { fontSize: 17, fontWeight: "700", color: "#111827" },

    textArea: { height: 120, paddingTop: 15, marginBottom: 20 },

    warningBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#FFFBEB",
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#FEF3C7",
    },
    warningText: { fontSize: 14, color: "#92400E", fontWeight: "500", flex: 1 },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
    },
    overlayCloseArea: { flex: 1 },
    modalContainer: {
        width: "100%",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalContent: { flex: 1, paddingHorizontal: 20 },
    modalHeader: { alignItems: "center", paddingVertical: 18 },
    modalIndicator: {
        width: 46,
        height: 6,
        backgroundColor: "#E2E8F0",
        borderRadius: 3,
        marginBottom: 10,
    },
    modalTitle: { fontSize: 18, fontWeight: "800", color: "#111827" },
    searchContainer: { marginBottom: 15 },

    optionItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
    optionText: { fontSize: 16, color: "#475569", fontWeight: "500" },
    activeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#FFCC00" },
    modalDivider: { height: 1, backgroundColor: "#F1F5F9" },

    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#94A3B8",
        fontWeight: "500",
        textAlign: "center",
    },
});