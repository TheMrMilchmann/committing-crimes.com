<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
    <CCLink :href="href" :target="target">
        <slot />
    </CCLink>
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