/*
 * Copyright (c) 2023-2025 Leon Linhart
 * All rights reserved.
 */
import RSS from "rss";

export default defineEventHandler(async (event) => {
    const feed = new RSS({
        title: "Committing Crimes",
        site_url: "https://committing-crimes.com",
        feed_url: "https://committing-crimes.com/rss.xml",
        webMaster: "support@committing-crimes.com"
    });

    const articles = await queryCollection(event, "articles")
        .order("publishedAt", "DESC")
        .all();

    for (const article of articles) {
        feed.item({
            title: article.title ?? "-",
            url: `https://committing-crimes.com${article.path}`,
            date: article.publishedAt,
            description: article.description
        });
    }

    const feedString = feed.xml({ indent: "  " });
    event.node.res.setHeader("Content-Type", "text/xml");
    event.node.res.end(feedString);
});