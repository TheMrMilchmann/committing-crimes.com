<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
html {
    scroll-behavior: smooth;
}

.page-enter-active,
.page-leave-active {
    transition: opacity 120ms;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
}
</style>