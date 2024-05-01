<!--
  - Copyright (c) 2023-2024 Leon Linhart
  - All rights reserved.
  -->
<template>
  <div class="header-container">
      <CCLink href="/"><span class="site-title monospaced">Committing Crimes</span></CCLink>
      <div class="navigation-row">
          <CCLink href="/">Articles</CCLink>
          <CCLink href="/projects">Projects</CCLink>
          <CCLink href="/preferences">Preferences</CCLink>
          <CCLink href="/about">About</CCLink>
      </div>
  </div>
</template>

<style scoped>
.navigation-row {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 16px;

    margin-top: 8px;
}

.site-title {
    font-size: 2.5em;
    user-select: none;
}

.header-container {
    display: flex;
    align-items: center;
    flex-direction: column;

    padding-top: 16px;
    margin-bottom: 48px;
}
</style>