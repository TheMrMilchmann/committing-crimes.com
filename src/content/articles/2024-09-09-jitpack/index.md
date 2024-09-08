---
title: "jitpack.io — Dangerously Simple"
description: "JitPack is a package repository for JVM and Android projects. Its simplicity makes it a popular alternative to Maven Central. But this simplicity is gained at the cost of security."
tags: [opinion, java, android, jvm, jitpack, dependency-management]
publishedAt: 2024-09-09
---

# jitpack.io — Dangerously Simple

[JitPack](https://jitpack.io/) is a package repository for JVM and Android projects. Unlike other package repositories,
JitPack does not require library authors to publish their build artifacts. Instead, JitPack builds the artifacts from
hosting solutions for Git repositories (e.g. GitHub, GitLab) as needed. By eliminating the need for library authors to
publish artifacts outside their version control system, JitPack has become extremely easy to use for both library
authors and consumers. At a cost...


## JitPack is inconsistent

Although it endorses and claims to promote reproducible builds[^jitpack-faq-reproducible-builds], JitPack's capabilities
undermine this goal. Contrary to other CI services, JitPack provides limited control and transparency over the
environment in which it builds artifacts. This has been reported to lead to flaky builds. Since JitPack builds and
publishes artifacts atomically, there is no way to inspect artifacts before publishing them to verify that a build
produced the expected result. This is somewhat remedied since artifacts are not immutable until seven days after
publication.[^jitpack-immutable-artifacts] However, this mutability is a double-edged sword. While it allows for quick
fixes, it also means that artifacts may change — which, again, undermines build reproducibility for consumers.


## JitPack is unreliable

JitPack has repeatedly been plagued by outages and performance issues. Dozens of reports about issues with the service
can be found on their issue tracker, most of which are left unanswered.[^jitpack-issue-tracker]

While there is no contact information available on the JitPack website, the following information is available in its
terms of service:

> This is a service provided by Streametry Ltd. trading as JitPack, registered in London, United Kingdom,
> 86-90 Paul St., EC2A4NE.

Streametry Ltd. is a UK-based company for which little public information exists. The company lists a single officer.[^jitpack-officer]
Its website offers scant details about the business and links to dead or unmaintained pages and social media profiles.[^jitpack-website]

Conclusively, there is neither a way to contact JitPack for support reliably, nor a channel to get updates about the
service's status. During any outage, users are left in the dark about the cause and duration of the issue. It is not
even clear whether a permanent shutdown would be communicated appropriately. It is safe to assume that Streametry lacks
the resources to support JitPack for what it has become.

For comparison: Maven Central has been stewarded by Sonatype for over 15 years already and has strong ties to the
Apache Software Foundation. Sonatype is a company that specializes in supply chain security with somewhere between 500
and 1000 employees.[^sonatype-linkedin]


## JitPack is a security risk

Most importantly, JitPack is a supply-chain attack waiting to happen. As a package repository, JitPack is in a position
to distribute malicious artifacts at will to thousands if not millions of builds. While the same could be said about
Maven Central, there is one key difference: Maven Central requires artifacts to be signed by the author. In practice,
this means that alongside the artifact, cryptographic signatures are uploaded when publishing a project. These
signatures can be verified by build tools to ensure that an artifact comes from a trusted source.[^gradle-signature-verification]
By the very nature of JitPack's design, this is not possible. As the responsibility for building artifacts is delegated
to JitPack, JitPack inadvertently becomes a trusted party in the supply chain.

Even assuming that Streametry acts with the best intentions, JitPack is a prime target for large-scale supply chain
attacks. At best, it is questionable whether the company has the capabilities to protect against such attacks.


## JitPack is... simple?

Despite all of its flaws, JitPack is widely used for one reason: It is simple to use.

> If you want your library to be available to the world, there is no need to go through project build and upload steps.
> All you need to do is push your project to GitHub and JitPack will take care of the rest. That’s really it![^jitpack-claim]

That's **really** it. When publishing to Maven Central, library authors must set up and manage signing keys, and take
care of the building and publishing process. JitPack eliminates all of that. It does that by taking responsibility. A
responsibility that it is not equipped to handle.

In summary, JitPack is an interesting idea with great usability that grew out of proportion. Using JitPack to pull in
specific Git revisions can be extremely useful for quickly testing specific changes. However, the service is unsuitable
for use outside of that and should be kept far away from any serious project, especially production builds.
Library authors should take the time to publish their artifacts properly and not rely on JitPack to do the work for
them. The costs saved by library authors are accumulating and waiting for the day when they will be paid by the
ecosystem.


[^gradle-signature-verification]: https://docs.gradle.org/current/userguide/dependency_verification.html#sec:signature-verification

[^jitpack-claim]: https://github.com/jitpack/jitpack.io/blob/34753a34a3d820bddbc5d291fa86f7143839805d/README.md?plain=1#L5
[^jitpack-faq-reproducible-builds]: [JitPacks' FAQ](https://jitpack.io/docs/FAQ/#frequently-asked-questions) states that
    JitPack "encourages reproducible builds" and does not rebuild artifacts unless explicitly requested by the library
    author.
[^jitpack-immutable-artifacts]: [JitPack's documentation](https://jitpack.io/docs/) states that "Public repository
    artifacts on JitPack are immutable after 7 days of publishing.". Interestingly, this does not cover artifacts from
    private repositories.
[^jitpack-issue-tracker]: [JitPack's issue tracker](https://github.com/jitpack/jitpack.io/issues) is full of issues that
    are left unanswered. Even "resolved" issues are often only closed due to being "stale" without ever having seen a
    human response.
[^jitpack-officer]: https://find-and-update.company-information.service.gov.uk/company/09192089/officers
[^jitpack-website]: [Streametry's website](http://streametry.com/) links to a dead blog (`blog.streametry.com/`) and a
    [protected account on X](https://x.com/streametry), formerly known as Twitter. The linked [GitHub organization profile](https://github.com/streametry)
    has seen no updates since 2014.

[^sonatype-linkedin]: Sonatype reports between 500 and 1000 employees on [LinkedIn](https://www.linkedin.com/company/sonatype/people/).