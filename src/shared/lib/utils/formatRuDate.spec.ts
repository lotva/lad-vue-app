import { it, expect } from 'vitest'

import { formatRuDate } from './formatRuDate'

it('formats numbers correctly', () => {
    const date = new Date(2023, 0, 10)
    expect(formatRuDate(date)).toBe('10 января 2023')
})
