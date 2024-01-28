<!--
  - Copyright (c) 2023-2024 Leon Linhart
  - All rights reserved.
  -->
<template>
    <div>
        <article>
            <aside role="region" style="float: right">
                <img class="project-card-wrapper" src="/me.jpg" width="256" alt="A picture of Leon Linhart sitting on an improvised throne built out of beer crates."/>
            </aside>

            <p>Hello there! 👋</p>
            <p>
                I'm <span class="alias">Leon Linhart</span>, a {{age}}-year-old software developer from Germany.
                On the internet, I have been using the alias <span class="alias">TheMrMilchmann</span> since the early 2010s.
            </p>

            <p>
                I started programming as a hobby back in school when I was obsessed with the idea of creating my own video game.
                Since this was around the time Minecraft was extremely popular, little me chose to learn and use Java for his experiments.
                To access low-level windowing and graphics APIs, I used the <CCLink href="https://lwjgl.org" target="_blank">Lightweight Java Game Library</CCLink>.
                Through working with LWJGL on essentially highly-performant code, I became interested in and learned a lot about the internals of the Java Virtual Machine.
            </p>

            <p>
                Contributions to LWJGL were also a large factor for me to get into open-source development in 2017.
                Since then, I have written and contributed to dozens of projects of all sizes, many of which you can find on <CCLink href="https://github.com/TheMrMilchmann" target="_blank">GitHub</CCLink>.
            </p>

            <p>
                In 2023, I earned a bachelor's degree in Computer Science at RWTH Aachen University.
                At this point, I decided to stop pursuing my studies and started working full-time as a backend software engineer at Yukawa Exponential GmbH.
            </p>

            <p>
                I created <code class="page-title">Committing Crimes</code> as personal website to write about software development.
                Stay tuned for more!
            </p>

        </article>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    documentDriven: false
});

const age = computed(() => {
    const birthday = new Date("1998-11-04");
    const now = new Date();

    let age = now.getUTCFullYear() - birthday.getUTCFullYear();
    if (now.getUTCMonth() < birthday.getUTCMonth() || (now.getUTCMonth() == birthday.getUTCMonth() && now.getUTCDate() < birthday.getUTCDate())) {
        age -= 1;
    }

    return age;
});

useHead({
    title: "About Leon Linhart - Committing Crimes",
    meta: [
        { property: "twitter:domain", content: "committing-crimes.com" },
        { property: "twitter:url", content: "https://committing-crimes.com/about" },
    ]
});

useServerSeoMeta({
    ogTitle: "About Leon Linhart",
    ogDescription: `I'm Leon Linhart, a ${age.value}-year-old software developer from Germany.`,
    ogType: "article",
    ogImage: "https://committing-crimes.com/me.jpg",
    ogUrl: "https://comitting-crimes.com/about",
    ogSiteName: "Committing Crimes",

    twitterCard: "summary_large_image",
    twitterTitle: "About Leon Linhart",
    twitterDescription: `I'm Leon Linhart, a ${age.value}-year-old software developer from Germany.`,
    twitterImage: "https://committing-crimes.com/me.jpg"
});
</script>

<style scoped>
.alias {
    color: var(--link-color);
}

.page-title {
    color: var(--link-color);
}

.project-card-wrapper {
    background-color: white;
    border-radius: 8px;

    display: flex;

    margin-left: 24px;
    margin-right: 24px;

    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23), -0px -0px 128px 10px rgba(255,255,255, 0.24);
}


</style>