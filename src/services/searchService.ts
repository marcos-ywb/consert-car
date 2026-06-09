import api from "./api";

export interface SearchCliente {
    cliente_id: number;
    nome: string;
    telefone: string;
}

export interface SearchVeiculo {
    veiculo_id: number;
    marca: string;
    modelo: string;
    placa: string;
    proprietario: string;
}

export interface SearchAgendamento {
    agendamento_id: number;
    status: string;
    data_agendada: string;
    cliente_nome: string;
    veiculo_marca: string;
    veiculo_modelo: string;
    veiculo_placa: string;
}

export interface SearchResults {
    clientes: SearchCliente[];
    veiculos: SearchVeiculo[];
    agendamentos: SearchAgendamento[];
}

export const searchService = {
    search: async (q: string): Promise<SearchResults> => {
        return api.get(`/search?q=${encodeURIComponent(q)}`);
    },
};