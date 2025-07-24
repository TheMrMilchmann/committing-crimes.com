<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div class="footer-container">
        <div class="footer-icon-row">
            <IconButton href="https://github.com/TheMrMilchmann" target="_blank" class="icon-github" />
            <IconButton href="https://www.linkedin.com/in/leon-linhart/" target="_blank" class="icon-linkedin" />
            <IconButton href="https://mastodon.social/@themrmilchmann" target="_blank" class="icon-mastodon" />
            <IconButton href="https://twitch.tv/themrmilchmann" target="_blank" class="icon-twitch" />
            <IconButton href="https://www.youtube.com/@TheMrMilchmann" target="_blank" class="icon-youtube" />
        </div>
    </div>
</template>

<style scoped>
.footer-container {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.footer-icon-row {
    display: flex;
    flex-direction: row;
    gap: 12px;
}

.icon-github {
    background-image: url("@/assets/icons/github.svg");
}

.icon-linkedin {
    background-image: url("@/assets/icons/linkedin.svg");
}

.icon-mastodon {
    background-image: url("@/assets/icons/mastodon.svg");
}

.icon-twitch {
    background-image: url("@/assets/icons/twitch.svg");
}

.icon-youtube {
    background-image: url("@/assets/icons/youtube.svg");
}
</style>