import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
    ChevronLeft,
    Car,
    Phone,
    User,
    ChevronRight,
    File,
    SquarePen,
    Trash2,
    Plus,
    CarFront,
} from "lucide-react-native";

import Button from "@/components/Button";

export default function CustomerDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    const { customerData } = route.params as any;

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}
        >
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
                        <Text style={styles.headerSubtitle}>Área do Cliente</Text>
                        <Text style={styles.headerTitle}>Detalhes</Text>
                    </View>

                    <View style={{ width: 45 }} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.profileSection}>
                        <View style={styles.idContainer}>
                            <View style={styles.idBadge}>
                                <Text style={styles.idText}>#{customerData.id}</Text>
                            </View>
                        </View>
                        <View style={styles.largeAvatar}>
                            <Text style={styles.avatarText}>{customerData.name.charAt(0)}</Text>
                        </View>
                        <Text style={styles.name}>{customerData.name}</Text>
                        <Text style={styles.lastVisit}>Última visita: {customerData.lastVisit}</Text>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>

                            <View style={styles.iconCircle}>
                                <User size={20} color="#FFF" />
                            </View>

                            <Text style={styles.sectionTitle}>Dados de Contato</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoIconBg}>
                                <Phone size={18} color="#64748B" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Telefone / WhatsApp</Text>
                                <Text style={styles.infoValue}>{customerData.phone}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>

                            <View style={styles.iconCircle}>
                                <CarFront size={20} color="#FFF" />
                            </View>

                            <Text style={styles.sectionTitle}>Veículos Vinculados</Text>
                        </View>

                        {customerData.vehicles > 0 ? (
                            <TouchableOpacity style={styles.vehicleItem} activeOpacity={0.7}>
                                <View style={styles.vehicleIconInfo}>
                                    <Car size={24} color="#111827" />
                                    <View style={{ marginLeft: 12 }}>
                                        <Text style={styles.vehicleModel}>Modelo do Veículo</Text>
                                        <Text style={styles.vehiclePlate}>PLACA-1234</Text>
                                    </View>
                                </View>
                                <ChevronRight size={20} color="#CBD5E1" />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.emptyVehicleCard}>
                                <Car size={32} color="#CBD5E1" />
                                <Text style={styles.emptyText}>Nenhum veículo cadastrado</Text>
                            </View>
                        )}

                        <TouchableOpacity style={styles.addVehicleBtn} activeOpacity={0.7}>
                            <View style={styles.addVehicleContent}>
                                <Plus size={20} color="#64748B" />
                                <Text style={styles.addVehicleBtnText}>
                                    {customerData.vehicles > 0 ? "Adicionar Novo Veículo" : "Adicionar Veículo"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.fieldButtons}>
                        <Button
                            title="Editar"
                            onPress={() => alert("Clicado!")}
                            icon={<SquarePen color="#111827" />}
                            style={{ flex: 1 }}
                        />

                        <Button
                            title="Desativar!"
                            variant="danger"
                            onPress={() => alert("Clicado!")}
                            icon={<Trash2 color="#FEE2E2" />}
                            style={{ flex: 1 }}
                        />
                    </View>

                    <Button
                        title="Abrir ordem de serviço"
                        variant="secondary"
                        onPress={() => alert("Clicado!")}
                        icon={<File color="#FFF" />}
                        style={{ marginTop: 10 }}
                    />


                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFCC00",
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
        alignItems: 'center',
    },

    headerTitleContainer: {
        alignItems: 'center',
    },

    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#453700',
        opacity: 0.7,
        textTransform: 'uppercase',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111827',
    },

    scrollView: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 16
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
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
        marginBottom: 20,
    },

    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#111827',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },

    content: {
        padding: 20
    },

    profileSection: {
        alignItems: 'center',
        marginBottom: 30
    },

    idContainer: {
        paddingBottom: 15
    },

    idBadge: {
        backgroundColor: '#111827',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'center',
    },

    idText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
    },

    largeAvatar: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#FFCC0025',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#FFCC0040'
    },

    avatarText: {
        fontSize: 30,
        fontWeight: '800',
        color: '#B48A00'
    },

    name: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111827'
    },
    section: {
        marginTop: 10
    },

    sectionLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#475569',
        marginBottom: 15
    },

    emptyVehicleCard: {
        padding: 30,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        alignItems: 'center'
    },

    emptyText: {
        color: '#94A3B8',
        marginTop: 10
    },

    lastVisit: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 8
    },

    infoIconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '600',
        textTransform: 'uppercase',
    },

    infoValue: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '700',
    },

    vehicleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },

    vehicleIconInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    vehicleModel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },

    vehiclePlate: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
    },

    addVehicleBtn: {
        marginTop: 15,
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#CBD5E1',
        backgroundColor: '#F8F9FA',
    },

    addVehicleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    addVehicleBtnText: {
        color: '#64748B',
        fontSize: 15,
        fontWeight: '600',
    },

    primaryActionBtn: {
        backgroundColor: '#111827',
        padding: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 10,
        elevation: 4,
    },

    primaryActionBtnText: {
        color: '#FFCC00',
        fontSize: 16,
        fontWeight: '800',
    },

    fieldButtons: {
        flexDirection: "row",
        gap: 8
    },
});