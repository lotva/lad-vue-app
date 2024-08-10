<script setup lang="ts">
    import ArticleCard from './ArticleCard.vue'

    import { ref, computed, onMounted } from 'vue'
    import { useArticlesStore, type Article } from '@/stores/articlesStore'

    const articlesStore = useArticlesStore()
    const articles = ref<Article[]>([])

    const isLoading = ref<boolean>(false)

    const sortedArticles = computed<Article[]>(() => {
        return articles.value
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })

    function fetchArticles() {
        isLoading.value = true

        articles.value = articlesStore.getArticles
        console.log(articlesStore.getArticles)
    }

    onMounted(() => {
        fetchArticles()
    })
</script>

<template>
    <section>
        <h2 class="visually-hidden">Список записей</h2>

        <ul v-if="sortedArticles">
            <li
                v-for="article in sortedArticles"
                :key="article.id"
            >
                <ArticleCard
                    :id="article.id"
                    :title="article.title"
                    :summary="article.summary"
                    :date="article.date"
                />
            </li>
        </ul>
    </section>
</template>
