/*
 * Copyright (c) 2023-2025 Leon Linhart
 * All rights reserved.
 */
import { SitemapStream, streamToPromise } from "sitemap";

export default defineEventHandler(async (event) => {
    const articles = await queryCollection(event, "articles").all();

    const sitemap = new SitemapStream({
        hostname: "https://committing-crimes.com"
    });

    for (const article of articles) {
        sitemap.write({
            url: article.path,
            changefreq: "daily"
        });
    }

    sitemap.end();
    return streamToPromise(sitemap);
});