---
name: test-analysis
description: Analyze completed A/B test results — determine winner, extract learnings, suggest next actions. Use when a test is finished and has final metrics.
---

# Test Analysis

Analyze completed A/B test results for media buying campaigns.

## When to use
- A test has finished running and has final data
- User says "analyze test", "test results", "test completado"

## Instructions

Act as a senior media buyer analyzing A/B test results.

Collect from user or context:
- What was tested (variable changed)
- Original hypothesis
- Platform (Meta/TikTok/Google/Native)
- Vertical (Auto Insurance/GLP-1/Debt Relief/ACA)
- Duration and total budget
- Variant A & B metrics: Spend, CTR%, CVR%, CPA, other relevant
- Baseline reference if exists

Respond with EXACTLY this structure:
1. **CONCLUSIÓN** (1 sentence)
2. **GANADOR** and why
3. **Statistical significance?** (yes/no + simple reasoning)
4. **TRANSFERABLE LEARNING** (what this tells us beyond this specific test)
5. **NEXT ACTION** (specific and actionable)
6. **NEW HYPOTHESIS** suggested based on this result

## Output format
- Be concise, direct, data-driven
- Always quantify: "CPA improved 23%" not "CPA improved"
- If data is insufficient, say so — don't force conclusions
- Tag confidence level: 🟢 high / 🟡 medium / 🔴 low
