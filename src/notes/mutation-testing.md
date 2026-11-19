---
title: Mutation testing
date: 2026-11-19
description: Placeholder note on mutation testing and measuring test suite effectiveness beyond line coverage.
slug: mutation-testing
---
<div class="placeholder-notice">
  <strong>Placeholder copy:</strong> This note is a temporary placeholder. The full post on mutation testing will replace this text later.
</div>

Line coverage tells you which lines of code executed while your tests ran, not whether your assertions would actually notice if those lines behaved differently.

Mutation testing addresses that gap by making small, automated changes (mutants) to your source code—flipping conditionals, changing arithmetic operators, or removing return values—and re-running the test suite against each mutant. If the tests still pass, the mutant *survived*, pointing to a blind spot in your assertions.

Consider a simple boundary check:

```ts
export function isEligibleForDiscount(quantity: number): boolean {
  // Original condition: >=
  // A common mutant swaps >= for >
  return quantity >= 10;
}
```

If every test passes `quantity = 12` or `quantity = 5` and nothing exercises `quantity = 10`, line coverage stays at 100%, yet the `>` mutant survives unnoticed. Adding a boundary test turns that surviving mutant into a caught regression.
