import { defineStore } from 'pinia'

export interface Article {
    id: number
    title: string
    summary: string
    content: string
    date: string
}

function createArticle(data: Article): Article {
    return { ...data }
}

function initializeData() {
    const sampleArticles = [
        createArticle({
            id: 1,
            title: 'OKLCH в CSS: по­че­му мы ушли от RGB и HSL',
            summary: 'Перевод OKLCH in CSS: why we moved from RGB and HSL из блога Злых марсиан',
            content:
                'В CSS мы чаще всего пишем цвета через rgb() или hex — но так сложилось исторически. Новая спецификация CSS Color 4 позволит нам описывать цвета через новые методы. В этой статье мы расскажем, почему нам больше всего нравится oklch().',
            date: new Date(2023, 0, 10).toString(),
        }),
        createArticle({
            id: 2,
            title: 'Ми­гра­ция с Vue CLI на Vite',
            summary: 'Перевод From Vue CLI to Vite',
            content:
                'Я недавно переносил свои проекты на Vue 2 со стэка Vue CLI и Webpack на Vite. После того, как я сделал это в третий раз, у меня сложилось представление об этом процессе, которое я излагаю в этой статье.',
            date: new Date(2024, 7, 10).toString(),
        }),
    ]

    localStorage.setItem('articles', JSON.stringify(sampleArticles))
}

export const useArticlesStore = defineStore({
    id: 'articlesStore',

    state: () => {
        let articlesString = localStorage.getItem('articles')

        if (!articlesString) {
            initializeData()
            articlesString = localStorage.getItem('articles')
        }

        return {
            articles: articlesString ? (JSON.parse(articlesString) as Article[]) : [],
        }
    },

    actions: {
        addArticle(articleData: Article) {
            const article = createArticle(articleData)
            this.articles.push(article)
            localStorage.setItem('articles', JSON.stringify(this.articles))
        },

        editArticle(articleId: number, updatedArticleData: Partial<Article>) {
            const index = this.articles.findIndex((article: Article) => article.id === articleId)

            if (index === -1) {
                return
            }

            this.articles[index] = { ...this.articles[index], ...updatedArticleData }
            localStorage.setItem('articles', JSON.stringify(this.articles))
        },

        deleteArticle(articleId: number) {
            this.articles = this.articles.filter((article) => article.id !== articleId)
            localStorage.setItem('articles', JSON.stringify(this.articles))
        },
    },

    getters: {
        getArticles(state): Article[] {
            return state.articles
        },

        getArticleById: (state) => (articleId: number) => {
            return state.articles.find((article) => article.id === articleId)
        },
    },
})
