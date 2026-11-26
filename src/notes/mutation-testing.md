---
title: Mutation testing
date: 2026-11-21
description: What is mutation testing, and why it matters even more in an agent-driven world.
---

Disclaimer:  This is 100% placeholder slop.

Line coverage tells you which lines of code executed while your tests ran, not whether your assertions would actually notice if those lines behaved differently.

It's worth re-reading that above sentence again

Mutation testing addresses that gap by making small, automated changes (mutants) to your source code, such as flipping conditionals, changing arithmetic operators, or removing return values, and re-running the test suite against each mutant. If the tests still pass, the mutant *survived*, pointing to a blind spot in your assertions.

Consider a simple boundary check:

```ts
export function isEligibleForDiscount(quantity: number): boolean {
  // Original condition: >=
  // A common mutant swaps >= for >
  return quantity >= 10;
}
```

If every test passes `quantity = 12` or `quantity = 5` and nothing exercises `quantity = 10`, line coverage stays at 100%, yet the `>` mutant survives unnoticed. Adding a boundary test turns that surviving mutant into a caught regression.

## How it works

A mutation testing tool parses your source, applies one small change at a time, and runs the tests that cover the changed code. Each mutant ends up in one of a few states:

- **Killed:** at least one test failed, which is what you want.
- **Survived:** every test passed, so nothing noticed the change.
- **Timed out:** the mutant caused an infinite loop, which usually counts as killed.
- **No coverage:** no test touched the mutated line at all.

The *mutation score* is the percentage of mutants killed. Unlike line coverage, it measures whether your tests can detect a change in behaviour, not just whether they ran the code.

## Common mutators

Most tools ship a similar set of mutation operators:

| Category | Original | Mutant |
| --- | --- | --- |
| Conditional boundary | `a >= b` | `a > b` |
| Negated conditional | `a === b` | `a !== b` |
| Arithmetic | `a + b` | `a - b` |
| Logical | `a && b` | `a \|\| b` |
| Return value | `return total` | `return 0` |
| Statement removal | `audit.log(event)` | *(deleted)* |
| String literal | `"active"` | `""` |

Each of these maps to a real class of bug: off-by-one errors, inverted checks, forgotten side effects, and silently dropped return values.

## A second example

Boundary conditions are the classic case, but removed side effects are just as common:

```ts
export function checkout(cart: Cart, payments: PaymentGateway, audit: AuditLog) {
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  payments.charge(cart.customerId, total);
  audit.record("checkout", { customerId: cart.customerId, total });

  return { total };
}
```

If your tests only assert on the returned `total`, a mutant that deletes the `audit.record(...)` call survives. The behaviour changed, compliance would be unhappy, and every test is still green. Asserting that the audit log received the expected entry kills it.

```ts
it("records an audit entry for each checkout", () => {
  const audit = { record: vi.fn() };
  checkout(cartWithTwoItems, fakeGateway, audit);

  expect(audit.record).toHaveBeenCalledWith("checkout", {
    customerId: "cust_123",
    total: 45,
  });
});
```

## Running it in practice

Mutation testing is expensive. A suite that takes a minute to run might need to run hundreds of times, once per mutant. A few habits keep it practical:

1. **Scope it.** Start with a single module or a critical directory rather than the whole repository.
2. **Run incrementally.** Only mutate files changed in the current branch and cache results between runs.
3. **Use coverage data.** Skip mutants on lines no test executes; they will trivially survive and add noise.
4. **Run in CI on a schedule.** A nightly or weekly full run is often a better fit than blocking every pull request.
5. **Parallelise.** Mutants are independent, so they split cleanly across workers.

## Reading the results

A surviving mutant is a question, not a verdict. Before writing a new test, ask:

- Is this a genuine gap in my assertions?
- Is the mutant *equivalent*, meaning it changes the code without changing observable behaviour (for example, `i < 10` versus `i != 10` in a loop that always exits earlier)?
- Is the code itself dead, and should it simply be deleted?

Equivalent mutants are the main source of false positives. You can't eliminate them entirely, which is why chasing a 100% mutation score is rarely worth it. A score in the 70–85% range on important code is a healthy target for many teams.

## Where it fits

Mutation testing doesn't replace code coverage, property-based testing, or code review. It complements them by answering a different question: *if this code were wrong, would my tests tell me?*

Used selectively on the logic that matters most, such as pricing, permissions, and data transformations, it tends to surface a handful of high-value missing assertions rather than a mountain of busywork. That is usually enough to justify the runtime.

## Further reading

- The documentation for your language's mutation testing tool, such as Stryker for JavaScript and TypeScript, PIT for Java, or mutmut for Python.
- Research on the *coupling effect*, which argues that tests that catch simple mutants also tend to catch more complex faults.
- Your own test suite: pick one critical function, mutate it by hand, and see whether anything fails.
