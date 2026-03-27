# Media Buying Management System

## Tech Stack
- Next.js 14, TypeScript, Tailwind CSS
- PostgreSQL (Docker), Prisma ORM
- Python for automations
- Meta Marketing API, Redtrack API

## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/` — React components (Notion-style UI)
- `src/services/` — Business logic, API integrations
- `src/lib/` — Shared utilities, DB client
- `src/types/` — TypeScript type definitions

## Conventions
- Always write tests before code (TDD)
- Use conventional commits (feat:, fix:, refactor:)
- Never commit directly to main — use feature branches
- Run `npm run lint && npm run typecheck` before PR
- Keep components small, single-responsibility
- Use server components by default, client only when needed

## Data Model
5-stage workflow: Input → Triage → Planning → Execution → Analysis
Core entities: Tests (with A/B variants tracking), KnowledgeBase entries (5 categories, confidence levels), DailyNotes, Campaigns, Verticals

## Security
- No secrets in code — use environment variables
- Validate all user inputs with Zod
- Use parameterized queries only (Prisma handles this)
- API keys stored in `.env.local` (never committed)

## Testing
- Unit tests: Vitest
- Integration tests: real DB via Docker test container
- E2E: Playwright for critical flows

## Context for Claude
- User is a media buyer senior in affiliate marketing
- Verticals: Auto Insurance, GLP-1, Debt Relief, ACA
- 12 Meta accounts, 1 Redtrack account
- Desktop-first UI, responsive secondary
- Visual style: Notion-minimalist with dense data views
