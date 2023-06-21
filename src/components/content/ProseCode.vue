<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div class="code-block .monospaced">
        <slot />
    </div>
</template>

<style scoped>
.code-block {
    display: block;

    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #FFA657 transparent;
}
</style>
