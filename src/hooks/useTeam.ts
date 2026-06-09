import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { teamService, Usuario } from "@/services/teamService";
import { useAuth } from "@/contexts/AuthContext";

export function useTeam() {
    const { user } = useAuth();

    const [team, setTeam] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const fetchTeam = useCallback(async (searchTerm?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await teamService.getAll(searchTerm);

            const sorted = [...data].sort((a, b) => {
                if (a.usuario_id === user?.id) return -1;
                if (b.usuario_id === user?.id) return 1;
                return 0
            });

            setTeam(sorted);
        } catch {
            setError("Erro ao carregar equipe de colaboradores. Tente novamente!");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            fetchTeam(search);
        }, [search])
    );

    return {
        team,
        loading,
        error,
        search,
        setSearch,
        refetch: fetchTeam,
    }
}