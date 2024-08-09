<script setup lang="ts">
    import AppCard from '@/components/AppCard.vue'

    import { useRouter } from 'vue-router'
    import { computed } from 'vue'

    const router = useRouter()

    const sectionRoutes = computed(() => {
        return router.getRoutes().filter((route) => route.meta.isSection)
    })
</script>

<template>
    <section>
        <ul class="routes">
            <li
                v-for="route in sectionRoutes"
                :key="route.path"
            >
                <AppCard :route="route"></AppCard>
            </li>
        </ul>
    </section>
</template>

<style scoped>
    .routes {
        display: grid;
        gap: var(--gap);

        @media (width >= 800px) {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>
