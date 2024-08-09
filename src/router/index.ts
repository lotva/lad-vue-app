import { createRouter, createWebHistory } from 'vue-router'

import RootView from '@/views/RootView.vue'
import WeatherView from '@/views/WeatherView.vue'
import ArticlesView from '@/views/ArticlesView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: RootView,
            name: 'RootRoute',
            meta: {
                title: 'Вью-блог',
                description: 'Приложение на Вью с разделами «Погода» и «Статьи»',
                navigation: true,
            },
        },
        {
            path: '/weather',
            component: WeatherView,
            name: 'WeatherRoute',
            meta: {
                title: 'Погода',
                description:
                    'Приложение взаимодействует с OpenWeatherMap API и выводит погоду по названию города.',
                navigation: true,
                isSection: true,
            },
        },
        {
            path: '/articles',
            component: ArticlesView,
            name: 'ArticlesRoute',
            meta: {
                title: 'Статьи',
                description: 'Приложение выводит список статей.',
                navigation: true,
                isSection: true,
            },
        },
    ],
})

router.beforeEach((to) => {
    const { title, description } = to.meta as { title?: string; description?: string }

    const defaultTitle = 'Вью-блог'
    const defaultDescription = 'Приложение на Вью с разделами «Погода» и «Статьи»'

    document.title = title || defaultTitle

    const descriptionElement = document.querySelector('head meta[name="description"]')
    if (descriptionElement) {
        descriptionElement.setAttribute('content', description || defaultDescription)
    }
})

export default router
