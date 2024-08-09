<script setup lang="ts">
    import AppLabel from './components/AppLabel.vue'
    import AppHeader from './components/AppHeader.vue'

    import { useRoute } from 'vue-router'

    const route = useRoute()
</script>

<template>
    <AppHeader class="base__header"></AppHeader>

    <main class="base__main main">
        <AppLabel>
            {{ route.meta.title }}
        </AppLabel>

        <RouterView></RouterView>
    </main>
</template>

<style scoped>
    .main {
        max-inline-size: 1200px;
        min-block-size: 80vb;
        padding-block: calc(var(--gap) * 3) calc(var(--gap) * 4);
        padding-inline-start: 3%;
        padding-inline-end: 3%;

        background-color: rgb(var(--color-background--surface));
        border-start-start-radius: 24px;
        border-start-end-radius: 24px;

        @media (width >= 800px) {
            padding-inline-start: 2%;
            padding-inline-end: 2%;
        }
    }

    .main__section {
        margin-block-start: var(--gap);
    }
</style>
