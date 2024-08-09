<script setup lang="ts">
    import AppMenu from './AppMenu.vue'
    import { WeatherAside } from './WeatherWidget'
</script>

<template>
    <header class="header">
        <AppMenu></AppMenu>
        <WeatherAside></WeatherAside>
    </header>
</template>

<style scoped>
    .header {
        --color-text: var(--color-note);
        --link-color: var(--color-note);

        display: flex;
        flex-wrap: wrap;
        gap: calc(var(--gap) * 2);
        align-content: flex-start;
        justify-content: space-between;

        block-size: 20vb;
        padding-block-start: calc(var(--gap) * 2);

        color: rgb(var(--color-text));

        @media (width <= 800px) {
            justify-content: center;
            text-align: center;
        }
    }
</style>
