import React, { useCallback, useEffect, useState } from "react";

import { View, ActivityIndicator } from "react-native";
import { NavigationContainer, NavigationState } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import { AuthStack, AppStack, ChangePasswordStack } from "./AppStacks";

const NAV_STATE_KEY = "@nav_state";

export default function AppRoutes() {
    const { user, loading } = useAuth();

    const [navReady, setNavReady] = useState(false);
    const [initialNavState, setInitialNavState] = useState<NavigationState | undefined>(undefined);

    useEffect(() => {
        async function loadNavState() {
            try {
                if (user) {
                    const saved = await AsyncStorage.getItem(NAV_STATE_KEY);
                    if (saved) {
                        setInitialNavState(JSON.parse(saved));
                    }
                }
            } catch {
                //falha
            } finally {
                setNavReady(true);
            }
        }

        if (!loading) {
            loadNavState();
        }
    }, [loading, user]);

    const onStateChange = useCallback(async (state: NavigationState | undefined) => {
        if (user && state) {
            try {
                await AsyncStorage.setItem(NAV_STATE_KEY, JSON.stringify(state));
            } catch {
                //erro
            }
        }
    }, [user]);

    if (loading || !navReady) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "FFCC00" }}>
                <ActivityIndicator size="large" color="#111827" />
            </View>
        );
    }

    return (
        <NavigationContainer
            initialState={user && !user.mustChangePassword ? initialNavState : undefined}
            onStateChange={onStateChange}
        >
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