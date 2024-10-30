---
title: "Safely Target Java Versions Using Gradle's Toolchains"
description: "A guide on how to use Gradle's Java toolchains correctly to target specific Java versions without giving up on recent tooling improvements."
tags: [tutorial, java, jvm, kotlin, gradle, toolchains]
publishedAt: 2024-10-30
---

# Safely Target Java Versions Using Gradle's Toolchains

Gradle is a powerful build tool that is widely used in the JVM ecosystem. Gradle itself is also written in Java and
consequentially requires an installed Java runtime. In the past, the JDK tools from the runtime used to run a Gradle
build were usually also used to build and run the project. This approach had several drawbacks:

  - The JDK tools could only be overwritten per task by providing paths to local tools. This is cumbersome and
    especially problematic when running builds on different machines.
  - With Java adopting a more rapid release cycle, Gradle frequently was lagging behind in supporting running on the
    latest Java versions.

In Gradle 6.7, the concept of Java toolchains was introduced. Toolchains provide a way to conveniently decouple the
runtime used to run a build from the JDK used to compile and run the project. Toolchains can be managed and provisioned
by Gradle, which makes it easy to use multiple toolchains in a single build or across different machines. While
toolchains solve many problems, there are still some pitfalls to avoid when using them. In this guide, we'll explore how
to configure Java toolchains properly to compile Java libraries.[^kotlin-libraries]


## The problem with `-source` and `-target`

Let's assume we have a project that should run on a Java 8 runtime. We've since upgraded our installed JDK to Java 17
though. Thus, without toolchains, Java 17 is used to run our Gradle build.

Before toolchains, our build script might have looked like this:

```kotlin
java {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
}
```

The `sourceCompatibility` and `targetCompatibility` properties are simple abstractions for the `-source` and `-target`
flags of the Java compiler. The _source compatibility_ determines which version of the Java language is used to compile
our code. The _target compatibility_ allows us to generate bytecode that is compatible with a specific version of Java.
Theoretically, this can already be sufficient to support Java 8 while compiling with Java 17. However, `-source` and
`-target` have a significant drawback: They don't prevent us from using APIs that are not available in Java 8.

Consider the following method:

```java
public void printNotEmpty(CharSequence source) {
    if (!source.isEmpty()) {
        System.out.println(source);
    }
}
```

This compiles perfectly fine with `-source 1.8 -target 1.8`. However, the `isEmpty` method was only introduced in Java 15.
If we run this code on Java 8, we get a `NoSuchMethodError` at runtime.


## Using Java toolchains

> Using Java toolchains is a preferred way to target a language version.

The [Gradle documentation](https://docs.gradle.org/current/userguide/building_java_projects.html#sec:java_cross_compilation)
recommends using Java toolchains to target specific Java versions. Let's give this a try:

```kotlin
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(8)
    }
}
```

There is a key difference to our previous setup though: Instead of "cross-compiling" from Java 17 to Java 8, we now
compile with Java 8. This means that we are missing out on all performance improvements and bug fixes for `javac` that
have not been backported. If we also use other Java tools like `javadoc` to generate our documentation, we might even
miss out on significant improvements made to these tools.[^jake-wharton-gradle-toolchains]

We could live with this trade-off, but we can do better:

```kotlin
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(23)
    }
}

tasks.withType<JavaCompile>().configureEach {
    sourceCompatibility = "1.8"
    targetCompatibility = "1.8"
}
```

Now, we use a Java 23[^java23] toolchain to build our project, but we still target Java 8. However, this is not an ideal
configuration since we are using `-source` and `-target` again. Fortunately in Java 9, the `--release` flag was
introduced as de facto replacement for `-source` and `-target`. Contrary, this flag instructs the compiler to work with
symbol tables for a specified Java version in addition to configuring the language level and bytecode version.

```kotlin
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(23)
    }
}

tasks.withType<JavaCompile>().configureEach {
    options.release = 8
}
```

Great! Now we can compile with the latest Java toolchain that is automatically provisioned and managed by Gradle while
still safely targeting Java 8.


## Conclusion

Finally, we should also pass the `--release` flag to JavaDoc generation and configure tests to run on our minimum
supported Java version. Our final configuration looks like this:

```kotlin
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(23)
    }
}

tasks {
    withType<JavaCompile>().configureEach {
        options.release = 8
    }
    
    withType<Javadoc>().configureEach {
        with(options as StandardJavadocDocletOptions) {
            addStringOption("-release", "8")
        }
    }

    withType<Test>().configureEach {
        javaLauncher.set(project.javaToolchains.launcherFor {
            languageVersion = JavaLanguageVersion.of(8)
        })
    }
}
```

With this configuration, we compile with the latest Java toolchain while safely targeting Java 8. Further, the runtime
used to run the build itself does not factor into the build process anymore. This significantly reduces the risk of
running into issues when building on different machines. Gradle's auto-provisioning of toolchains ensures that no manual
JDK installation are required (expect for the runtime used by Gradle).

However, this approach adds complexity and maintenance overhead to the build logic. It's important to regularly update
the Java toolchain version to benefit from the latest improvements and bug fixes. Additionally, it's crucial to properly
configure the `--release` flag consistently across all tasks for good results. If a build is growing in complexity, this
can be achieved using [convention plugins](https://docs.gradle.org/current/samples/sample_convention_plugins.html#compiling_convention_plugins).


[^jake-wharton-gradle-toolchains]: Jake Wharton wrote a [blog post](https://jakewharton.com/gradle-toolchains-are-rarely-a-good-idea/)
    about the caveats of using Gradle toolchains. While I disagree with his conclusion, his points about why using old
    Java toolchains is a bad idea are valid.

[^java23]: Java 23 is the latest version of Java at the time of writing. If you're copying this code in the future,
    adjust this to use the latest version of Java available.

[^kotlin-libraries]: While this guide focuses on Java libraries, all the concepts also apply to Kotlin libraries, as the
    Kotlin Gradle plugin [supports Java toolchains](https://kotlinlang.org/docs/gradle-configure-project.html#gradle-java-toolchains-support).
    The Kotlin compiler's `-Xjdk-release` flag maps to Java's `--release` flag and should be configured too. [Read more](https://jakewharton.com/kotlins-jdk-release-compatibility-flag/)