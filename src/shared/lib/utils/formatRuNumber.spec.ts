import { it, expect } from 'vitest'

import { formatRuNumber } from './formatRuNumber'

it('formats numbers correctly', () => {
    const temperature = 25.62
    expect(formatRuNumber(temperature)).toBe('25,6')
})
