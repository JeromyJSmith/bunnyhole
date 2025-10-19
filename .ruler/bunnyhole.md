# Bunnyhole Platform Rules

## Core Technology Stack

This project uses:
- **Bun** (NOT Node.js/npm/npx) - Runtime and package manager
- **Inngest** (NOT Kafka) - Event orchestration
- **LiveKit Agents** - Real-time video/audio
- **n8n** (NOT Kestra) - Workflow automation
- **uv** - Python package management

## Package Management Commands

### JavaScript/TypeScript (Use Bun)

```bash
# Install dependencies
bun install

# Add packages
bun add <package>

# Run scripts
bun run <script>

# Execute packages (like npx)
bunx <package>
```

### ❌ Never Use:
- `npm install` → Use `bun install`
- `npm run` → Use `bun run`
- `npx` → Use `bunx`
- `yarn` or `pnpm` → Use `bun`

### Python (Use uv)

```bash
# Create virtual environment
uv venv

# Install packages
uv pip install <package>

# Install from requirements
uv pip install -r requirements.txt
```

## Service Ports

- API Server: **3000**
- n8n: **5678**
- Inngest Dev: **8288**
- PostgreSQL: **5432**
- Redis: **6379**
- Neo4j HTTP: **7474**
- Neo4j Bolt: **7687**

## Quick Start Commands

```bash
# Start Docker services
docker compose up -d

# Start Inngest Dev Server
bunx inngest-cli@latest dev -u http://localhost:3000/api/inngest

# Start API Server
bun run dev:server

# Quick status check
./check-status.sh

# Everything at once
./start-all.sh
```

## What's NOT Used

- ❌ Kafka - Removed (use Inngest)
- ❌ Kestra - Never implemented
- ❌ npm/npx - Use bun/bunx
- ❌ Node.js directly - Use Bun runtime

## Architecture Notes

- **Monorepo:** Turborepo with bun workspaces
- **Backend:** Hono API server
- **Frontend:** Next.js
- **Mobile:** React Native with Expo
- **Agents:** Python FastAPI service
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** Better Auth
- **API:** tRPC for type-safe endpoints

