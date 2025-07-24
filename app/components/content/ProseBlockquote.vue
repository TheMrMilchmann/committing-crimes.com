<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <blockquote>
        <slot />
    </blockquote>
</template>

<style scoped>
blockquote {
    margin: 0;
    padding-left: 20px;
    border-left: 0.25rem solid var(--highlight-color);
}

blockquote > * {
    opacity: 0.75;
}
</style>