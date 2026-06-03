import api from "./api";

export interface Vehicle {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year?: number;
    color?: string;
    ownerId: string;
    ownerName: string;
}

export const vehicleService = {
    getAll: async (search?: string): Promise<Vehicle[]> => {
        const query = search ? `?q=${encodeURIComponent(search)}` : "";
        const raw: any[] = await api.get(`/vehicles${query}`);

        return raw.map(v => ({
            id: String(v.veiculo_id),
            plate: v.placa,
            brand: v.marca,
            model: v.modelo,
            year: v.ano,
            color: v.cor,
            ownerId: String(v.cliente_id),
            ownerName: v.proprietario,
        }));
    },

    getById: async (id: string): Promise<Vehicle> => {
        const v: any = await api.get(`/vehicles/${id}`);
        return {
            id: String(v.veiculo_id),
            plate: v.placa,
            brand: v.marca,
            model: v.modelo,
            year: v.ano,
            color: v.cor,
            ownerId: String(v.cliente_id),
            ownerName: v.proprietario,
        };
    },
};