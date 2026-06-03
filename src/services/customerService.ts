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

export interface Veiculo {
    veiculo_id: number;
    placa: string;
    marca: string;
    modelo: string;
    ano?: number;
    cor?: string;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    cpf?: string;
    vehicles: number;
    enderecos: Endereco[];
    veiculos: Veiculo[];
}

const mapRows = (raw: any[]): Customer[] => {
    const map = new Map<string, Customer>();

    raw.forEach(c => {
        const id = String(c.cliente_id);

        if (!map.has(id)) {
            map.set(id, {
                id,
                name: c.nome,
                phone: c.telefone,
                cpf: c.cpf,
                vehicles: 0,
                enderecos: [],
                veiculos: [],
            });
        }

        const customer = map.get(id)!;

        if (c.endereco_id && !customer.enderecos.find(e => e.endereco_id === c.endereco_id)) {
            customer.enderecos.push({
                endereco_id: c.endereco_id,
                cep: c.cep,
                logradouro: c.logradouro,
                numero: c.numero,
                bairro: c.bairro,
                cidade: c.cidade,
                estado: c.estado,
                complemento: c.complemento,
            });
        }

        if (c.veiculo_id && !customer.veiculos.find(v => v.veiculo_id === c.veiculo_id)) {
            customer.veiculos.push({
                veiculo_id: c.veiculo_id,
                placa: c.placa,
                marca: c.marca,
                modelo: c.modelo,
                ano: c.ano,
                cor: c.cor,
            });
        }

        customer.vehicles = customer.veiculos.length;
    });

    return Array.from(map.values());
};

export const customerService = {
    getAll: async (search?: string): Promise<Customer[]> => {
        const query = search ? `?q=${encodeURIComponent(search)}` : "";
        const raw: any[] = await api.get(`/customers${query}`);
        return mapRows(raw);
    },

    getById: async (id: string): Promise<Customer> => {
        const raw: any[] = await api.get(`/customers/${id}`);
        return mapRows(raw)[0];
    },

    create: async (data: {
        nome: string;
        telefone: string;
        cpf: string;
        endereco: {
            cep: string;
            logradouro: string;
            numero: string;
            bairro: string;
            cidade: string;
            estado: string;
            complemento?: string;
        };
        veiculo: {
            placa: string;
            marca: string;
            modelo: string;
            ano: string;
            cor: string;
        };
    }): Promise<{ cliente_id: number; message: string }> => {
        return api.post("/customers", data);
    },

    update: async (id: string, customer: Partial<Customer>): Promise<Customer> => {
        return api.put<Customer>(`/customers/${id}`, customer);
    },

    delete: async (id: string): Promise<void> => {
        return api.delete<void>(`/customers/${id}`);
    },
};