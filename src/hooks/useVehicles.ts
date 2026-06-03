import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { vehicleService, Vehicle } from "@/services/vehicleService";

export function useVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const fetchVehicles = useCallback(async (searchTerm?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await vehicleService.getAll(searchTerm);
            setVehicles(data);
        } catch {
            setError("Erro ao carregar veículos. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchVehicles(search);
        }, [search])
    );

    return {
        vehicles,
        loading,
        error,
        search,
        setSearch,
        refetch: fetchVehicles,
    };
}