<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div class="footer-container">
        <div class="footer-icon-row">
            <IconButton href="https://github.com/TheMrMilchmann" rel="me" target="_blank" class="icon-github" label="Visit TheMrMilchmann's profile on GitHub" />
            <IconButton href="https://www.linkedin.com/in/leon-linhart/" rel="me" target="_blank" class="icon-linkedin" label="Visit Leon Linhart on LinkedIn" />
            <IconButton href="https://mastodon.social/@themrmilchmann" rel="me" target="_blank" class="icon-mastodon" label="Visit @TheMrMilchmann on Mastodon" />
            <IconButton href="https://twitch.tv/themrmilchmann" rel="me" target="_blank" class="icon-twitch" label="Visit TheMrMilchmann on Twitch" />
            <IconButton href="https://www.youtube.com/@TheMrMilchmann" rel="me" target="_blank" class="icon-youtube" label="Visit @TheMrMilchmann on YouTube" />
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