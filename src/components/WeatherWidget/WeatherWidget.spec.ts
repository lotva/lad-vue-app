import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import WeatherWidget from './WeatherWidget.vue'

// Mocks

vi.mock('axios', () => ({
    default: {
        get: vi.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ data: [] })
                }, 1000)
            })
        }),
    },
}))

vi.mock('@/shared/lib/utils/debounce', () => ({
    debounce: (fn: Function) => fn,
}))

// Tests

describe('WeatherWidget', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(WeatherWidget)
    })

    it('displays message when there is no data', async () => {
        expect(wrapper.find('p').text()).toBe('Данные не найдены.')
    })

    it('updates city field value when input text changes', async () => {
        const input = wrapper.find('input')
        await input.setValue('Гродно')
        expect(wrapper.vm.city).toBe('Гродно')
    })

    it('calls API when input text changes', async () => {
        const input = wrapper.find('input')
        const spy = vi.spyOn(wrapper.vm, 'debouncedFetchWeatherData')
        await input.setValue('Гродно')
        expect(spy).toHaveBeenCalled()
    })

    it('triggers loading state on API call', async () => {
        const input = wrapper.find('input')
        await input.setValue('Гродно')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isLoading).toBe(true)
    })
})
