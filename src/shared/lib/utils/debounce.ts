// https://doka.guide/js/debounce/#pishem-debounce

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    callee: F,
    timeoutMs: number
) {
    let lastCall: number | undefined
    let lastCallTimer: ReturnType<typeof setTimeout>

    return function perform(this: any, ...args: Parameters<F>): void {
        const now = Date.now()
        if (lastCall && now - lastCall <= timeoutMs) {
            clearTimeout(lastCallTimer)
        }

        lastCall = now
        lastCallTimer = setTimeout(() => callee.apply(this, args), timeoutMs)
    }
}
