---
name: test-checkin
description: Mid-test check-in to decide whether to continue, pause, or kill a running test. Use when a test is active and needs a go/no-go decision.
---

# Test Check-in

Evaluate an active test mid-flight and recommend action.

## When to use
- A test is currently running and needs evaluation
- User says "check test", "should I kill this", "test check-in"

## Instructions

Collect from user:
- What is being tested
- Days running
- Spend so far vs total budget assigned
- Current data per variant: Spend, CTR%, CVR%, CPA, Conversions
- Baseline reference

Respond with:
1. **Kill any variant now?** Yes/No + why
2. **Enough data to conclude?** Yes/No
3. **How much longer to run** if no conclusion yet
4. **Anything suspicious in the data?** (anomalies, learning phase issues, audience overlap)

## Decision rules
- Less than 50 conversions per variant = likely insufficient data
- If one variant has 2x+ CPA after significant spend, recommend kill
- Flag if still in Meta learning phase (<50 conversion events)
- Consider day-of-week effects if less than 7 days of data
