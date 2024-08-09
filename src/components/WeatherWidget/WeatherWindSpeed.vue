<script setup lang="ts">
    import { useFormattedWeather } from './useFormattedWeather'

    const { computedWindSpeed } = useFormattedWeather()
</script>

<template>{{ computedWindSpeed }}&thinsp;м/с</template>
