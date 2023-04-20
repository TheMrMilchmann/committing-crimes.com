<template>
    <div>
        <p>Hello World</p>
    </div>

    <ContentList :query="articlesQuery" v-slot="{ list }">
        <div v-for="article in list" :key="article._path">
            {{ formatDateString(article.date) }}

            <NuxtLink :href="article._path">
                {{ article.title }}
            </NuxtLink>
        </div>
    </ContentList>
</template>

<script setup lang="ts">
import type {QueryBuilderParams} from "@nuxt/content/dist/runtime/types"
import {format, parseISO} from "date-fns"
import { ref } from "vue"

useHead({
   title: "Committing Crimes"
});

definePageMeta({
    documentDriven: false
})

const list = ref()

const articlesQuery: QueryBuilderParams = {
    path: "/articles",
    sort: [{ date: -1 }]
};

function formatDateString(date: string): string {
    return format(parseISO(date), "yyyy-MM-dd");
}
</script>

<style scoped>

</style>