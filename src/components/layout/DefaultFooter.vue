<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div class="footer-container">
        <div class="footer-icon-row">
            <a href="https://github.com/TheMrMilchmann" class="icon icon-github" />
            <a href="https://www.linkedin.com/in/leon-linhart/" class="icon icon-linkedin" />
            <a href="https://mastodon.social/@themrmilchmann" class="icon icon-mastodon" />
            <a href="https://twitch.tv/themrmilchmann" class="icon icon-twitch" />
            <a href="https://www.youtube.com/@TheMrMilchmann" class="icon icon-youtube" />
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

.icon {
    width: 40px;
    height: 40px;
    background-image: url("@/assets/icons/linkedin.svg");
    background-size: contain;
    filter: invert(100%) brightness(50%);

    transition-duration: 280ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.icon:hover {
    filter: invert(100%) brightness(0%);
}

.dark-mode .icon:hover {
    filter: invert(100%) brightness(100%);
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