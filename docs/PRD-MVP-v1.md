# PRD: Media Buying Management System — MVP v1

## Problem Statement

As a media buyer senior running campaigns across multiple verticals and platforms, I manage my daily testing, execution, and learning workflow in Obsidian using markdown files and folders. The system works logically but is entirely manual: moving items between stages is tedious, there's no filtering or cross-referencing, data entry is repetitive, and the folder-based organization makes it hard to get a quick overview of what's active, what's pending, and what was learned. I need a web app that preserves my proven 5-stage workflow but eliminates the manual friction.

## Solution

A desktop-first web app with a Notion-style minimal UI that implements the existing 5-stage media buying workflow (Input → Triage → Planning → Execution → Analysis) as a single-user tool. The app replaces Obsidian with structured data, filterable views, drag & drop stage transitions, and a central dashboard that shows the daily plan, weekly focus, and system status at a glance. No API integrations in v1 — data entry remains manual but streamlined through forms and templates.

## User Stories

1. As a media buyer, I want a collapsible sidebar with all sections, so that I can navigate quickly without losing screen space
2. As a media buyer, I want a dashboard showing today's daily note, weekly plan, and active tests summary, so that I open the app and immediately know what to do
3. As a media buyer, I want to capture inputs quickly with a simple form (input, source, date, context, link), so that I don't lose ideas while working
4. As a media buyer, I want an inbox that shows all uncategorized inputs, so that I can process them during triage
5. As a media buyer, I want to classify inputs by type (tarea, hipótesis, dependencia, idea, urgencia) during triage, so that each input gets proper treatment
6. As a media buyer, I want to assign buckets (Protect Profit, Testing Operativo, R&D Estratégico, Pipeline/Dependencias) to each input, so that work is organized by strategic priority
7. As a media buyer, I want to assign priority (hoy, esta semana, backlog, estacionado) to each input, so that I know when to act on it
8. As a media buyer, I want to convert an input into a hypothesis with a single action, so that the transition from idea to test is seamless
9. As a media buyer, I want a hypothesis to require: attackable variable, observable metric, concrete context, isolatable variable, and worth testing — so that only valid hypotheses become tests
10. As a media buyer, I want to see tests in both Kanban view (by status) and Table view (filterable), so that I can drag items or search/sort depending on the task
11. As a media buyer, I want to drag a test from Backlog to Active in Kanban view, so that I can activate tests quickly
12. As a media buyer, I want a test detail panel that opens on click without leaving the list, so that I can review multiple tests quickly
13. As a media buyer, I want to expand the test detail panel to a full page, so that I have space to edit tracking data and analysis
14. As a media buyer, I want each test to have: hypothesis, category, platform, vertical, success metric, secondary metric, victory threshold, budget, duration, baseline, and controlled variables — so that tests are properly documented
15. As a media buyer, I want to log daily tracking per variant (date, spend, primary metric, secondary metric, notes) in a table, so that I can track test performance over time
16. As a media buyer, I want to support Variant A and Variant B tracking tables, so that A/B comparisons are structured
17. As a media buyer, I want to classify a completed test as Ganador, Perdedor, or Inconcluso, so that results are clear
18. As a media buyer, I want to define next steps for a completed test (Escalar, Sostener, Retestear, Pedir variante, Archivar), so that every test leads to an action
19. As a media buyer, I want to write an analysis section and a learning section for each completed test, so that knowledge is captured
20. As a media buyer, I want the learning from a test to be saveable directly to the Knowledge Base, so that the KB grows from real results
21. As a media buyer, I want a Knowledge Base with all learnings in a single filterable table (by category, vertical, platform, confidence), so that I can find specific learnings quickly
22. As a media buyer, I want KB entries to have: source, category (Audiencias/Configuraciones/Creativos/Copies-CTAs/Landing Pages), platform, vertical, confidence level (high/medium/low), learning statement, and context — so that learnings are structured and searchable
23. As a media buyer, I want a daily note integrated in the dashboard that shows: active items, decisions taken, learnings, what stays/stops/scales, and tomorrow's plan — so that my daily execution is documented
24. As a media buyer, I want tomorrow's plan to include: 1 profit focus, 1 test focus, 1 dependency, 1 success criterion — so that each day starts with clarity
25. As a media buyer, I want a weekly planning section in the dashboard with: week focus, profit focus, strategic test, operational lines, dependencies, "do not touch" list, and tentative sequence — so that the week has direction
26. As a media buyer, I want capacity rules enforced: max 1 profit focus, 1 strategic test, 1-2 operational lines — so that I don't overcommit
27. As a media buyer, I want to see previous daily notes in a history/calendar view, so that I can review past execution
28. As a media buyer, I want test status badges (🔴 Backlog, 🟡 Activo, ✅ Done, ❌ Descartado) visible in all views, so that status is always clear
29. As a media buyer, I want to filter tests by vertical (Auto Insurance, GLP-1, Debt Relief, ACA), so that I can focus on one vertical at a time
30. As a media buyer, I want to filter tests by platform (Meta, TikTok, Google, Native), so that I can analyze platform-specific patterns
31. As a media buyer, I want the triage view to show the 6 triage questions as a checklist, so that I follow the process consistently
32. As a media buyer, I want a quick-add button accessible from anywhere in the app, so that I can capture inputs without navigating to Inbox

## Implementation Decisions

### Architecture
- **Next.js App Router** with server components by default, client components only for interactive elements (drag & drop, forms, modals)
- **PostgreSQL** via Docker container, managed through **Prisma ORM**
- **Tailwind CSS** for styling, Notion-inspired design tokens (neutral colors, clean typography, subtle borders)

### Modules

1. **Layout Module**
   - Collapsible sidebar with navigation items: Dashboard, Inbox, Triage, Tests, Knowledge Base
   - Sidebar state persisted in localStorage
   - Main content area with responsive padding
   - Quick-add input button in sidebar or header

2. **Dashboard Module**
   - Composed of 3 sub-sections: Daily Note (today), Weekly Plan (current week), Status Summary (active tests count, backlog count, recent learnings)
   - Daily Note is editable inline
   - Weekly Plan is editable inline
   - Status Summary pulls live counts from the database

3. **Inbox Module**
   - Simple form: text input, source (dropdown or free text), context, link (optional)
   - Auto-fills date
   - List view of all unprocessed inputs sorted by date (newest first)
   - Bulk actions: select multiple → move to triage

4. **Triage Module**
   - Shows inputs pending classification
   - Per-input form: type selector, bucket selector, priority selector
   - Triage questions displayed as reference checklist
   - "Convert to Hypothesis" action that creates a Test entity pre-filled from the input
   - Validation: hypothesis conversion requires the 5 criteria to be acknowledged

5. **Tests Module**
   - Dual view: Kanban (columns by status) and Table (sortable, filterable)
   - View toggle persisted in localStorage
   - Kanban: drag & drop only Backlog → Activo
   - Table: columns for name, status, vertical, platform, primary metric, date, category
   - Filters: status, vertical, platform, category
   - Click → side panel with test summary
   - Expand button → full page with complete test form
   - Test form sections: metadata, hypothesis, setup, daily tracking (Variant A + B tables), analysis, KB learning
   - Daily tracking: add row per day with date, spend, primary metric, secondary metric, notes
   - Closing: result classification + next step + analysis text + learning extraction

6. **Knowledge Base Module**
   - Single table view with all learnings
   - Columns: title, source test, category, platform, vertical, confidence, date
   - Filters: category, platform, vertical, confidence level
   - Click → detail view with full learning content
   - Create from scratch or linked from a test's learning section

7. **Database Schema (Prisma)**
   - `Input`: id, text, source, date, context, link, status (inbox/triaged/converted), type, bucket, priority, createdAt
   - `Test`: id, title, status (backlog/active/done/discarded), hypothesis, category, platform, vertical, successMetric, secondaryMetric, victoryThreshold, budget, duration, baseline, controlledVariables, result (winner/loser/inconclusive), nextStep, analysis, createdAt, startDate, closeDate
   - `TrackingEntry`: id, testId, variant (A/B), date, spend, primaryMetric, secondaryMetric, notes
   - `KBEntry`: id, testId (nullable), title, category, platform, vertical, confidence (high/medium/low), learning, context, createdAt
   - `DailyNote`: id, date (unique), activeItems, decisions, learnings, staysEqual, stops, scales, tomorrowProfitFocus, tomorrowTestFocus, tomorrowDependency, tomorrowSuccessCriterion
   - `WeeklyPlan`: id, weekStart (unique), weekFocus, profitFocus, strategicTest, operationalLines, dependencies, doNotTouch, tentativeSequence

### UI Decisions
- Notion-style: white background, subtle gray borders, system font stack, 14px base
- Status badges with color coding throughout
- Side panel: 400px wide, slides from right, overlay on mobile
- Forms use inline editing where possible (click to edit, not separate edit mode)
- Drag & drop via `@dnd-kit/core` (lightweight, accessible)
- Tables via `@tanstack/react-table` (sorting, filtering, pagination)

### API Routes (Next.js Route Handlers)
- `/api/inputs` — CRUD for inputs
- `/api/inputs/[id]/convert` — Convert input to test
- `/api/tests` — CRUD for tests
- `/api/tests/[id]/tracking` — CRUD for tracking entries
- `/api/tests/[id]/complete` — Close test with result + learning
- `/api/kb` — CRUD for KB entries
- `/api/daily-notes` — CRUD for daily notes
- `/api/weekly-plans` — CRUD for weekly plans

## Testing Decisions

A good test verifies external behavior from the user's perspective, not internal implementation. Tests should be resilient to refactoring — if the behavior stays the same, the test should pass regardless of how the code is structured internally.

### Modules to test (progressively, optimize one by one):

1. **Database/Prisma layer** — Verify queries return correct data, relationships work, constraints are enforced. Use real PostgreSQL via Docker test container (no mocks).

2. **API Routes** — Test each endpoint: valid requests return correct responses, invalid requests return proper errors, edge cases (empty states, duplicates, missing fields) are handled.

3. **Triage logic** — Test input → hypothesis conversion: validates 5 criteria, creates Test with correct pre-filled data, updates input status.

4. **Tests lifecycle** — Test state transitions: backlog → active → done/discarded. Verify tracking entries link correctly, completion creates KB entry.

5. **Knowledge Base** — Test filtering combinations, test-to-KB linking, standalone entry creation.

6. **UI components** — Playwright E2E for critical flows: create input → triage → create test → add tracking → complete test → verify KB entry.

### Testing tools:
- **Vitest** for unit and integration tests
- **Playwright** for E2E critical flows
- **Docker test container** for real PostgreSQL in tests
- External API mocks with realistic fixtures (for v2)

## Out of Scope (v2+)

- Meta Marketing API integration (auto-load spend)
- Redtrack API integration (auto-load revenue)
- Claude API integration for automated test analysis
- Assisted weekly/daily planning (AI-generated suggestions)
- Charts and metric visualizations
- Multi-user support and authentication
- Mobile-optimized views
- Data import from existing Obsidian vault
- Notifications and alerts
- Export functionality (PDF, CSV)

## Further Notes

- The existing Obsidian vault at `Media Buying Vault 2/` contains the source of truth for the data model: 2 completed tests (H01, H02), 4 backlog items (H03-H06), 5 KB categories, 3 daily notes, and the complete template system. Use these as reference for field names and data structure.
- The 5 master prompts (test analysis, backlog prioritization, hypothesis generation, test check-in, KB synthesis) are already configured as Claude Code skills. In v2, these will be integrated directly into the app via Claude API.
- Capacity rules (1 profit focus, 1 strategic test, 1-2 operational lines) should be enforced as soft warnings, not hard blocks — the user may occasionally need to override them.
- The system's core principle: "Primero proteger revenue. Después explorar." This should inform default sorting and prioritization logic.
