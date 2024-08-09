<script setup lang="ts">
    import { useWeather } from './useWeather'

    const { city, weatherData, debouncedFetchWeatherData } = useWeather()
</script>

<template>
    <section class="weather">
        <form
            class="weather__form"
            @submit.prevent=""
        >
            <input
                v-model="city"
                class="weather__input"
                type="text"
                placeholder="Гродно"
                @input="debouncedFetchWeatherData"
            />
            <button
                class="visually-hidden"
                @click="debouncedFetchWeatherData"
            >
                Узнать
            </button>
        </form>
        <div class="weather__meta">
            <dl
                v-if="weatherData"
                class="weather__list"
            >
                <div class="weather__section">
                    <dt>Температура</dt>
                    <dd>{{ weatherData.main.temp }}&thinsp;°C</dd>
                </div>
                <div class="weather__section">
                    <dt>Облачность</dt>
                    <dd>
                        {{ weatherData.weather[0].description }}
                    </dd>
                </div>
                <div class="weather__section">
                    <dt>Ветер</dt>
                    <dd>{{ weatherData.wind.speed }}&thinsp;м/c</dd>
                </div>
            </dl>
            <p v-else>Данные не найдены.</p>
        </div>
    </section>
</template>

<style scoped>
    /* Weather */

    .weather {
        display: flex;
        flex-direction: column;
        gap: calc(var(--gap) * 3);
        justify-content: flex-start;
    }

    .weather__form {
        display: flex;
        flex-wrap: wrap;
        gap: calc(var(--gap) / 2);
    }

    .weather__list {
        --leading: 1;

        display: grid;
        row-gap: calc(var(--gap) * 3);
        line-height: var(--leading);

        @media (width >= 800px) {
            font-size: 2em;
            letter-spacing: -0.03em;
        }
    }

    .weather__section {
        display: grid;
        grid-template-columns: 7em 1fr;
        gap: var(--gap) calc(var(--gap) * 2);

        padding-block-start: var(--gap);

        border-block-start: 1px solid rgba(var(--color-border));
    }

    .weather__input {
        --leading: 0.95;

        inline-size: 100%;
        margin-block-start: var(--gap);
        margin-inline-start: -4px;

        font-size: 2em;
        letter-spacing: -0.04em;
        word-spacing: -0.02em;

        @media (width >= 800px) {
            font-size: 4em;
        }
    }

    .weather__meta {
        display: flex;
        flex-direction: column;
        row-gap: var(--gap);
    }
</style>
