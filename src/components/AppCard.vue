<script setup lang="ts">
    import { type RouteRecordNormalized } from 'vue-router'

    defineProps<{
        route: RouteRecordNormalized
    }>()
</script>

<template>
    <article class="card clickable-area">
        <small class="note">
            <RouterLink
                class="clickable-area__link"
                :to="route.path"
            >
                Раздел
            </RouterLink>
        </small>
        <h2 class="card__title">
            {{ route.meta.title }}
        </h2>
        <p class="card__description">
            {{ route.meta.description }}
        </p>
    </article>
</template>

<style scoped>
    .card {
        --leading: 1.3;

        display: grid;
        row-gap: calc(var(--gap) * 1.5);

        padding: calc(var(--gap) * 2) calc(var(--gap)) calc(var(--gap) * 3);

        line-height: VAR(--leading);

        background-color: rgb(var(--color-highlight));
        border-radius: 5px;
    }

    .card__title {
        font-size: 2em;
    }
</style>
