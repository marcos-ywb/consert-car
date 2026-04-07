import React, { createContext, useContext, useState, useEffect } from "react";
import { StorageService } from "@/services/storage";

type User = {
    name: string;
    email: string;
    phone: string;
    mustChangePassword: boolean;
};

type UserCredentials = User & {
    password: string;
    role: "admin" | "user";
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{
        success: boolean;
        mustChangePassword?: boolean;
    }>;
    signOut: () => Promise<void>;
    createUser: (name: string, email: string, phone: string) => boolean;
    changePassword: (email: string, newPassword: string) => { success: boolean };
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    //Mock
    const [users, setUsers] = useState<UserCredentials[]>([
        {
            name: "Marcos Mello",
            email: "admin@email.com",
            phone: "38999999999",
            password: "123456",
            role: "admin",
            mustChangePassword: true,
        },
    ]);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storagedUser = await StorageService.getUser();
                if (storagedUser) {
                    setUser(storagedUser);
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

        await new Promise(resolve => setTimeout(resolve, 800));

        const userExists = users.find(u => u.email === email && u.password === password);

        if (!userExists) return { success: false };

        const { password: _, ...userWithoutPassword } = userExists;

        setUser(userWithoutPassword);
        await StorageService.saveUser(userWithoutPassword);

        return {
            success: true,
            mustChangePassword: userExists.mustChangePassword,
        };
    }

    function createUser(name: string, email: string, phone: string) {
        const userExists = users.find((u) => u.email === email);
        if (userExists) return false;

        const newUser: UserCredentials = {
            name, email, phone,
            password: "123456",
            role: "user",
            mustChangePassword: true,
        };

        setUsers((prev) => [...prev, newUser]);
        return true;
    }

    function changePassword(email: string, newPassword: string) {
        let updated = false;

        setUsers((prev) =>
            prev.map((u) => {
                if (u.email === email) {
                    updated = true;
                    return { ...u, password: newPassword, mustChangePassword: false };
                }
                return u;
            })
        );

        if (updated) {
            setUser((prev) => prev ? { ...prev, mustChangePassword: false } : prev);
            if (user && user.email === email) {
                StorageService.saveUser({ ...user, mustChangePassword: false });
            }
        }

        return { success: updated };
    }

    async function signOut() {
        await StorageService.removeUser();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, createUser, changePassword, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}