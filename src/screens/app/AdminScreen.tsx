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

import CustomCarousel from "@/components/CustomCarousel";
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
export default function AdminScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    const [isExpanded, setIsExpanded] = useState(false);

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
                    <Text style={styles.sectionTitleText}>Aba administrativa</Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.carouselWrapper}>
                        <CustomCarousel />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Titulo 1</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Titulo 2</Text>
                        </View>
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
});