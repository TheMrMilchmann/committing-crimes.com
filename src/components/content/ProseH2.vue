<!--
  - Copyright (c) 2023-2024 Leon Linhart
  - All rights reserved.
  -->
<template>
    <h2 :id="id">
        <CCLink v-if="id && generate" :href="`#${id}`">
            <slot />
        </CCLink>
        <slot v-else />
    </h2>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const props = defineProps<{ id?: string }>()

const { headings } = config.public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>