import React, { useEffect } from "react";

import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";

const ALLOWED_ROLES: Record<string, string[]> = {
    AdminScreen: ["OWNER", "ADMIN"],
    ReportsScreen: ["OWNER", "ADMIN"],
};

export function useRoleGuard(screenName: string) {
    const { user } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const allowed = ALLOWED_ROLES[screenName] ?? [];
        if (user && !allowed.includes(user.role)) {
            Alert.alert("Acesso negado", "Você não possui permissão para acessar esta página!");
            navigation.goBack();
        }
    }, [user]);
}