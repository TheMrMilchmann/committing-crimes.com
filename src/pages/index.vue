<!--
  - Copyright (c) 2023-2024 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div>
        <ContentList :query="articlesQuery" v-slot="{ list }: { list: ParsedContentMeta[] }">
            <div class="article-list-entry" v-for="article in list" :key="article._path">
                <span class="monospaced">{{ formatDateString(article.publishedAt) }}</span>

                <CCLink :href="article._path">
                    {{ article.title }}
                </CCLink>
            </div>
        </ContentList>
    </div>
</template>

<script setup lang="ts">
import type {ParsedContentMeta, QueryBuilderParams} from "@nuxt/content";
import {format, parseISO} from "date-fns";

definePageMeta({
    documentDriven: false
});

useHead({
    title: "Committing Crimes",
    meta: [
        { property: "twitter:domain", content: "committing-crimes.com" },
        { property: "twitter:url", content: "https://committing-crimes.com" },
    ]
});

useServerSeoMeta({
    description: "Tips, tricks, and quirks about programming and software development by Leon 'TheMrMilchmann' Linhart.",

    ogTitle: "Committing Crimes",
    ogType: "website",
    ogSiteName: "Committing Crimes",
    ogImage: "https://committing-crimes.com/me.jpg",
    ogUrl: "https://comitting-crimes.com",

    twitterCard: "summary",
    twitterTitle: "Committing Crimes",
    twitterImage: "https://committing-crimes.com/me.jpg"
});

const articlesQuery: QueryBuilderParams = {
    path: "/articles",
    sort: [{ publishedAt: -1 }]
};

function formatDateString(date: string): string {
    return format(parseISO(date), "yyyy-MM-dd");
}
</script>

<style scoped>
.article-list-entry {
    display: flex;
    gap: 8px;
}
</style>