<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue'
    import { useArticlesStore, type Article } from '@/stores/articlesStore'
    import { useRoute, useRouter } from 'vue-router'

    import AppTitle from '../AppTitle.vue'
    import { AppButton } from '../AppButton'
    import { formatRuDate } from '@/shared/lib/utils/formatRuDate'

    const articlesStore = useArticlesStore()
    const route = useRoute()
    const router = useRouter()

    const article = ref<Article | null>(null)
    const editMode = ref<boolean>(false)
    defineProps<{ id: number }>()

    const formattedDate = computed<string | undefined>(() => {
        if (article.value?.date) {
            return formatRuDate(new Date(article.value?.date))
        }
        return undefined
    })

    const title = ref<string>('')
    const summary = ref<string>('')
    const content = ref<string>('')

    function fetchArticle() {
        const fetchedArticle = articlesStore.getArticleById(Number(route.params.id))

        if (fetchedArticle) {
            article.value = fetchedArticle

            title.value = fetchedArticle.title
            summary.value = fetchedArticle.summary
            content.value = fetchedArticle.content
        } else {
            console.error('Article not found')
        }
    }

    function editArticle() {
        editMode.value = true
    }

    async function deleteArticleById(id: number) {
        await articlesStore.deleteArticle(id)

        router.push('/articles')
    }

    function saveChanges(id: number) {
        articlesStore.editArticle(id, {
            title: title.value,
            content: content.value,
        })

        editMode.value = false
    }

    function cancelChanges() {
        editMode.value = false
    }

    watch(route, () => {
        fetchArticle()
    })

    onMounted(() => {
        fetchArticle()
    })
</script>

<template>
    <AppTitle v-if="!editMode">{{ title }}</AppTitle>

    <div
        v-if="editMode"
        class="article-detail__edit main__section"
    >
        <input
            v-model="title"
            class="article-detail__input"
            type="text"
        />

        <textarea
            v-model="summary"
            class="article__textarea"
            rows="3"
        ></textarea>

        <textarea
            v-model="content"
            class="article__textarea"
            rows="6"
        ></textarea>

        <div class="article-detail__buttons">
            <AppButton
                class="article-detail__button"
                @click="saveChanges(id)"
            >
                Сохранить
            </AppButton>
            <AppButton
                class="article-detail__button"
                @click="cancelChanges"
            >
                Отменить
            </AppButton>
        </div>
    </div>

    <div
        v-else
        class="article-detail__view"
    >
        <p class="article-detail__summary">{{ summary }}</p>
        <p class="article-detail__content">{{ content }}</p>
        <small class="article-detail__date note">{{ formattedDate }}</small>

        <div class="article-detail__buttons">
            <AppButton
                class="post-detail__button"
                @click="editArticle"
            >
                Редактировать
            </AppButton>
            <AppButton
                class="post-detail__button"
                @click="deleteArticleById(id)"
            >
                Удалить
            </AppButton>
        </div>
    </div>
</template>

<style scoped>
    .article-detail__edit {
        display: flex;
        flex-direction: column;
        row-gap: calc(var(--gap) / 2);
    }

    .article-detail__input {
        --leading: 0.95;

        inline-size: 100%;
        font-size: 2em;
        letter-spacing: -0.04em;
        word-spacing: -0.02em;

        @media (width >= 800px) {
            font-size: 3em;
        }
    }

    .article__textarea {
        display: block;
        inline-size: var(--paragraph-width);
        max-inline-size: 100%;
    }

    .article-detail__view {
        display: flex;
        flex-direction: column;
        row-gap: calc(var(--gap) * 2);
        margin-block-start: calc(var(--gap) * 2);
    }

    .article-detail__summary,
    .article-detail__content {
        max-inline-size: var(--paragraph-width);
    }

    .article-detail__summary {
        --leading: 1;

        font-size: 2em;
        line-height: var(--leading);
        letter-spacing: -0.03em;
    }

    .article-detail__buttons {
        display: flex;
        flex-wrap: wrap;
        gap: calc(var(--gap) / 2);
    }
</style>
