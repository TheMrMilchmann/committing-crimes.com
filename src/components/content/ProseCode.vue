<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <span>
        <code class="inline-code">
            <slot />
        </code>
    </span>
</template>

<style scoped>
.inline-code {
    font-size: 85%;
    padding: 0.2em 0.4em;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 6px;
}

.dark-mode > .inline-code {
    background-color: rgba(110, 118, 129, 0.7);
}
</style>