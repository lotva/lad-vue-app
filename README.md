# Приложение на Вью для «Академии Лад»

[![Prettier](https://github.com/lotva/lad-vue-app/actions/workflows/prettier.yaml/badge.svg)](https://github.com/lotva/lad-vue-app/actions/workflows/prettier.yaml)
[![Stylelint](https://github.com/lotva/lad-vue-app/actions/workflows/stylelint.yaml/badge.svg)](https://github.com/lotva/lad-vue-app/actions/workflows/stylelint.yaml)
[![ESLint](https://github.com/lotva/lad-vue-app/actions/workflows/eslint.yaml/badge.svg)](https://github.com/lotva/lad-vue-app/actions/workflows/eslint.yaml)

Показывает погоду и список статей.

## Погода

Компонент погоды основан на том, что показано на мастер-классе. Логика работы с АПИ вынесена в Composable, сами показатели погоды лежат в `weatherStore` Pinia. Глобальное хранилище используется, чтобы выводить погоду в хедер.

## Статьи

Статьи описаны прямо в хранилище — это набор строк с уникальным айди, который лежит в localStorage. Статьи можно редактировать и удалять.

В дальнейшем будет удобно перевести текст статей в человекочитаемый формат типа Маркдауна. Плюс к тому — реализовать функцию добавления.

Навигация между основными страницами сделана с помощью `vue-router`.

## Технологии

### Как развернуть сайт локально

Что нужно сделать:

1. Установить зависимости: `npm i`.
2. Запустить локальный сервер: `npm run dev`.

Сайт будет пересобираться при редактировании кода.

### Форматирование и линтеры

О поддержании порядка в форматировании думать не надо, оно само. Новый код приводится к единому стилю во время коммита через `simple-git-hooks` и [`nano-staged`](https://github.com/usmanyunusov/nano-staged).

### Тесты

Юнит-тестами покрыт виджет погоды и вспомогательные утилиты. Запустить: `npm run test:unit`. (В дальнейшем важно дописать тесты для работы хранилища и компонентов статьи.)

### Работа со стилями

Стили собирает и обрабатывает [Lightning CSS](https://lightningcss.dev).

Методология — [БЭМ в варианте Two Dashes](https://ru.bem.info/methodology/naming-convention/#стиль-two-dashes):

```css
.block-name__element-name--modificator {
}
```

БЭМ используется только для именования стилей и комбинируется со `scoped`-подходом Вью.

Используется современный синтаксис медиазапросов и ЦСС-нестинг:

```css
.featured-articles {
    display: grid;

    @media (width >= 810px) {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

ЦСС-правила группируются по смыслу через [`stylelint-config-clean-order`](https://github.com/kutsan/stylelint-config-clean-order).

### ИДЕ

Используйте [VSCode](https://code.visualstudio.com/) и [расширение Vue](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
