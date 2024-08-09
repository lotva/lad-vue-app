<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { computed } from 'vue'

    const router = useRouter()

    const navigationRoutes = computed(() => {
        return router.getRoutes().filter((route) => route.meta.navigation)
    })
</script>

<template>
    <nav class="menu">
        <ul class="menu__list">
            <li
                v-for="route in navigationRoutes"
                :key="route.path"
                class="metrics-fix"
            >
                <RouterLink
                    class="menu__link"
                    active-class="menu__link--active"
                    exact-active-class="menu__link--exact"
                    :to="route.path"
                >
                    {{ route.meta.title }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
    .menu__list {
        display: flex;
        gap: var(--gap);
        align-items: flex-start;
    }

    .menu__link {
        text-underline-offset: 0.4em;
    }

    .menu__link--active {
        --link-underline-opacity: 1;
    }

    .menu__link--exact {
        --link-underline: none;

        cursor: default;
    }
</style>
