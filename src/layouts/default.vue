<!--
  - Copyright (c) 2023-2024 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div class="layout-container">
        <div class="layout-column">
            <DefaultHeader />

            <slot />

            <DefaultFooter class="footer" />
        </div>
    </div>
</template>

<style scoped>
.layout-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-left: 8px;
    padding-right: 8px;
}

.layout-column {
    display: flex;
    flex-direction: column;
    max-width: 920px;
    width: 100%;
    height: 100%;
}

.footer {
    margin-top: auto;
    padding-top: 48px;
    padding-bottom: 12px;
}
</style>