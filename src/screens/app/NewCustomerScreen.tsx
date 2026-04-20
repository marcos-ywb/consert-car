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
import { useNavigation } from "@react-navigation/native";
import { validateNewCustomer, NewCustomerErrors } from "@/utils/authValidation";

import {
    ChevronLeft,
    User,
    Car,
    Save,
    MapPinned
} from "lucide-react-native";

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

export default function NewCustomerScreen() {
    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        cpf: ""
    });

    const [vehicleData, setVehicleData] = useState({
        marca: "",
        modelo: "",
        placa: "",
        ano: "",
        cor: ""
    });

    const [addressData, setAddressData] = useState({
        cep: "",
        estado: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        complemento: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<NewCustomerErrors>({});

    const handleUserChange = (field: string, value: string) => {
        let formattedValue = value;

        if (field === "phone") {
            formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .substring(0, 15);
        }

        if (field === "cpf") {
            formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                .substring(0, 14);
        }

        setUserData(prev => ({ ...prev, [field]: formattedValue }));
    };

    const handleVehicleChange = (field: any, value: any) => {
        setVehicleData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddressChange = (field: any, value: any) => {
        let formattedValue = value;

        if (field === "cep") {
            formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .substring(0, 9);
        }

        setAddressData(prev => ({ ...prev, [field]: formattedValue }));
    };

    function handleSaveCustomer() {
        setLoading(true);

        try {
            const validationErrors = validateNewCustomer(userData, vehicleData, addressData);

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
                        <Text style={styles.headerTitle}>Criar Cadastro</Text>
                    </View>

                    <View style={{ width: 45 }} />
                </View>

                <View style={{ backgroundColor: '#FFCC00', flex: 1 }}>
                    <ScrollView
                        style={styles.scrollView}
                        bounces={false}
                        overScrollMode="never"
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

                            <CustomInput
                                label="Nome Completo"
                                placeholder="João Silva"
                                autoCapitalize="words"
                                value={userData.name}
                                onChangeText={(text) => handleUserChange("name", text)}
                                error={errors.name}
                            />

                            <View style={styles.row}>
                                <View style={styles.flex1}>
                                    <CustomInput
                                        label="Telefone"
                                        placeholder="(11) 99999-9999"
                                        keyboardType="phone-pad"
                                        value={userData.phone}
                                        onChangeText={(text) => handleUserChange("phone", text)}
                                        error={errors.phone}
                                    />
                                </View>

                                <View style={styles.flex1}>
                                    <CustomInput
                                        label="CPF"
                                        placeholder="000.000.000-00"
                                        keyboardType="numeric"
                                        value={userData.cpf}
                                        onChangeText={(text) => handleUserChange("cpf", text)}
                                        error={errors.cpf}
                                    />
                                </View>
                            </View>


                            <View style={styles.sectionHeader}>
                                <View style={styles.iconCircle}>
                                    <MapPinned size={20} color="#FFF" />
                                </View>
                                <Text style={styles.sectionTitle}>Endereço do Proprietário</Text>
                            </View>

                            <View style={styles.row}>
                                <View style={{ flex: 2 }}>
                                    <CustomInput
                                        label="CEP"
                                        placeholder="00000-000"
                                        keyboardType="numeric"
                                        value={addressData.cep}
                                        onChangeText={(text) => handleAddressChange("cep", text)}
                                        error={errors.cep}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <CustomInput
                                        label="UF"
                                        placeholder="MG"
                                        autoCapitalize="characters"
                                        maxLength={2}
                                        value={addressData.estado}
                                        onChangeText={(text) => handleAddressChange("estado", text)}
                                        error={errors.estado}
                                    />
                                </View>
                            </View>


                            <CustomInput
                                label="Logradouro"
                                placeholder="Rua, Avenida, etc"
                                value={addressData.logradouro}
                                onChangeText={(text) => handleAddressChange("logradouro", text)}
                                error={errors.logradouro}
                            />

                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <CustomInput
                                        label="Nº"
                                        placeholder="123"
                                        keyboardType="numeric"
                                        value={addressData.numero}
                                        onChangeText={(text) => handleAddressChange("numero", text)}
                                        error={errors.numero}
                                    />
                                </View>

                                <View style={{ flex: 2 }}>
                                    <CustomInput
                                        label="Bairro"
                                        placeholder="Centro"
                                        value={addressData.bairro}
                                        onChangeText={(text) => handleAddressChange("bairro", text)}
                                        error={errors.bairro}
                                    />
                                </View>
                            </View>

                            <CustomInput
                                label="Cidade"
                                placeholder="Cidade"
                                value={addressData.cidade}
                                onChangeText={(text) => handleAddressChange("cidade", text)}
                                error={errors.cidade}
                            />

                            <CustomInput
                                label="Complemento"
                                placeholder="Apto, Bloco, Casa..."
                                value={addressData.complemento}
                                onChangeText={(text) => handleAddressChange("complemento", text)}
                            />

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
                            onPress={handleSaveCustomer}
                            variant="secondary"
                            loading={loading}
                            disabled={
                                loading ||
                                !userData.name ||
                                !userData.phone ||
                                !userData.cpf ||
                                !addressData.cep ||
                                !addressData.logradouro ||
                                !addressData.estado ||
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
                </View>
            </KeyboardAvoidingView>

            <SafeAreaView style={{ backgroundColor: "#F8F9FA" }} edges={["bottom"]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    safeAreaTop: {
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
        overflow: 'hidden',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
        minHeight: '100%',
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