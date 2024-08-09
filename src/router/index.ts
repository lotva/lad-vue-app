import { createRouter, createWebHistory } from 'vue-router'

import WeatherView from '@/views/WeatherView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/weather',
            component: WeatherView,
            name: 'WeatherRoute',
            meta: {
                title: 'Погода',
                description:
                    'Приложение взаимодействует с OpenWeatherMap API и выводит погоду по названию города.',
            },
        },
    ],
})

export default router
