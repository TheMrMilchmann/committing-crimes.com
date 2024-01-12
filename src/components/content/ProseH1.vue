<!--
  - Copyright (c) 2023-2024 Leon Linhart
  - All rights reserved.
  -->
<template>
    <h1 :id="id">
        <CCLink v-if="generate" :href="`#${id}`">
            <slot />
        </CCLink>
        <slot v-else />
    </h1>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const props = defineProps<{ id?: string }>()

const { headings } = config.public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h1)
</script>