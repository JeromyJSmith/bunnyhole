# Bunnyhole Project Rules

## Runtime & Package Management

### ✅ Always Use: Bun

- **Package Manager:** `bun install` (NOT `npm install`)
- **Run Scripts:** `bun run <script>` (NOT `npm run`)
- **Execute Packages:** `bunx <package>` (NOT `npx <package>`)
- **Add Packages:** `bun add <package>` (NOT `npm install`)
- **Remove Packages:** `bun remove <package>` (NOT `npm uninstall`)

### ❌ Never Use:

- `npm` (except in CI/CD if specifically required)
- `npx` (use `bunx` instead)
- `yarn` (we use bun)
- `pnpm` (we use bun)

## Technology Stack

### Core Infrastructure

1. **Bun** - JavaScript runtime and package manager
2. **Inngest** - Event-driven workflow orchestration
3. **LiveKit Agents** - Real-time video/audio
4. **n8n** - Visual workflow automation
5. **PostgreSQL** - Primary database
6. **Redis** - Caching and rate limiting
7. **Neo4j** - Graph database

### What We DON'T Use

- ❌ **Kafka** - Removed (use Inngest for events)
- ❌ **Kestra** - Not implemented
- ❌ **npm/npx** - Use bun/bunx
- ❌ **Node.js directly** - Use Bun runtime

## Python Management

### ✅ Always Use: uv

- **Package Manager:** `uv` (NOT `pip` or `poetry` directly)
- **Virtual Env:** `uv venv`
- **Install:** `uv pip install <package>`
- **Sync:** `uv pip sync requirements.txt`

## Common Commands

### Starting Services

```bash
# Docker services
docker compose up -d

# Inngest Dev Server
bunx inngest-cli@latest dev -u http://localhost:3000/api/inngest

# API Server
bun run dev:server

# Web App
bun run dev:web

# Python Agents (from apps/agents/)
source .venv/bin/activate
uvicorn src.main:app --reload
```

### Package Management

```bash
# Install dependencies
bun install

# Add package
bun add <package>

# Add dev dependency
bun add -D <package>

# Run package without installing
bunx <package>
```

## Port Assignments

| Service | Port | URL |
|---------|------|-----|
| API Server | 3000 | http://localhost:3000 |
| Web App | 3000 | http://localhost:3000 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |
| Neo4j HTTP | 7474 | http://localhost:7474 |
| Neo4j Bolt | 7687 | bolt://localhost:7687 |
| n8n | 5678 | http://localhost:5678 |
| Inngest Dev | 8288 | http://localhost:8288 |

## Code Style

- Use **TypeScript** for all Node.js code
- Use **Python 3.13+** with type hints
- Format with **Biome** (not Prettier)
- Lint with **Ultracite**

## Environment Variables

### Always Required

- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ORIGIN` - Frontend URL (http://localhost:3000)

### Optional (Feature-specific)

- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` - Video features
- `INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY` - Production Inngest

## Scripts

### Quick Commands

```bash
./start-all.sh              # Start everything
./check-status.sh           # Check service status
bun run health-check.ts     # Full health check
bun run test-docker-services.ts  # Test Docker services
```

## Documentation

- **Setup:** `SETUP.md`
- **Current Status:** `CURRENT-STATUS.md`
- **Test Report:** `TEST-REPORT.md`
- **This File:** `.cursor/PROJECT-RULES.md`

---

**Last Updated:** October 19, 2025

