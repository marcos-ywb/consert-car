import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BASE_URL from "@/config/api";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    mustChangePassword: boolean;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{
        success: boolean;
        mustChangePassword?: boolean;
        message?: string;
    }>;
    signOut: () => Promise<void>;
    changePassword: (email: string, newPassword: string) => Promise<{ success: boolean }>;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const [storedUser, storedToken] = await AsyncStorage.multiGet([
                    "@user",
                    "@token",
                ]);

                if (storedUser[1] && storedToken[1]) {
                    setUser(JSON.parse(storedUser[1]));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadStorageData();
    }, []);

    async function signIn(email: string, password: string) {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, message: data.message ?? "Credenciais inválidas." };
            }

            await AsyncStorage.multiSet([
                ["@token", data.token],
                ["@user", JSON.stringify(data.user)],
            ]);

            setUser(data.user);

            return {
                success: true,
                mustChangePassword: data.user.mustChangePassword,
            };
        } catch {
            return { success: false, message: "Erro ao conectar ao servidor." };
        }
    }

    async function changePassword(email: string, newPassword: string) {
        try {
            await fetch(`${BASE_URL}/auth/change-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            const updatedUser = user ? { ...user, mustChangePassword: false } : null;
            if (updatedUser) {
                setUser(updatedUser);
                await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
            }

            return { success: true };
        } catch {
            return { success: false };
        }
    }

    async function signOut() {
        await AsyncStorage.multiRemove(["@token", "@user", "@nav_state"]);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}