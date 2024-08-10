<script setup lang="ts">
    import AppTitle from '@/components/AppTitle.vue'
    import { ArticleList } from '@/components/Article'
</script>

<template>
    <AppTitle>О разработке на Вью</AppTitle>
    <ArticleList class="main__section main__section--articles"></ArticleList>
</template>

<style scoped>
    .main__section--articles {
        margin-block-start: calc(var(--gap) * 4);
    }
</style>
