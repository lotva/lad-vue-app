<script setup lang="ts">
    import { computed } from 'vue'

    import { formatRuDate } from '@/shared/lib/utils/formatRuDate'

    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    })

    const formattedDate = computed(() => {
        return formatRuDate(new Date(props.date))
    })
</script>

<template>
    <article class="article-card clickable-area">
        <div class="article-card__content">
            <h2 class="article-card__title">{{ title }}</h2>
            <p class="article-card__description note">{{ summary }}</p>
        </div>
        <small class="article-card__date note">
            <RouterLink
                class="clickable-area__link"
                :to="{ name: 'ArticleDetailRoute', params: { id } }"
            >
                {{ formattedDate }}
            </RouterLink>
        </small>
    </article>
</template>

<style scoped>
    .article-card {
        display: flex;
        flex-direction: column;
        row-gap: calc(var(--gap) * 1);

        padding-block: var(--gap) calc(var(--gap) * 3);

        border-block-start: 1px solid rgba(var(--color-border));

        @media (width >= 800px) {
            flex-direction: row;
            column-gap: calc(var(--gap) * 4);
            align-items: flex-start;
            justify-content: space-between;
        }
    }

    .article-card__title {
        font-weight: normal;
        letter-spacing: -0.01em;
    }

    .article-card__content {
        display: grid;
        row-gap: var(--gap);
    }

    .article-card__date {
        flex-shrink: 0;
    }
</style>
