---
title: "Omittable — Solving the Ambiguity of Null"
description: "Null values in Java are used to present both the absence of a value and the default value of a reference type variable. To design robust APIs, it is necessary to unpack this semantic ambiguity. Omittable is a library solution to this problem."
tags: [article, java, jvm, omittable, optional, "null", absence]
publishedAt: 2025-09-16
---


# Omittable — Solving the Ambiguity of Null

_Updated 2025-09-24: A previous version of this article inaccurately described how to explicitly pass `null` values to
query parameters. To avoid confusion, this has been corrected to specify that this is the case if the query parameter is
used without a value._

When implementing a REST API, one might need to implement support for partial updates or filtering. Requests using the
HTTP `PATCH` method commonly carry only the fields that should be updated. Similarly, filtering endpoints often filter
based on the provided query parameters, while ignoring those that are omitted. In theory, this is not a complex
endeavour, but, in statically typed languages, it can be surprisingly difficult to get right. While this issue is not
unique to Java, the language serves as a good example to illustrate the problem.

For a `PersonUpdate` entity with a _name_ and an optional _nickname_, an endpoint for a partial update might use the
HTTP `PATCH` method:

```sh
$ curl -X PATCH -H "Content-Type: application/json" \
    -d '{"name": "John Doe-Watson"}' \
    https://api.example.com/person/123
```

A typical handler method in Java would deserialize the request body into an object similar to this:

```java
record PersonUpdate(String name, String nickname) {}
```

For the request above, the `name` field would be set to `"John Doe-Watson"` and the `nickname` field would be set to
`null`. This is problematic as processing code loses the information that the `nickname` field was not set to `null`
explicitly, and cannot tell if the field should be kept as-is or set to `null` to effectively delete the nickname.
Important information is lost because both the absence of a field and a field explicitly set to `null` are coalesced
into the same representation during deserialization.

A similar issue arises when implementing filtering via query parameters. For example, a handler method for such an
endpoint might look similar to this:

```java
@GetMapping("/person")
public void getPersons(
    @RequestParam(required = false) String name,
    @RequestParam(required = false) String nickname
) {
    // ...
}
```

Just like in the previous example, the `nickname` parameter will be set to `null` in two cases: If the query parameter
is omitted entirely, or if it provided without a value. Again, the handler method cannot distinguish between these two
cases. This is problematic as they carry different semantics: In the former case, the nickname should be ignored when
filtering, while in the latter, only persons without a nickname (i.e., a nickname that is null) should be included.

Both of these examples are direct consequences of the conflation of the concepts of null and absence. A better
understanding of what exactly `null` is and what it is used for in the language and its ecosystem is necessary to come
up with a satisfying solution to this problem.


## Null as a Value

From the perspective of the Java language, null is first and foremost just a value. The Java Language Specification
defines the _null type_ as a type of the `null` expression, and it specifies that it can be cast and assigned to any
reference type. [[JLS 24 §4.1](https://docs.oracle.com/javase/specs/jls/se24/html/jls-4.html#jls-4.1)] Put differently,
every variable of a reference type $T$ can hold either a value of type $T$, or the value `null`. Thus, the value of a
variable `t` declared as `T t` is of type $T \mid null$.

Java requires variables to be initialized before their values can be used. In some cases (e.g., class fields), however,
explicit initialization is not required. Instead, the fields are initialized to a default value. For primitive types,
these default values are well-defined and baked into the specification (e.g., `0`, `false`). Reference types, however,
have no such default values. Instead, variables of reference types are initialized with `null` by default. [[JLS 24 §4.12](https://docs.oracle.com/javase/specs/jls/se24/html/jls-4.html#jls-4.12.5)]


## Null as Absence

Although null is technically just a value, it is frequently used to denote absence throughout Java's ecosystem. The
standard library is full of such cases. A `Map<K, V>` defines a `V get(K key)` method which returns `null` if no entry
exists for the given key. Semantically, its return type is `V | null` which means its values have the type $(V \mid null) \mid null \equiv V \mid null$.
It becomes impossible to distinguish between the absence of an entry and a null value.

For example, a `HashMap<String, String>` with an entry $("myKey", null)$ is
perfectly valid. A problem arises when trying to retrieve such an entry with a null value: The `get` method will return
`null` even though an entry for the given key exists.

With language-level support for _null-restricted_ variables (i.e., variables that are not allowed to hold `null` values),
such ambiguities would have likely surfaced sooner. Effectively, null has transcended its role in the language as a
default value for variables of reference types and has been misused to denote the orthogonal concept of semantic absence
of a value.


## Lessons from Dynamically Typed Languages

Dynamically typed languages have a related problem to tackle: It is not generally known at compile-time whether a
variable is defined. There are various solutions to address this issue.

In Python, while there are some differences in how they can be used, `None` carries the same semantics as `null` in
Java. Unlike Java, Python is not statically typed. Instead, Python performs basic type checking at runtime. If an
undefined variable is accessed, a `NameError` is raised. Notably, Python does have the concept of undefined variables,
but these are not first-class citizens, and encountering them is usually the result of a programming error.

JavaScript and, by extension, TypeScript approach this problem in a simpler but semantically more nuanced way.
Here, `null` is not a default value for uninitialized or _undefined_ variables, but a mere value that denotes the
absence of an object. Instead, the global `undefined` property is a sentinel that is used as a default value for
uninitialized and undefined variables.

The `PersonUpdate` type from the initial example could be defined as follows in TypeScript:
```ts
interface PersonUpdate {
    name?: string;
    nickname?: string | null;
}
```

Here, both `name` and `nickname` are optional (i.e., may be `undefined`), but only `nickname` may be `null`. Just as
intended.


## The issue with `Optional`

By now, it has become apparent that `null` is not a good fit to universally represent the absence of a value. A
different concept is required to express this safely and unambiguously. What would such a solution look like at the
library level for a statically typed language?

In Haskell, the monadic type `Maybe` is used to represent optional values. It is a sum type with two cases: `Just a`
which wraps a value of type `a` without placing restrictions on the type, and `Nothing` which represents the absence of
a value.

Something that might come to mind when thinking about library-level solutions to _optional_ values in Java is the
`Optional` type. It was introduced in Java 8 as a container object "which may or may not contain a non-null value" -
Interestingly, `Optional` imposes the restriction that it cannot contain a `null` value.

A deliberate design decision at the time[^1]:

> Of course, people will do what they want. But we did have a clear intention when adding this feature, and it was not
> to be a general purpose `Maybe` type, as much as many people would have liked us to do so. Our intention was to provide
> a limited mechanism for library method return types where there needed to be a clear way to represent "no result", and
> using `null` for such was overwhelmingly likely to cause errors.

Effectively, `Optional` is a library solution to a language problem: Since the type system does not carry nullability
information, it is easy to forget null checks or introduce accidental breaking changes. When using an `Optional` return
type, the caller is forced to explicitly handle the case of absence.

By restricting `null` values (and therefore breaking the [monad laws](https://wiki.haskell.org/index.php?title=Monad_laws)),
empty optionals effectively are equivalent to `null` with slightly improved type-system awareness.[^broken-laws]
Consequently, there is no semantic difference between an `Optional<String>` and a `String` return type as both represent
values of type $String \mid null$. Without resorting to additional tricks, such as passing `null` to `Optional`
parameters (which undermines the whole purpose of `Optional`), it is impossible to express the difference between nulls
and absence with `Optional`.


## Marking Nulls with Annotations

However, Java 8 introduced another feature that provided another avenue to address the problem of nullability: Type
annotations. Type annotations allow annotating not type declarations, but types at use-site with additional information.

Nullability annotations such as those envisioned by JSR 305 or those recently standardized by [JSpecify](https://jspecify.org/)
profited from this. These annotations carry information about whether a variable should ever hold a `null` value. At its
core are two annotations: `@Nullable` and `@NonNull`. Variables of type `@Nullable T` should hold values of type $T \mid null$,
while variables of type `@NonNull T` should only hold values of type $T$.

For convenience, the `@NullMarked` annotation changes the default nullability of types for non-local variables in its
annotated scope to `@NonNull`. For example, in a `@NullMarked` module, a method parameter of type `String` should only
receive values of type $String$ and not `null`.

In conjunction with IDE tooling and validation frameworks, such nullability annotations are a better solution to
null-marking than using `Optional` in most cases. Streams and function chaining remain troublesome. The rather recent
introduction of an agreed-upon standard - JSpecify - cemented this.

Naively, the `PersonUpdate` type could now be implemented as follows:
```java
@NullMarked
record PersonUpdate(
    String name,
    @Nullable String nickname
) {}
```

However, this is even worse than the original implementation without nullability. While a person must always have a
non-null name, `name` would still be deserialized to `null` when the field is omitted from the request body.

While JSpecify is a great step forward in solving the problem of (unmarked) nullability in Java, it does not help with
the problem of distinguishing between absence and `null` either. Something else is needed.


## Introducing: Omittable

[Omittable](https://github.com/Osmerion/Omittable) is a library for Java[^kotlin-deintrinsify] and Kotlin that introduces an `Omittable`
monad. `Omittable` is a container type that can be used to either represent a value or an absence of a value.
While conceptually similar to `Optional` at first glance, it is fundamentally different in that it does not reuse `null`
as a sentinel for absence. Instead, `null` is just a regular value that could be represented by an omittable.

_Incidentally, the lack of special-casing of nulls is also what enables omittable to satisfy all three monad laws.[^monad-laws]
The proof is left as an exercise to the reader. :)_

The API differences between `Omittable` and `Optional` are minor, with the core API of `Omittable` being equivalent to
the snippet below.

```java
public sealed interface Omittable<T extends @Nullable Object> {

    static <T> Omittable<T> absent() { /* ... */ }
    
    static <T> Omittable<T> of(T value) { /* ... */ }

    T orElseThrow();
    
    <U> Omittable<U> flatMap(Function<? super T, Omittable<U>> mapper);
    
    record Present<T extends @Nullable Object>(T value) implements Omittable<T> { /* ... */ }
    
    // ...
    
}
```

Using Omittable and JSpecify, `PersonUpdate` can easily be implemented:

```java
@NullMarked
record PersonUpdate(
    Omittable<String> name,
    Omittable<@Nullable String> nickname
) {}
```

It is immediately clear that both fields could be omitted. Further, marking nullness signals that `name` must not be
`null` if present.

Similarly, the handler method for the filtering endpoint could be defined as follows:

```java
@Get("/person")
public void getPersons(
    @Query Omittable<String> name,
    @Query Omittable<@Nullable String> nickname
) {
    // ...
}
```

Just like with the `PersonUpdate` type, it is immediately clear that both parameters can be omitted from the query
entirely, and that only `nickname` should ever be passed `null`.

Conveniently, `Omittable` plays nicely with Java's pattern matching. Most notably, its type patterns and record patterns
which can be used to concisely check against `Omittable.Present`:

```java
public static boolean isChanged(Person person, PersonUpdate update) {
    // In if statements ...
    if (update.name() instanceof Omittable.Present(String name)
        && !person.name().equals(name)
    ) {
        return true;
    }
    
    // ... and switch cases.
    switch (update.nickname()) {
        case Omittable.Present(@Nullable String nickname)
            when Objects.equals(person.nickname(), nickname) -> {
            return true;
        }
    }
    
    return false;
}
```

In conjunction with nullability annotations from JSpecify, `Omittable` provides a clear and concise way to convey the
semantic difference between absence and nullability in Java. For more, check out [Omittable on GitHub](https://github.com/Osmerion/Omittable)!


## A Glimpse into the Future

Finally, it is worth mentioning that Java is evolving, and nullability is on the agenda. The path towards value types is
likely to allow reference types to express nullness at use-site as [Null-Restricted and Nullable Types](https://openjdk.org/jeps/8303099).
The example above could then be expressed as follows:

```java
record PersonUpdate(
    Omittable<String!>! name,
    Omittable<String?>! nickname
) {}
```

_Admittedly, the syntax does not look great. I sincerely hope for a module-wide mechanism to opt into non-null by
default. More on that, perhaps, in a future article._


[^1]: This is a direct quote from Brian Goetz's [answer on Stack Overflow](https://stackoverflow.com/questions/26327957/should-java-8-getters-return-optional-type/26328555#26328555).
      He goes into a bit more detail, so it's definitely worth a read.
[^broken-laws]: https://medium.com/97-things/optional-is-a-law-breaking-monad-but-a-good-type-7667eb821081

[^kotlin-deintrinsify]: While writing a Kotlin library with a workable Java API is relatively straightforward,
    writing one without a dependency on Kotlin's standard library is another matter. There's certainly [some fun](https://github.com/Osmerion/Omittable/blob/fa50df786d48ab0d37c20626591c5ce6dbae4001/build-logic/src/main/kotlin/com/osmerion/build/tasks/TransformIntrinsicsTask.kt#L74)
    to it.
