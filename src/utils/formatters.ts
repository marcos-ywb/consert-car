export function formatDatetime(dateTime: string | null | undefined, onlyTime: boolean): string {
    if (!dateTime) return '—';

    const date = new Date(dateTime);

    if (isNaN(date.getTime())) {
        return 'Data inválida';
    }

    if (!onlyTime) {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    } else {
        return new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }
}

export function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 11) {
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

export function formatCEP(value: string): string {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function formatPlate(value: string): string {
    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (/^[A-Z]{3}\d{4}$/.test(clean)) {
        return clean.replace(/([A-Z]{3})(\d{4})/, "$1-$2");
    }
    return clean;
}

export function formatAppointmentStatus(value: string): string {
    let result: string = "";

    value === "AGENDADO" ? result = "Agendado"
        : value === "CANCELADO" ? result = "Cancelado"
            : result = "Concluído"

    return result;
}

export function formatRoleName(role: string): string {
    const ROLE_DISPLAY: Record<string, string> = {
        OWNER: "Proprietário",
        ADMIN: "Administrador",
        MECANICO: "Mecânico",
        ATENDENTE: "Atendente"
    };

    return ROLE_DISPLAY[role] || "Usuário";
}