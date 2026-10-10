// Convert English digits to Bengali digits
export function toBn(number: number | string): string {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(number).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

// Format with Bengali thousands separator (১,৮৫০)
export function formatBn(number: number): string {
    const formatted = number.toLocaleString('en-IN'); // 1,850
    return toBn(formatted);
}

// Format with টাকা suffix
export function takaBn(number: number): string {
    return `${formatBn(number)} টাকা`;
}

// Format percentage with sign
export function percentBn(pct: number, dir?: string): string {
    const abs = Math.abs(pct);
    const symbol = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';
    return `${symbol} ${toBn(abs)}%`;
}