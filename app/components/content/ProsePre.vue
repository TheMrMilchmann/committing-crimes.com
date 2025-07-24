<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <pre class="code-block .monospaced"><slot /></pre>
</template>

<style scoped>
.code-block {
    display: block;

    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--highlight-color) transparent;
}

.code-block:deep(pre) {
    background-color: transparent;
}

.code-block::-webkit-scrollbar {
    height: 11px;
}

.code-block::-webkit-scrollbar-track {
    background: transparent;
}

.code-block::-webkit-scrollbar-thumb {
    background: var(--highlight-color);
}

.code-block::-webkit-scrollbar-thumb:hover {
    background: var(--highlight-color);
}

/*
.code-block::-webkit-scrollbar-thumb:active {
    background: red;
}
 */
</style>
<script setup lang="ts">
</script>