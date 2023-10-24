<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
  <div class="header-container">
      <CCLink href="/"><span class="site-title monospaced">Committing Crimes</span></CCLink>
<!--      <div class="navigation-row">-->
<!--          <NuxtLink href="/">Articles</NuxtLink>-->
<!--      </div>-->
  </div>
</template>

<style scoped>
/*.navigation-row {*/
/*    align-items: center;*/
/*    display: flex;*/
/*    flex-direction: row;*/
/*    gap: 16px;*/
/*}*/

.site-title {
    font-size: 2.5em;
}

.header-container {
    display: flex;
    align-items: center;
    flex-direction: column;

    padding-top: 16px;
    margin-bottom: 48px;
}
</style>