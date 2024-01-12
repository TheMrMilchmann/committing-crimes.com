/*
 * Copyright (c) 2023-2024 Leon Linhart
 * All rights reserved.
 */
import { serverQueryContent } from '#content/server';
import RSS from "rss";

export default defineEventHandler(async (event) => {
    const feed = new RSS({
        title: "Committing Crimes",
        site_url: "https://committing-crimes.com",
        feed_url: "https://committing-crimes.com/rss.xml",
        webMaster: "support@committing-crimes.com"
    });

    const articles = await serverQueryContent(event)
        .sort({ date: -1 })
        .where({ _partial: false })
        .find();

    for (const article of articles) {
        feed.item({
            title: article.title ?? "-",
            url: `https://committing-crimes.com${article._path}`,
            date: article.date,
            description: article.description
        });
    }

    const feedString = feed.xml({ indent: "  " });
    event.node.res.setHeader("Content-Type", "text/xml");
    event.node.res.end(feedString);
});