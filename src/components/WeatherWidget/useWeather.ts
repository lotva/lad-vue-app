import { ref, watch } from 'vue'
import { debounce } from '@/shared/lib/utils/debounce'

import axios from 'axios'

const API_KEY = '9ea1b8e6e8a329326dde2168fd5ce137'

export function useWeather() {
    const city = ref<string>(localStorage.getItem('city') || 'Москва')
    watch(city, (newValue) => {
        localStorage.setItem('city', newValue)
    })

    const isLoading = ref<boolean>(false)
    const geo = ref<{ lat: string; lon: string }>({} as { lat: string; lon: string })

    const weatherData = ref<any>()
    weatherData.value = JSON.parse(localStorage.getItem('weatherData') || 'null')
    watch(weatherData, (newValue) => {
        localStorage.setItem('weatherData', JSON.stringify(newValue))
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

            geo.value = {
                lat: data[0].lat,
                lon: data[0].lon,
            }

            return geo.value
        } catch (err) {
            console.log(`Ошибка при получении геопозиции: ${err}`)
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
            weatherData.value = weather
        } catch (err) {
            console.log(`Ошибка при получении погоды: ${err}`)
        }
    }

    const fetchWeatherData = async () => {
        isLoading.value = true
        try {
            const position = await getCityPosition()
            if (position) {
                await getCityWeather(position)
            } else {
                weatherData.value = null
            }
        } finally {
            isLoading.value = false
        }
    }

    const debouncedFetchWeatherData = debounce(fetchWeatherData, 500)

    return {
        isLoading,
        city,
        weatherData,
        debouncedFetchWeatherData,
    }
}
