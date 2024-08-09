import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { formatRuNumber } from '@/shared/lib/utils/formatRuNumber'

export function useFormattedWeather() {
    const weatherStore = useWeatherStore()

    const computedTemperature = computed(() => {
        if (weatherStore.temperature) {
            return formatRuNumber(weatherStore.temperature)
        }
        return null
    })

    const computedWindSpeed = computed(() => {
        if (weatherStore.windSpeed) {
            return formatRuNumber(weatherStore.windSpeed)
        }
        return null
    })

    return {
        computedTemperature,
        computedWindSpeed,
    }
}
