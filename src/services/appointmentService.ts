import api from "./api";

export interface Endereco {
    endereco_id: number;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
}

export interface Appointment {
    //
    id: string;
    userId: string;
    userName: string;

    //
    clientId: string;
    clientName: string;
    clientPhone: string;

    //
    enderecos: Endereco[];

    //
    vehicleId: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehiclePlate: string;

    //
    scheduledAt: string;
    description?: string;
    status: "AGENDADO" | "CANCELADO" | "CONCLUIDO";
    createdAt: string;
}

const mapRow = (a: any): Appointment => ({
    id: String(a.agendamento_id),
    userId: String(a.usuario_id),
    userName: a.usuario_nome,

    clientId: String(a.cliente_id),
    clientName: a.cliente_nome,
    clientPhone: a.cliente_telefone,

    enderecos: (a.enderecos ?? []).map((e: any) => ({
        endereco_id: e.endereco_id,
        cep: e.cep,
        logradouro: e.logradouro,
        numero: e.numero,
        bairro: e.bairro,
        cidade: e.cidade,
        estado: e.estado,
        complemento: e.complemento,
    })),

    vehicleId: String(a.veiculo_id),
    vehicleBrand: a.veiculo_marca,
    vehicleModel: a.veiculo_modelo,
    vehiclePlate: a.veiculo_placa,

    scheduledAt: a.data_agendada,
    description: a.descricao_servico,
    status: a.status,
    createdAt: a.criado_em,
});

export const appointmentService = {
    getAll: async (search?: string, status?: string): Promise<Appointment[]> => {
        const params = new URLSearchParams();
        if (search) params.append("q", search);
        if (status && status !== "Todos") params.append("status", status);

        const query = params.toString() ? `?${params.toString()}` : "";
        const raw: any[] = await api.get(`/appointments${query}`);
        return raw.map(mapRow);
    },

    getById: async (id: string): Promise<Appointment> => {
        const raw: any = await api.get(`/appointments/${id}`);
        return mapRow(raw);
    },

    create: async (payload: {
        cliente_id: string;
        veiculo_id: string;
        usuario_id: string;
        data_agendada: string;
        descricao_servico?: string;
    }): Promise<{ agendamento_id: number; message: string }> => {
        return api.post("/appointments", payload);
    },
};