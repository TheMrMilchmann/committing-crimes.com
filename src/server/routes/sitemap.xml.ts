/*
 * Copyright (c) 2023-2024 Leon Linhart
 * All rights reserved.
 */
import { serverQueryContent } from "#content/server"
import { SitemapStream, streamToPromise } from "sitemap"

export default defineEventHandler(async (event) => {
    // Fetch all documents
    const docs = await serverQueryContent(event).find();

    const sitemap = new SitemapStream({
        hostname: "https://committing-crimes.com"
    });

    for (const doc of docs) {
        sitemap.write({
            url: doc._path,
            changefreq: "daily"
        });
    }

    sitemap.end();
    return streamToPromise(sitemap);
});