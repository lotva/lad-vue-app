export function formatRuDate(date: Date): string {
    return date
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        .replace(' г.', '')
}
