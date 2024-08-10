import { defineStore } from 'pinia'

interface WeatherState {
    cityName?: string | null
    temperature?: number | null
    description?: string | null
    windSpeed?: number | null
}

export const useWeatherStore = defineStore('weatherStore', {
    state: (): WeatherState => ({
        cityName: null,
        temperature: null,
        description: null,
        windSpeed: null,
    }),
    actions: {
        setWeatherData(data: WeatherState) {
            Object.assign(this, data)
        },

        clearWeatherData() {
            Object.assign(this, {
                cityName: null,
                temperature: null,
                description: null,
                windSpeed: null,
            })
        },
    },
})
