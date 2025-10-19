# Bunnyhole Platform Setup Guide

Complete setup instructions for the Real-Time AI Video Streaming Platform.

## Prerequisites

Before starting, ensure you have the following installed:

- **[Bun](https://bun.sh)** v1.2.19 or higher
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (for local services)
- **[Git](https://git-scm.com/)**
- **[Node.js](https://nodejs.org/)** v20+ (for some tooling)
- **[uv](https://github.com/astral-sh/uv)** for python package management

### Optional Tools

- **[Supabase CLI](https://supabase.com/docs/guides/cli)** - For database management
- **[VS Code](https://code.visualstudio.com/)** with Cursor extension

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/JeromyJSmith/bunnyhole.git
cd bunnyhole
```

### 2. Install Dependencies

```bash
make install
```

This will install both Node.js and Python dependencies.

### 3. Start Docker Services

```bash
docker compose up -d
```

This starts:
- **PostgreSQL** (port 5432) - Primary database
- **Redis** (port 6379) - Caching and rate limiting
- **Neo4j** (ports 7474, 7687) - Graph database
- **n8n** (port 5678) - Workflow automation

### 4. Configure Environment Variables

Create environment files by copying the examples:

**Server:**
```bash
cp apps/server/.env.example apps/server/.env
# Edit apps/server/.env with your API keys
```

**Web:**
```bash
cp apps/web/.env.example apps/web/.env
# Edit apps/web/.env with your public keys
```

**Native (Mobile):**
```bash
cp apps/native/.env.example apps/native/.env
# Edit apps/native/.env with your settings
```

### 5. Set Up Database Schema

```bash
make db-push
```

### 6. Start Development Servers

```bash
make dev
```

Or start individual apps:

```bash
make dev-web      # Web app on http://localhost:3000
make dev-server   # API server on http://localhost:3001
make dev-native   # Mobile app (Expo)
make dev-agents   # Python agents service
```

## Python Agent Service Setup

The python agent service is located in `apps/agents`. It uses `uv` for package management.

### Create a virtual environment

```bash
cd apps/agents
uv venv
```

### Install dependencies

```bash
uv pip install -r requirements.txt
```

### Running the service

```bash
make dev-agents
```

## Environment Variables

### Required API Keys

You'll need to obtain API keys for:

1. **Supabase** - [https://supabase.com](https://supabase.com)
2. **LiveKit** - [https://livekit.io](https://livekit.io)
3. **OpenAI** (Optional) - [https://platform.openai.com](https://platform.openai.com)
4. **Anthropic** (Optional) - [https://console.anthropic.com](https://console.anthropic.com)
5. **Google AI** (Optional) - [https://ai.google.dev](https://ai.google.dev)
6. **Better Auth Secret** - Generate with `openssl rand -base64 32`
7. **Inngest** (Optional) - [https://app.inngest.com](https://app.inngest.com)

### Required Environment Variables

**Server (`apps/server/.env`):**
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/bunnyhole

# CORS
CORS_ORIGIN=http://localhost:3000

# LiveKit (Get from https://cloud.livekit.io)
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret

# Better Auth
BETTER_AUTH_SECRET=your-secret-here

# Inngest (Optional)
INNGEST_EVENT_KEY=your-event-key
INNGEST_SIGNING_KEY=your-signing-key
```

**Python Agents (`apps/agents/.env`):**
```env
# Inngest
INNGEST_EVENT_KEY=your-event-key
INNGEST_SIGNING_KEY=your-signing-key

# LiveKit
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret

# Logging
LOG_LEVEL=INFO
```

### Environment File Structure

See `.env.example` files in:
- `apps/server/.env.example`
- `apps/web/.env.example`
- `apps/native/.env.example`
- `apps/agents/.env` (created during setup)

## Docker Services

- **Starting Services:** `make docker-up`
- **Stopping Services:** `make docker-down`
- **Viewing Logs:** `make docker-logs`

## Database Management

- **Push Schema Changes:** `make db-push`
- **Open Database Studio:** `make db-studio`
- **Generate Migrations:** `make db-generate`
- **Run Migrations:** `make db-migrate`

## Development Workflow

- **Running Linters:** `make check`
- **Type Checking:** `bun run check-types`

## Health Check

Run the comprehensive health check to verify all services:

```bash
export $(cat apps/server/.env | grep -v "^#" | xargs)
bun run health-check.ts
```

This will test:
- PostgreSQL connection
- Redis connection
- Neo4j connection
- n8n availability
- API server status
- tRPC endpoints
- Environment variables

## Troubleshooting

### Docker Compose Version Warning
If you see a warning about `version` attribute being obsolete, this has been fixed in `docker-compose.yml`.

### n8n Workflow Automation
n8n provides a visual workflow builder accessible at http://localhost:5678 after starting Docker services. Use it to create automation workflows and integrations.

### Redis Password Configuration
If Redis fails to start with "wrong number of arguments" for `requirepass`, ensure the password is either set explicitly or the `--requirepass` flag is removed from the command.

### Port Already in Use
If you see "port 3001 in use" error:
```bash
lsof -ti :3001 | xargs kill -9
```

### Python Dependencies Issues
If Python packages aren't installing correctly with `uv pip sync`:
```bash
cd apps/agents
uv pip install fastapi "uvicorn[standard]" inngest livekit-agents python-dotenv
```

### Database Connection Failed
Make sure:
1. Docker services are running: `docker compose ps`
2. DATABASE_URL is set in `apps/server/.env`
3. PostgreSQL is accessible: `psql postgresql://postgres:postgres@localhost:5432/bunnyhole`

### Inngest/LiveKit Services Unavailable
These services require API keys from their respective platforms:
- **Inngest**: Sign up at https://app.inngest.com
- **LiveKit**: Sign up at https://livekit.io

Until you configure these, related features won't be fully functional but the rest of the platform will work.

## Project Structure

```
bunnyhole/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── server/       # Hono API backend
│   ├── native/       # React Native mobile app
│   └── agents/       # Python agents service
├── packages/
│   ├── api/          # tRPC routers
│   ├── auth/         # Better Auth configuration
│   └── db/           # Drizzle ORM schemas
├── docker-compose.yml
├── Makefile
├── health-check.ts   # Comprehensive health check script
└── SETUP.md (this file)
```