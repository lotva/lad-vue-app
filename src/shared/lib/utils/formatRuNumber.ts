export function formatRuNumber(n: number): string {
    return n.toFixed(1).replace('.', ',')
}
