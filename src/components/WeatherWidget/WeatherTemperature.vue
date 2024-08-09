<script setup lang="ts">
    import { useFormattedWeather } from './useFormattedWeather'

    const { computedTemperature } = useFormattedWeather()
</script>

<template>{{ computedTemperature }}&thinsp;°C</template>
