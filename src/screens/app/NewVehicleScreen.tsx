import React, { useState } from "react";
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
    MapPinned,
    Map,
    Save
} from "lucide-react-native";

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

import { validateNewCustomer, NewCustomerErrors } from "@/utils/authValidation";

const getInitials = (name: string) => {
    const parts = name.trim().split(' ');

    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    const firstInitial = parts[0].charAt(0);
    const lastInitial = parts[parts.length - 1].charAt(0);

    return (firstInitial + lastInitial).toUpperCase();
};

export default function NewVehicleScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    const [vehicleData, setVehicleData] = useState({
        marca: "",
        modelo: "",
        placa: "",
        ano: "",
        cor: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<NewCustomerErrors>({});

    const handleVehicleChange = (field: any, value: any) => {
        setVehicleData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    function handleSaveVehicle() {
        setLoading(true);

        try {
            const validationErrors = validateNewCustomer(undefined, vehicleData, undefined);

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);

                setTimeout(() => {
                    setErrors({});
                }, 2500);

                return;
            }
        } finally {
            setLoading(false);
        }
    };

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
                        <Text style={styles.headerTitle}>Novo Veículo</Text>
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
                                <Text style={styles.idText}>#{155}</Text>
                            </View>
                        </View>
                        <View style={styles.largeAvatar}>
                            <Text style={styles.avatarText}>{getInitials("Marcos Mello")}</Text>
                        </View>
                        <Text style={styles.name}>{"Marcos Mello"}</Text>
                        <Text style={styles.lastVisit}>Última visita: {"25/02"}</Text>
                    </View>


                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconCircle}>
                                <Car size={20} color="#FFF" />
                            </View>
                            <Text style={styles.sectionTitle}>Dados do Veículo</Text>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <CustomInput
                                    label="Marca"
                                    placeholder="Honda"
                                    value={vehicleData.marca}
                                    onChangeText={(text) => handleVehicleChange("marca", text)}
                                    error={errors.marca}
                                />
                            </View>
                            <View style={styles.flex1}>
                                <CustomInput
                                    label="Modelo"
                                    placeholder="Civic"
                                    value={vehicleData.modelo}
                                    onChangeText={(text) => handleVehicleChange("modelo", text)}
                                    error={errors.modelo}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 2 }}>
                                <CustomInput
                                    label="Placa"
                                    placeholder="BRA2E19"
                                    autoCapitalize="characters"
                                    value={vehicleData.placa}
                                    onChangeText={(text) => handleVehicleChange("placa", text)}
                                    error={errors.placa}
                                />
                            </View>
                            <View style={{ flex: 1.5 }}>
                                <CustomInput
                                    label="Ano"
                                    placeholder="2022"
                                    keyboardType="numeric"
                                    value={vehicleData.ano}
                                    onChangeText={(text) => handleVehicleChange("ano", text)}
                                    error={errors.ano}
                                />
                            </View>
                        </View>

                        <CustomInput
                            label="Cor"
                            placeholder="Preto Fosco"
                            value={vehicleData.cor}
                            onChangeText={(text) => handleVehicleChange("cor", text)}
                            error={errors.cor}
                        />
                    </View>

                    <Button
                        title="Salvar"
                        onPress={handleSaveVehicle}
                        variant="secondary"
                        loading={loading}
                        disabled={
                            loading ||
                            !vehicleData.marca ||
                            !vehicleData.modelo ||
                            !vehicleData.placa ||
                            !vehicleData.ano ||
                            !vehicleData.cor
                        }
                        icon={<Save size={22} color="#FFF" />}
                        iconPosition="left"
                    />


                </ScrollView>
            </KeyboardAvoidingView>
        </ SafeAreaView>
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

    lastVisit: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
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
    row: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    flex1: {
        flex: 1,
    }
});