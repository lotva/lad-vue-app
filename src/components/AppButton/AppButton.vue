<template>
    <button
        class="button"
        type="button"
    >
        <span class="button__text">
            <slot></slot>
        </span>
    </button>
</template>

<style scoped>
    .button {
        --background-opacity: 1;

        cursor: pointer;
        user-select: none;

        display: inline-block;

        padding: 0.75em 1em 0.7em;

        font-family: inherit;
        font-size: inherit;
        font-weight: 400;
        line-height: inherit;
        color: rgb(var(--color-background--surface));
        text-decoration: none;

        background-color: rgba(var(--color-text) / var(--background-opacity));
        border: 0;
        border-radius: 5px;

        &:hover {
            --background-opacity: 0.75;
        }

        &:focus-visible {
            outline: 4px solid rgb(var(--color-background--page));
        }
    }

    .button__text {
        &::before {
            content: '';
            display: table;
            margin-block-end: calc(-0.343em - (1em * var(--leading) - 1em) / 2);
        }

        &::after {
            content: '';
            display: table;
            margin-block-start: calc(-0.117em - (1em * var(--leading) - 1em) / 2);
        }
    }
</style>
