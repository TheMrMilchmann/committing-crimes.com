<!--
  - Copyright (c) 2023 Leon Linhart
  - All rights reserved.
  -->
<template>
    <NuxtLayout>
        <LazyDefaultHeader />

        <ContentDoc>
            <template #not-found>
                <h2>Not found</h2>
            </template>
        </ContentDoc>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { page } = useContent()

useJsonld({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: page.value.title,
    datePublished: page.value["publishedAt"],
    dateModified: page.value["modifiedAt"],
    image: "https://committing-crimes.com/test.jpg", // TODO wire up article specific images
    author: {
        "@type": "Person",
        name: "Leon Linhart",
        url: "https://github.com/TheMrMilchmann"
    }
})

useServerSeoMeta({
    ogType: "article",
    ogImage: "https://committing-crimes.com/test.jpg" // TODO wire up article specific images
})

useServerHead({
    meta: [
        { property: "og:article:published_time", content: page.value["publishedAt"] },
        { property: "og:article:modified_time", content: page.value["modifiedAt"] ?? page.value["publishedAt"] },
        { property: "og:article:author", content: "" },
        { property: "og:profile:first_name", content: "Leon" },
        { property: "og:profile:last_name", content: "Linhart" },
        { property: "og:profile:username", content: "TheMrMilchmann" },
    ]
})

</script>