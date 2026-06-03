import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { appointmentService, Appointment } from "@/services/appointmentService";

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("Todos");

    const fetchAppointments = useCallback(async (searchTerm?: string, statusFilter?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await appointmentService.getAll(searchTerm, statusFilter);
            setAppointments(data);
        } catch {
            setError("Erro ao carregar agendamentos. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchAppointments(search, status);
        }, [search, status])
    );

    return {
        appointments,
        loading,
        error,
        search,
        setSearch,
        status,
        setStatus,
        refetch: fetchAppointments,
    };
}