<script setup lang="ts">
    import AppButton from './AppButton.vue'
</script>

<template>
    <AppButton class="button--process">
        <slot></slot>
        <span class="button__spinner spinner">
            <span class="spinner__item"></span>
            <span class="spinner__item"></span>
            <span class="spinner__item"></span>
            <span class="spinner__item"></span>
        </span>
    </AppButton>
</template>

<style scoped>
    .button__spinner {
        position: absolute;
        inset-block-start: 50%;
        inset-inline-start: auto;
        inset-inline-end: 1.7rem;

        margin: -0.5em;

        opacity: 0;
    }

    .spinner {
        line-height: 1.15;

        transition-delay: 0s, 0.2s;
        transition-timing-function: ease-in, ease;
        transition-duration: 0.2s, 0.2s;
        transition-property: padding, opacity;
    }

    .spinner__item {
        position: absolute;
        inset-block-start: 0.15rem;
        inset-inline-end: 0;

        display: inline-block;

        inline-size: 1rem;
        block-size: 1rem;

        opacity: 1;
        border: 3.4px solid #888;
        border-color: #888 transparent transparent transparent;
        border-radius: 50%;

        animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

        &:nth-child(1) {
            animation-delay: 0.45s;
        }

        &:nth-child(2) {
            animation-delay: 0.3s;
        }

        &:nth-child(3) {
            animation-delay: 0.15s;
        }
    }
</style>
