import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "@/screens/MainScreen";
import LoginScreen from "@/screens/auth/LoginScreen";
import ForgetPassword from "@/screens/auth/ForgetPasswordScreen";

import ChangePasswordScreen from "@/screens/auth/ChangePasswordScreen";

import TabRoutes from "./TabRoutes";

import NewCustomerScreen from "@/screens/app/NewCustomerScreen";
import CustomerDetailsScreen from "@/screens/app/CustomerDetailsScreen";

import NewAppointmentScreen from "@/screens/app/NewAppointmentScreen";
import AppointmentDetailsScreen from "@/screens/app/AppointmentDetailsScreen";

import NewVehicleScreen from "@/screens/app/NewVehicleScreen";
import VehicleDetailsScreen from "@/screens/app/VehicleDetailsScreen";


const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
    );
}

function ChangePasswordStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
}

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabRoutes} />

            <Stack.Screen name="NewCustomer" component={NewCustomerScreen} />
            <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />

            <Stack.Screen name="NewAppointment" component={NewAppointmentScreen} />
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />

            <Stack.Screen name="NewVehicle" component={NewVehicleScreen} />
            <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
        </Stack.Navigator>
    );
}

export { AuthStack, ChangePasswordStack, AppStack };