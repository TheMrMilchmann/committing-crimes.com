<!--
  - Copyright (c) 2023-2024 Leon Linhart
  - All rights reserved.
  -->
<script setup lang="ts">
defineProps({
    href: {
        type: String,
        default: ""
    },
    target: {
        type: String,
        default: undefined,
        required: false
    }
})
</script>

<template>
    <NuxtLink class="link" :href="href" :target="target">
        <slot />
    </NuxtLink>
</template>

<style scoped>
.link {
    position: relative;
    color: var(--link-color);
    text-decoration: none;

    background-image: linear-gradient(currentColor, currentColor);
    background-position: 50% 100%;
    background-repeat: no-repeat;
    background-size: 0 2px;
    transition: background-size .24s, background-position .12s;
}

p > .link {
    color: var(--inline-link-color);
}

.link:hover {
    background-position: 0 100%;
    background-size: 100% 2px;
    transition: background-size .12s, background-position .24s;
}
</style>