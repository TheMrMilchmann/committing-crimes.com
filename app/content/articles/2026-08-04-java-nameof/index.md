---
title: "Hacking in the `nameOf`"
description: "A short demonstration of how to implement a 'nameOf' expression in Java using bytecode introspection."
tags: [article, bytecode, java, jvm, nameof]
publishedAt: 2026-08-04
---


# Hacking in the `nameOf`

When validating arguments, it is usually a good idea to include the respective parameter names in the exception message
to make it immediately clear which parameter received a bad value:

```java
public static MyObject create(String name) {
    if (name.isBlank()) throw new IllegalArgumentException("name must not be blank");
    // ...
}
```

However, there is one crucial duplication here: The parameter name is hardcoded into the exception message. To avoid
this duplication (and for a few more niche use cases), some programming languages (e.g., C#) implement a `nameof`
expression (or similar) which allows retrieving the textual name of an identifier as string. This prevents incomplete
refactorings from silently introducing inconsistencies.

Java does not have such a construct...

...but we can build one!

By introspecting the bytecode at runtime, it is even possible to implement a pure library solution to this "problem"
without the need to resort to instrumentation or annotation processing. This is admittedly solving a tiny problem in a
spectacularly over-engineered way, but it turns out to be an interesting exercise in understanding how Java bytecode
works. So, let's hack in a `nameOf`!


## Rage against the Java Virtual Machine

First of all, it is important to understand how the JVM works. When the Java compiler compiles Java source code, it
emits Java bytecode. The bytecode usually contains quite a bit of debug information that can be used to match bytecode
instructions to their sources, which is why debugging Java works nicely in your IDEs. Another useful bit of information
that is usually stored in bytecode is names of local variables and — when compiling with `-parameters` — parameters.

The JVM is a stack machine that essentially reads instructions from the bytecode representation of a class. It executes
said instructions by pushing arguments onto the operand stack, popping them off to perform operations, and pushing
results back onto the stack for subsequent instructions.


## Implementing `nameOf`

To actually implement a `nameOf` method in Java, we will use two key APIs: The [StackWalker API](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StackWalker.html)
and the relatively recent [ClassFile API](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/classfile/ClassFile.html).
We can use the former to determine the frame from which our `nameOf` method was called. This frame contains multiple
important bits of information: The calling class, the calling method's name and descriptor, and even the bytecode index
within the calling method.

```java
Optional<StackWalker.StackFrame> optCallerFrame = STACK_WALKER.walk(frames -> frames.skip(1).findFirst());
if (optCallerFrame.isEmpty()) throw new IllegalStateException("Could not find caller frame");

StackWalker.StackFrame callerFrame = optCallerFrame.get();
Class<?> callerClass = callerFrame.getDeclaringClass();

int currentBci = callerFrame.getByteCodeIndex();
if (currentBci < 0) throw new IllegalArgumentException("Cannot determine bytecode index of caller. Ensure the JVM is not configured to strip bytecode indices.");
```

Using this information, we can locate the `.class` resource for the calling class and parse it into a `ClassModel`:

```java
String classResourceName = callerClass.getName().replace('.', '/') + ".class";
byte[] classBytes;

try (InputStream is = callerClass.getClassLoader().getResourceAsStream(classResourceName)) {
    classBytes = is.readAllBytes();
} catch (IOException e) {
    throw new RuntimeException(e);
}

ClassModel callerClassModel = ClassFile.of().parse(classBytes);
```

And this is where the fun begins! While it is fairly straightforward to find the correct method by comparing name and
descriptor, we still need to find what happens at the bytecode index inside the method. To achieve this, we essentially
have to implement a stack machine ourselves. We can iterate over the instructions that make up the body of the calling
method and simulate the operand stack.

Rather than storing actual runtime values, our simulated operand stack stores symbolic names (such as local variable or
field names). As instructions execute, these symbolic values are propagated through the simulated stack until we reach
the `nameOf` call.

Once we reach the desired instruction (which will always be a method invocation), we can recover the symbolic name of
the argument from our simulated stack.

```java
int byteCodeOffset = 0;
for (CodeElement element : codeModel.elementList()) {
    if (element instanceof Instruction instruction) {
        switch (instruction) {
            case FieldInstruction field -> {
                String name = field.name().stringValue();
                int i = name.indexOf('$');
                if (i != -1) name = name.substring(i + 1);

                switch (field.opcode()) {
                    case GETSTATIC -> stack.push(new StackValue(name));
                    case GETFIELD -> {
                        stack.pop();
                        stack.push(new StackValue(name));
                    }
                    case PUTSTATIC -> stack.pop();
                    case PUTFIELD -> {
                        stack.pop();
                        stack.pop();
                    }
                    default -> throw new RuntimeException("Unknown FIELD_ACCESS opcode: " + field.opcode());
                }
            }
            case InvokeInstruction invoke -> {
                MethodTypeDesc desc = invoke.typeSymbol();

                /*
                 * Pop the arguments in reverse order from the operand stack, to that args.getFirst() ends up
                 * being the *first* parameter passed to the invoked method.
                 */
                int paramCount = desc.parameterCount();
                List<StackValue> args = new ArrayList<>(Collections.nCopies(paramCount, null));
                for (int i = paramCount - 1; i >= 0; i--) {
                    args.set(i, stack.pop());
                }

                String methodName = invoke.method().name().stringValue();
                if (invoke.method().owner().name().equalsString("com/example/nameof/Name")
                    && methodName.equals("nameOf")
                    && byteCodeOffset == currentBci
                ) {
                    if (args.isEmpty()) {
                        throw new IllegalArgumentException("nameOf() call has no argument");
                    }

                    return args.getFirst().s;
                }

                if (!desc.returnType().equals(ConstantDescs.CD_void)) {
                    stack.push(new StackValue("<result:" + methodName + ">"));
                }
            }
            case LoadInstruction load -> stack.push(new StackValue(localVariables.get(load.slot())));
            case StoreInstruction _ -> stack.pop();
            // ... Handle all other instructions
            default -> throw new IllegalStateException("Unexpected instruction: " + instruction);
        }

        byteCodeOffset += instruction.sizeInBytes();
    }
}
```

## The Result

After putting everything together, we end up with a `nameOf` method that allows us to remove a bit of duplication at the
_small_ cost of an extremely unstable and potentially forward-incompatible implementation!

```java
public static MyObject create(String name) {
    if (name.isBlank()) throw new IllegalArgumentException(nameOf(name) + " must not be blank");
    // ...
}
```

```
jshell> create("");
java.lang.IllegalArgumentException: name must not be blank
```

### Should I Actually Use This?

**No!**

Not convinced yet? While the code seems to work fine, it is mostly untested. Even if it was tested, it would be prone to
break. Every new opcode that affects the operand stack could subtly break this implementation in unpredictable ways.
Possible failures range from exceptions to wrong results. This implementation will not work reliably across JVM
configurations and compiler implementations as these could strip optional debug symbols that this implementation relies
on. In short, **don't use this.**

[The full source code can be found here](https://github.com/CommittingCrimes/2026-08-04-java-nameof).
