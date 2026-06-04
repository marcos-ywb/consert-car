import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { orderService, ServiceOrder } from "@/services/orderService";

export function useOrders() {
    const [orders, setOrders] = useState<ServiceOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("TODOS");

    const fetchOrders = useCallback(async (searchTerm?: string, statusFilter?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await orderService.getAll(searchTerm, statusFilter);
            setOrders(data);
        } catch {
            setError("Erro ao carregar ordens de serviço. Tente novamente!");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchOrders(search, status);
        }, [search, status])
    );

    return {
        orders,
        loading,
        error,
        search,
        setSearch,
        status,
        setStatus,
        refetch: fetchOrders,
    };
}