---
name: backlog-prioritization
description: Prioritize pending test hypotheses by impact, effort, and urgency. Use when user has multiple hypotheses and needs to decide which to run first.
---

# Backlog Prioritization

Rank and prioritize pending test hypotheses.

## When to use
- Multiple hypotheses in backlog need ordering
- User says "prioritize", "which test first", "rank hypotheses"

## Instructions

For each hypothesis, collect:
- Description
- Estimated impact (High/Medium/Low)
- Implementation effort (High/Medium/Low)
- Urgency (High/Medium/Low)

Additional context needed:
- Available testing budget this week
- Current constraints (capped verticals, diversification goals)
- Team objective this month

Respond with:
1. **RANKING** of hypotheses with justification
2. **DISCARD** which to skip for now and why
3. **EXECUTION ORDER** — what to test in parallel vs sequential

## Prioritization framework
- Protect Profit items always rank first
- High impact + Low effort = immediate
- Consider capacity: max 1 profit focus + 1 strategic test + 1-2 operational
- Flag if total exceeds weekly capacity
