<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div class="row">
        <div class="container">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.row {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container {
    max-width: 920px;
    width: 100%;
}
</style>