import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { customerService, Customer } from "@/services/customerService";

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const fecthCustomers = useCallback(async (searchTerm?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await customerService.getAll(searchTerm);
            setCustomers(data);
        } catch (err) {
            setError("Erro ao carregar clientes. Tente novamente!");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fecthCustomers(search);
        }, [search])
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            fecthCustomers(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search, fecthCustomers]);

    return {
        customers,
        loading,
        error,
        search,
        setSearch,
        refetch: fecthCustomers,
    };
}