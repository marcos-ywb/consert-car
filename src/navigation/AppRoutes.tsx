import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";

import { AuthStack } from "./AppStacks";
import { AppStack } from "./AppStacks";
import { ChangePasswordStack } from "./AppStacks";

export default function AppRoutes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user?.mustChangePassword ? (
                <ChangePasswordStack />
            ) : user ? (
                <AppStack />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}