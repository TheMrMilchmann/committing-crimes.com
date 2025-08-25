<!--
  - Copyright (c) 2023-2025 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div>
        <ContentRenderer v-if="page" :value="page" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

/*
 * This is cursed on multiple levels. For one, we have to strip the trailing slash thanks to web servers being
 * inconsistent. And if that wasn't enough, we also have to deal with the fact that JavaScript's stdlib absolutely
 * sucks and implement removeSuffix the "hard" way.
 */
const path = route.path.endsWith("/") ? route.path.slice(0, -1) : route.path;
const { data: page } = await useAsyncData(path, () => {
    return queryCollection("articles").path(path).first();
});

// Ensure `page.value` is not null
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
    });
}

useSeoMeta(page.value.seo);

useJsonld({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: page.value.title,
    abstract: page.value.description,
    datePublished: page.value.publishedAt,
    dateModified: page.value.modifiedAt ?? page.value.publishedAt,
    image: "https://committing-crimes.com/me.jpg", // TODO wire up article specific images
    author: {
        "@type": "Person",
        name: "Leon Linhart",
        url: "https://github.com/TheMrMilchmann"
    }
});

useServerSeoMeta({
    ogType: "article",
    ogImage: "https://committing-crimes.com/me.jpg" // TODO wire up article specific images
});

useServerHead({
    meta: [
        // { property: "og:article:published_time", content: page.value["publishedAt"] },
        // { property: "og:article:modified_time", content: page.value["modifiedAt"] ?? page.value["publishedAt"] },
        // { property: "og:article:author", content: "" },
        { property: "og:profile:first_name", content: "Leon" },
        { property: "og:profile:last_name", content: "Linhart" },
        { property: "og:profile:username", content: "TheMrMilchmann" },
    ]
});
</script>