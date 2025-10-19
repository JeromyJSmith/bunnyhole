# 🎬 Bunnyhole

**Real-Time AI Video Streaming Platform**

A modern TypeScript monorepo built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), combining Next.js, Hono, tRPC, and cutting-edge AI/video technologies.

## 🚀 Quick Start

For detailed setup instructions, see **[SETUP.md](./SETUP.md)**.

```bash
# Install dependencies
make install

# Start Docker services (PostgreSQL, Redis, Neo4j, Kafka)
make docker-up

# Set up environment variables
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env

# Push database schema
make db-push

# Start all development servers
make dev
```

## ✨ Features

### Core Stack
- **TypeScript** - Full type safety across the stack
- **Next.js 15** - React 19 with App Router
- **React Native** - Cross-platform mobile with Expo
- **Hono** - Ultra-fast edge-first backend
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Lightning-fast JavaScript runtime
- **Turborepo** - Optimized monorepo builds

### Real-Time & Streaming
- **LiveKit** - Real-time video/audio streaming
- **WebSockets** - Bidirectional communication
- **Kafka** - Event streaming and messaging

### AI Integration
- **OpenAI** - GPT-4, DALL-E, Whisper
- **Anthropic** - Claude AI models
- **Google AI** - Gemini models
- **Vercel AI SDK** - Unified AI interface

### Database & Cache
- **PostgreSQL** - Primary database (Drizzle ORM)
- **Redis** - Caching and rate limiting
- **Neo4j** - Graph database for relationships
- **Supabase** - Database hosting & auth

### Workflow & Orchestration
- **Inngest** - Durable workflow orchestration
- **n8n** - Workflow automation (optional)
- **Kestra** - Data orchestration (optional)

### Developer Experience
- **Biome** - Fast linting and formatting
- **Ultracite** - AI-friendly code quality
- **Docker Compose** - Local service orchestration
- **Makefile** - Convenient CLI commands
- **OpenSpec** - Spec-driven development
- **Husky** - Git hooks for quality gates

## 🏗️ Architecture

### Monorepo Structure

```
bunnyhole/
├── apps/
│   ├── web/         # Next.js frontend (port 3000)
│   ├── server/      # Hono API backend (port 3001)
│   └── native/      # React Native mobile app
├── packages/
│   ├── api/         # tRPC routers and procedures
│   ├── auth/        # Better Auth configuration
│   └── db/          # Drizzle ORM schemas
├── docker-compose.yml
├── Makefile
└── SETUP.md
```

## 🛠️ Development

### Quick Commands

```bash
make help          # Show all available commands

# Development
make dev           # Start all apps
make dev-web       # Web app only
make dev-server    # API server only
make dev-native    # Mobile app only

# Docker Services
make docker-up     # Start PostgreSQL, Redis, Neo4j, Kafka
make docker-down   # Stop all services
make docker-logs   # View service logs

# Database
make db-push       # Push schema changes
make db-studio     # Open Drizzle Studio
make db-generate   # Generate migrations
make db-migrate    # Run migrations

# Maintenance
make clean         # Clean build artifacts
make check         # Run linter
```

### Docker Services

When you run `make docker-up`, the following services start:

- **PostgreSQL** (5432) - Primary database
- **Redis** (6379) - Cache & rate limiting
- **Neo4j** (7474, 7687) - Graph database
- **Kafka** (9092, 9094) - Event streaming

Access Neo4j Browser at [http://localhost:7474](http://localhost:7474)

## 📱 Applications

### Web App (Next.js)
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Framework**: Next.js 15 with React 19
- **UI**: TailwindCSS 4 + shadcn/ui
- **Features**: Real-time video, AI chat, dashboard

### API Server (Hono)
- **URL**: [http://localhost:3001](http://localhost:3001)
- **Framework**: Hono with tRPC
- **Features**: Authentication, video streaming, AI integration

### Mobile App (React Native)
- **Framework**: Expo with NativeWind
- **Features**: Native video, offline support, push notifications







## 🔑 Environment Variables

Each app requires environment configuration. See `.env.example` files:

- `apps/server/.env.example` - Backend API keys and database URLs
- `apps/web/.env.example` - Frontend public keys
- `apps/native/.env.example` - Mobile app configuration

**Required Services:**
- Supabase (database & auth)
- LiveKit (video streaming)
- Better Auth secret (generate with `openssl rand -base64 32`)

**Optional Services:**
- OpenAI, Anthropic, Google AI (AI features)
- RunPod (GPU computing)
- Inngest (workflows)

## 🧪 Testing & Quality

```bash
bun run check        # Run Biome linter
bun run check-types  # TypeScript type checking
```

## 📚 Documentation

- **[Setup Guide](./SETUP.md)** - Complete installation instructions
- **[Notion Workspace](https://www.notion.so/Real-Time-AI-Video-Streaming-Platform-290c487604f48152a6e3ecf8268697da)** - Project documentation
- **[GitHub Repository](https://github.com/JeromyJSmith/bunnyhole)** - Source code

## 🤝 Contributing

1. Follow the code style enforced by Biome/Ultracite
2. Use OpenSpec for feature proposals (`/openspec-proposal` in Cursor)
3. Write type-safe code (strict TypeScript)
4. Test locally with Docker services
5. Run `make check` before committing

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) and powered by modern open-source technologies.

---

**Need help?** Check [SETUP.md](./SETUP.md) or open an issue on GitHub.
