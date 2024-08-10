<template>
    <h1 class="title">
        <slot></slot>
    </h1>
</template>

<style scoped>
    .title {
        --leading: 0.95;

        --gap: calc(0.117em + 0.343em + (1em * var(--leading) - 1em));

        max-inline-size: 17em;
        margin-inline-start: var(--left-adjustment);

        font-size: 2em;
        letter-spacing: -0.04em;
        word-spacing: -0.02em;

        .note + & {
            margin-block-start: var(--gap);
        }

        @media (width >= 800px) {
            font-size: 3em;
        }
    }
</style>
