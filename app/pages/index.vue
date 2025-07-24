<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div>
        <div class="article-list-entry" v-for="article in articles" :key="article.path">
            <span class="monospaced">{{ formatDateString(article.publishedAt) }}</span>

            <CCLink :href="article.path">
                {{ article.title }}
            </CCLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import {format} from "date-fns";

const articles = await queryCollection("articles").order("publishedAt", "DESC").all();

useHead({
    title: "Committing Crimes"
});

const description = "Tips, tricks, and quirks about programming and software development by Leon 'TheMrMilchmann' Linhart.";

useServerSeoMeta({
    description: description,

    ogDescription: description,
    ogTitle: "Committing Crimes",
    ogType: "website",
    ogSiteName: "Committing Crimes",
    ogImage: "https://committing-crimes.com/me.jpg",
    ogUrl: "https://comitting-crimes.com",

    twitterCard: "summary",
    twitterDescription: description,
    twitterTitle: "Committing Crimes",
    twitterImage: "https://committing-crimes.com/me.jpg"
});

function formatDateString(date: Date): string {
    return format(date, "yyyy-MM-dd");
}
</script>

<style scoped>
.article-list-entry {
    display: flex;
    gap: 8px;
}
</style>