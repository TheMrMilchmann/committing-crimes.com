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
}

p > .link {
    color: var(--inline-link-color);
}

.link::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--link-color);
    transform: scaleX(0);

    transition-duration: 280ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

p > .link::before {
    background-color: var(--inline-link-color);
}

.link:hover::before {
    transform: scaleX(1);
}
</style>