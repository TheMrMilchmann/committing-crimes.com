/*
 * Copyright (c) 2023-2025 Leon Linhart
 * All rights reserved.
 */
import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import path from "path";

export default defineContentConfig({
    collections: {
        articles: defineCollection({
            source: {
                cwd: path.resolve("src/content"),
                include: "articles/**/*.md",
                prefix: "/articles"
            },
            type: 'page',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                publishedAt: z.date(),
                modifiedAt: z.date()
            })
        })
    }
});