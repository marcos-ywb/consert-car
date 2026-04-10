import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "@/screens/app/HomeScreen";
import CustomersScreen from "@/screens/app/CustomersScreen";
import VehicleScreen from "@/screens/app/VehicleScreen";

import { Home, User, Car, FileText, CalendarDays } from "lucide-react-native";
import { COLORS } from "@/styles/theme";

const Tab = createBottomTabNavigator();

function TabItem({ Icon, color, focused }: any) {
    return (
        <View style={styles.container}>
            {focused && <View style={styles.activeIndicator} />}
            <Icon size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
        </View>
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
    const TAB_HEIGHT = 68;

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
                component={VehicleScreen}
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
                    tabBarIcon: ({ focused }) => (
                        <CenterTabItem focused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="Agenda"
                component={VehicleScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem Icon={CalendarDays} color={color} focused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="OS"
                component={VehicleScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem Icon={FileText} color={color} focused={focused} />
                    ),
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
    centerContainer: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: COLORS.backgroundAlt,
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});