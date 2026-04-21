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
    CreditCard
} from "lucide-react-native";

import Button from "@/components/Button";

import { formatDatetime } from "@/utils/formatters";

export default function AppointmentDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    const { appointmentData } = route.params as any;

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
                        <Text style={styles.headerSubtitle}>Área de Agendamento</Text>
                        <Text style={styles.headerTitle}>Detalhes</Text>
                    </View>

                    <View style={{ width: 45 }} />
                </View>




                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.generalSection}>
                        <View style={styles.idContainer}>
                            <View style={styles.idBadge}>
                                <Text style={styles.idText}>#{appointmentData.id}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>{formatDatetime(appointmentData.dateTime)}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconCircle}>
                                <User size={20} color="#FFF" />
                            </View>

                            <Text style={styles.sectionTitle}>Dados do Proprietário</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoIconBg}>
                                <User size={18} color="#64748B" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Nome completo</Text>
                                <Text style={styles.infoValue}>{appointmentData.clientName}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoIconBg}>
                                <Phone size={18} color="#64748B" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Telefone / WhatsApp</Text>
                                <Text style={styles.infoValue}>{appointmentData.phone}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconCircle}>
                                <Car size={20} color="#FFF" />
                            </View>

                            <Text style={styles.sectionTitle}>Dados do Veículo</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoIconBg}>
                                <CarFront size={18} color="#64748B" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Marca / Modelo</Text>
                                <Text style={styles.infoValue}>{appointmentData.vehicle}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoIconBg}>
                                <CreditCard size={18} color="#64748B" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Placa</Text>
                                <Text style={styles.infoValue}>{appointmentData.plate}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.fieldButtons}>
                        <Button
                            title="Editar"
                            onPress={() => alert("Clicado!")}
                            icon={<SquarePen color="#111827" />}
                            style={{ flex: 1 }}
                        />

                        <Button
                            title="Cancelar"
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
        fontWeight: 700,
        color: "#111827",
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

    generalSection: {
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


    fieldButtons: {
        flexDirection: "row",
        gap: 8
    },

});