import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import WeatherWidget from './WeatherWidget.vue'
import axios from 'axios'

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
        setActivePinia(createPinia())
        wrapper = mount(WeatherWidget)
    })

    it('displays message when there is no data', async () => {
        expect(wrapper.find('p').text()).toBe('Данные не найдены.')
    })

    it('updates city field value when input text changes', async () => {
        await wrapper.find('input').setValue('Гродно')
        expect(wrapper.vm.city).toBe('Гродно')
    })

    it('calls API when input text changes', async () => {
        const spy = vi.spyOn(wrapper.vm, 'debouncedFetchWeatherData')

        await wrapper.find('input').setValue('Гродно')
        expect(spy).toHaveBeenCalled()
    })

    it('triggers loading state on API call', async () => {
        await wrapper.find('input').setValue('Гродно')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isLoading).toBe(true)
    })

    it('shows an error message when the API call fails', async () => {
        ;(axios.get as Mock).mockRejectedValueOnce(new Error('Network Error'))

        await wrapper.find('input').setValue('Гродно')
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('АПИ не ответил на запрос.')
    })
})
