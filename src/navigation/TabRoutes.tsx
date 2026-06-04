import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "@/screens/app/HomeScreen";
import CustomersScreen from "@/screens/app/CustomersScreen";
import VehiclesScreen from "@/screens/app/VehiclesScreen";
import AppointmentsScreen from "@/screens/app/AppointmentsScreen";
import ServiceOrdersScreen from "@/screens/app/ServiceOrdersScreen";
import AdminScreen from "@/screens/app/AdminScreen";

import { useAuth } from "@/contexts/AuthContext";
import { canAccess } from "@/utils/permissions";

import { Home, User, Car, FileText, CalendarDays, Shield, Lock } from "lucide-react-native";
import { COLORS } from "@/styles/theme";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function TabItem({ Icon, color, focused, locked }: any) {
    return (
        <View style={styles.container}>
            {focused && !locked && < View style={styles.activeIndicator} />}
            <Icon
                size={22}
                color={locked ? "#CBD5E1" : color}
                strokeWidth={focused ? 2.5 : 2}
            />
            {locked && (
                <View style={styles.lockBadge}>
                    <Lock size={20} color="#ffffff" />
                </View>
            )}
        </View>
    );
}

function CenterTabButton({ isAdmin }: { isAdmin: boolean }) {
    const navigation = useNavigation<any>();

    const currentRoute = useNavigationState(
        (state) => state?.routes[state.index]?.name
    );

    const isOnHome = currentRoute === "Home";
    const isOnAdmin = currentRoute === "Admin";

    const showShield = isAdmin && isOnHome;
    const focused = isOnHome || isOnAdmin;

    function handlePress() {
        if (showShield) {
            navigation.navigate("Admin");
        } else {
            navigation.navigate("Home");
        }
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={1}
            style={styles.centerTouchable}
        >
            <View style={[styles.centerContainer, focused && styles.centerActive]}>
                {showShield ? (
                    <Shield
                        size={26}
                        color={focused ? "#FFF" : COLORS.primary.DEFAULT}
                        strokeWidth={2.5}
                    />
                ) : (
                    <Home
                        size={26}
                        color={focused ? "#FFF" : COLORS.primary.DEFAULT}
                        strokeWidth={2.5}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

function CenterTabItem({ focused }: any) {
    return (
        <View style={[styles.centerContainer, focused && styles.centerActive]}>
            <Home
                size={26}
                color={focused ? "#FFF" : COLORS.primary.DEFAULT}
                strokeWidth={2.5}
            />
        </View>
    );
}

export default function TabRoutes() {
    const { user } = useAuth();
    const isAdmin = user?.role === "OWNER" || user?.role === "ADMIN";

    const TAB_HEIGHT = 68;

    const handleLockedPress = (routeName: string) => {
        Alert.alert(
            "Acesso restrito",
            `Seu perfil não tem permissão para acessar ${routeName}.`
        );
    };

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 24,
                    marginHorizontal: 20,
                    height: TAB_HEIGHT,
                    borderRadius: 22,
                    backgroundColor: COLORS.backgroundAlt,
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                },

                tabBarIconStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },

                tabBarItemStyle: {
                    height: TAB_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarActiveTintColor: COLORS.primary.DEFAULT,
                tabBarInactiveTintColor: "#A0A0B0",
            }}
        >
            <Tab.Screen
                name="Clientes"
                component={CustomersScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem Icon={User} color={color} focused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="Veículos"
                component={VehiclesScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem Icon={Car} color={color} focused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarButton: () => <CenterTabButton isAdmin={isAdmin} />,
                }}
            />

            <Tab.Screen
                name="Admin"
                component={AdminScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: 'none' },
                }}
            />

            <Tab.Screen
                name="Agenda"
                component={AppointmentsScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem Icon={CalendarDays} color={color} focused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="OS"
                component={ServiceOrdersScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        const locked = !canAccess("OS", user?.role);
                        return (
                            <TabItem
                                Icon={FileText}
                                color={color}
                                focused={focused}
                                locked={locked}
                            />
                        );
                    },
                    tabBarButton: (props) => {
                        const locked = !canAccess("OS", user?.role);
                        if (!locked) return <TouchableOpacity {...(props as any)} />;

                        return (
                            <TouchableOpacity
                                style={[props.style as any, { opacity: 0.5 }]}
                                onPress={() => handleLockedPress("Ordens de Serviço")}
                                activeOpacity={0.6}
                            >
                                {props.children}
                            </TouchableOpacity>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 50,
    },
    activeIndicator: {
        position: 'absolute',
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: `${COLORS.primary.DEFAULT}15`,
    },

    centerTouchable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    centerContainer: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: COLORS.backgroundAlt,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateY: -15 }],
        borderWidth: 5,
        borderColor: COLORS.backgroundAlt,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    centerActive: {
        backgroundColor: COLORS.primary.DEFAULT,
        borderColor: COLORS.backgroundAlt,
    },

    lockBadge: {
        position: "absolute",
        top: 4,
        right: 4,
        width: 13,
        height: 13,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: COLORS.backgroundAlt,
        shadowOpacity: 0.6,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 3,
    },
});