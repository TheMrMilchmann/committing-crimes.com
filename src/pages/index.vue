<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
    <NuxtLayout>
        <ContentList :query="articlesQuery" v-slot="{ list }: { list: ParsedContentMeta[] }">
            <div class="article-list-entry" v-for="article in list" :key="article._path">
                <span class="monospaced">{{ formatDateString(article.publishedAt) }}</span>

                <CCLink :href="article._path">
                    {{ article.title }}
                </CCLink>
            </div>
        </ContentList>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type {ParsedContentMeta, QueryBuilderParams} from "@nuxt/content/dist/runtime/types";
import {format, parseISO} from "date-fns";

useHead({
   title: "Committing Crimes"
});

definePageMeta({
    documentDriven: false
});

useServerSeoMeta({
    ogTitle: "Committing Crimes",
    ogType: "website",
    ogImage: "https://www.committing-crimes.com/test.jpg",
    ogUrl: "https://comitting-crimes.com"
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