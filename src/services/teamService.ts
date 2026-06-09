import api from "./api";

export interface Usuario {
    usuario_id: number;
    nome: string;
    telefone: string;
    email: string;
    cargo: "OWNER" | "ADMIN" | "MECANICO" | "ATENDENTE";
    status: boolean;
    deve_trocar_senha: boolean;
    criado_em: string;
}

export const teamService = {
    getAll: async (search?: string): Promise<Usuario[]> => {
        const query = search ? `?q=${encodeURIComponent(search)}` : "";
        return api.get(`/users${query}`);
    },
};