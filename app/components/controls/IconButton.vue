<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <NuxtLink :href="href"  :rel="rel" :target="target" class="link" />
</template>

<script setup lang="ts">
defineProps({
    href: {
        type: String,
        default: ""
    },
    rel: {
        type: String,
        default: null,
        required: false
    },
    target: {
        type: String,
        default: undefined,
        required: false
    }
});
</script>

<style scoped>
.link {
    width: 40px;
    height: 40px;

    background-size: contain;
    filter: invert(100%) brightness(50%);

    text-decoration: none !important;

    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.link::before {
    text-decoration: none;
}

.link::before:hover {
    text-decoration: none;
}

.link:hover {
    filter: invert(100%) brightness(0%);

    text-decoration: none;
    box-shadow: none;
}

.dark-mode .link:hover {
    filter: invert(100%) brightness(100%);
}
</style>