<script setup lang="ts">
    import WeatherTemperature from './WeatherTemperature.vue'

    import { useWeatherStore } from '@/stores/weatherStore'

    const weatherStore = useWeatherStore()
</script>

<template>
    <template v-if="weatherStore.cityName">
        <aside aria-label="Погода сейчас">
            <p>{{ weatherStore.cityName }} — <WeatherTemperature></WeatherTemperature></p>
        </aside>
    </template>
</template>
