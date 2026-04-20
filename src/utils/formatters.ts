export function formatDatetime(dateTime: string | null | undefined): string {
    // 1. Handle null, undefined, or empty strings
    if (!dateTime) return '—';

    const date = new Date(dateTime);

    // 2. Handle strings that aren't valid dates (e.g., "hello")
    if (isNaN(date.getTime())) {
        return 'Data inválida';
    }

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}