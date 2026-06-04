type Role = "OWNER" | "ADMIN" | "MECANICO" | "ATENDENTE";

const ROUTE_PERMISSIONS: Record<string, Role[]> = {
    OS: ["OWNER", "ADMIN", "MECANICO"],
    Admin: ["OWNER", "ADMIN"],
    Veículos: ["OWNER", "ADMIN", "MECANICO", "ATENDENTE"],
    Clientes: ["OWNER", "ADMIN", "MECANICO", "ATENDENTE"],
    Agenda: ["OWNER", "ADMIN", "MECANICO", "ATENDENTE"],
};

export function canAccess(route: string, role?: string): boolean {
    if (!role) return false;
    return ROUTE_PERMISSIONS[route]?.includes(role as Role) ?? true;
}