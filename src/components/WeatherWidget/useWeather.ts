import { ref, watch } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

import { debounce } from '@/shared/lib/utils/debounce'

import axios from 'axios'
const API_KEY = '9ea1b8e6e8a329326dde2168fd5ce137'

export function useWeather() {
    const weatherStore = useWeatherStore()

    const city = ref<string>(localStorage.getItem('city') || '')
    const defaultCity = 'Гродно'
    const geo = ref<{ lat: string; lon: string }>({} as { lat: string; lon: string })

    const isLoading = ref<boolean>(false)
    const errorMessage = ref<string>('')

    watch(city, (newValue) => {
        localStorage.setItem('city', newValue)
    })

    const getCityPosition = async () => {
        try {
            const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
                params: {
                    q: city.value,
                    limit: 1,
                    appid: API_KEY,
                },
            })

            if (!data.length) {
                return null
            }

            weatherStore.setWeatherData({
                cityName: data[0].local_names?.ru || data[0].name,
            })

            geo.value = {
                lat: data[0].lat,
                lon: data[0].lon,
            }

            return geo.value
        } catch (err) {
            errorMessage.value = 'АПИ не ответил на запрос. Попробуйте включить ВПН.'
            return null
        }
    }

    const getCityWeather = async ({ lat, lon }: { lat: string; lon: string }) => {
        try {
            const { data: weather } = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather',
                {
                    params: {
                        lat: lat,
                        lon: lon,
                        units: 'metric',
                        lang: 'ru',
                        appid: API_KEY,
                    },
                }
            )

            if (weather) {
                weatherStore.setWeatherData({
                    temperature: weather.main.temp,
                    description: weather.weather[0].description,
                    windSpeed: weather.wind.speed,
                })
            }
        } catch (err) {
            console.log(`Ошибка при получении погоды: ${err}`)
        }
    }

    const fetchWeatherData = async () => {
        if (!city.value) {
            return
        }

        isLoading.value = true

        try {
            const position = await getCityPosition()
            if (position) {
                await getCityWeather(position)
            } else {
                weatherStore.clearWeatherData()
            }
        } finally {
            isLoading.value = false
        }
    }

    const debouncedFetchWeatherData = debounce(fetchWeatherData, 500)

    return {
        isLoading,
        errorMessage,
        city,
        defaultCity,
        debouncedFetchWeatherData,
    }
}
