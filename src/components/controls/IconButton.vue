<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
    <NuxtLink :href="href" :target="target" class="link" />
</template>

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
});
</script>

<style scoped>
.link {
    width: 40px;
    height: 40px;

    background-size: contain;
    filter: invert(100%) brightness(50%);

    text-decoration: none !important;

    transition-duration: 280ms;
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