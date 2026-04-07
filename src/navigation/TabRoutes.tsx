import React from "react";
import { View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "@/screens/app/HomeScreen";
import CustomerScreen from "@/screens/app/CustomerScreen";
import VehicleScreen from "@/screens/app/VehicleScreen";

import { Home, User, Car, File, CalendarDays } from "lucide-react-native";
import { COLORS } from "@/styles/theme";

const Tab = createBottomTabNavigator();

function TabItem({ Icon, color, focused }: any) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                transform: [{ translateY: focused ? -2 : 0 }],
            }}
        >
            <Icon size={22} color={color} />
        </View>
    );
}

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    position: "absolute",
                    bottom: 20,

                    marginHorizontal: 20,

                    height: 65,
                    borderRadius: 18,
                    backgroundColor: COLORS.backgroundAlt,

                    borderTopWidth: 0,

                    elevation: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 8,
                },

                tabBarIconStyle: {
                    marginTop: 6,
                },

                tabBarActiveTintColor: COLORS.primary.DEFAULT,
                tabBarInactiveTintColor: "#F8F9FA",

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "500",
                    marginTop: -2,
                },

                tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem Icon={Home} color={color} focused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="Clientes"
                component={CustomerScreen}
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
        </Tab.Navigator>
    );
}