---
name: kb-synthesis
description: Monthly synthesis of all completed tests to extract cross-test patterns, anti-patterns, and second-order hypotheses. Use for knowledge base review.
---

# Knowledge Base Synthesis

Extract patterns from multiple completed tests.

## When to use
- Monthly review of completed tests
- User says "synthesize KB", "monthly review", "extract patterns"

## Instructions

Collect: all test learnings from the period (user pastes or system provides).

Respond with:
1. **PATTERNS** — what is working consistently across tests
2. **ANTI-PATTERNS** — what definitively does not work in this context
3. **SECOND-ORDER HYPOTHESES** — what these results suggest together that wouldn't be visible in each test individually
4. **TESTING GAPS** — what we are NOT testing that we should be

## Rules
- Minimum 3 completed tests needed for meaningful synthesis
- Cross-reference across verticals and platforms
- Tag each pattern with confidence level based on sample size
- Highlight contradictions between test results
- Output should update the Knowledge Base categories: Audiencias, Configuraciones, Creativos, Copies/CTAs, Landing Pages
