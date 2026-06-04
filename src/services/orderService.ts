import api from "./api";

export interface ServiceOrder {
    id: string;
    status: "ABERTA" | "EM_ANDAMENTO" | "AGUARDANDO_PECA" | "FINALIZADA" | "CANCELADA";
    descricaoServico: string;
    diagnostico: string;
    valorTotal: number;
    dataEntrada: string;
    dataSaida?: string;

    agendamentoId: string;
    dataAgendada: string;

    veiculoId: string;
    veiculoMarca: string;
    veiculoModelo: string;
    veiculoPlaca: string;

    clienteId: string;
    clienteNome: string;
    clienteTelefone: string;

    usuarioId: string;
    usuarioNome: string;
}

const mapRow = (o: any): ServiceOrder => ({
    id: String(o.os_id),
    status: o.status,
    descricaoServico: o.descricao_servico,
    diagnostico: o.diagnostico,
    valorTotal: Number(o.valor_total),
    dataEntrada: o.data_entrada,
    dataSaida: o.data_saida ?? undefined,

    agendamentoId: String(o.agendamento_id),
    dataAgendada: o.data_agendada,

    veiculoId: String(o.veiculo_id),
    veiculoMarca: o.veiculo_marca,
    veiculoModelo: o.veiculo_modelo,
    veiculoPlaca: o.veiculo_placa,

    clienteId: String(o.cliente_id),
    clienteNome: o.cliente_nome,
    clienteTelefone: o.cliente_telefone,

    usuarioId: String(o.usuario_id),
    usuarioNome: o.usuario_nome,
});

export const orderService = {
    getAll: async (search?: string, status?: string): Promise<ServiceOrder[]> => {
        const params = new URLSearchParams();
        if (search) params.append("q", search);
        if (status && status !== "TODOS") params.append("status", status);
        const query = params.toString() ? `?${params.toString()}` : "";
        const raw: any[] = await api.get(`/orders${query}`);
        return raw.map(mapRow);
    },

    getById: async (id: string): Promise<ServiceOrder> => {
        const raw: any = await api.get(`/orders/${id}`);
        return mapRow(raw);
    },

    create: async (payload: {
        agendamento_id: string;
        veiculo_id: string;
        descricao_servico: string;
        diagnostico: string;
        valor_total?: number;
    }): Promise<{ os_id: number; message: string }> => {
        return api.post("/orders", payload);
    },

    updateStatus: async (id: string, status: ServiceOrder["status"]): Promise<void> => {
        await api.patch(`/orders/${id}/status`, { status });
    },

    updateValor: async (id: string, valor_total: number): Promise<void> => {
        await api.patch(`/orders/${id}/valor`, { valor_total });
    },
};