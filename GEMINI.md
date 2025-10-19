# Gemini Project Context: Bunnyhole

## Project Overview

Bunnyhole is a real-time AI video streaming platform built on a modern TypeScript monorepo. It combines a Next.js frontend, a Hono backend, and a React Native mobile app, all communicating via tRPC for end-to-end type safety. The platform is designed for real-time video/audio streaming with LiveKit, event-driven architecture with Kafka, and integrates with various AI models from OpenAI, Anthropic, and Google.

### Core Technologies

*   **Full-Stack:** TypeScript
*   **Frontend (Web):** Next.js 15, React 19, Tailwind CSS 4, shadcn/ui
*   **Frontend (Mobile):** React Native (Expo) with NativeWind
*   **Backend:** Hono (edge-first)
*   **API:** tRPC
*   **Runtime:** Bun
*   **Monorepo:** Turborepo
*   **Real-Time:** LiveKit, WebSockets
*   **Event Streaming:** Kafka
*   **AI:** OpenAI, Anthropic, Google AI, Vercel AI SDK
*   **Database:** PostgreSQL (Drizzle ORM), Redis, Neo4j
*   **Authentication:** Supabase, Better Auth
*   **Workflow:** Inngest
*   **DevOps:** Docker Compose, Makefile, Biome, Ultracite, Husky

### Architecture

The project is a monorepo with the following structure:

*   `apps/web`: The Next.js frontend application.
*   `apps/server`: The Hono backend server, handling business logic, AI integrations, and database access.
*   `apps/native`: The React Native mobile application.
*   `packages/api`: Shared tRPC routers and procedures.
*   `packages/auth`: Authentication logic and utilities.
*   `packages/db`: Drizzle ORM schema and database utilities.

## Building and Running

The project uses a `Makefile` for common tasks.

### Initial Setup

1.  **Install dependencies:**
    ```bash
    make install
    ```
2.  **Start Docker services (PostgreSQL, Redis, Neo4j, Kafka):**
    ```bash
    make docker-up
    ```
3.  **Set up environment variables:**
    *   Copy `.env.example` to `.env` in `apps/server` and `apps/web`.
    *   Fill in the required environment variables.
4.  **Push database schema:**
    ```bash
    make db-push
    ```

### Development

*   **Start all applications:**
    ```bash
    make dev
    ```
*   **Start individual applications:**
    ```bash
    make dev-web
    make dev-server
    make dev-native
    ```

### Database

*   **Push schema changes:**
    ```bash
    make db-push
    ```
*   **Open Drizzle Studio:**
    ```bash
    make db-studio
    ```
*   **Generate migrations:**
    ```bash
    make db-generate
    ```
*   **Run migrations:**
    ```bash
    make db-migrate
    ```

## Development Conventions

*   **Code Style:** Code is formatted and linted with Biome and Ultracite. Run `make check` to check for issues.
*   **Commits:** Husky is used for pre-commit hooks to ensure code quality.
*   **Type Safety:** The project enforces strict TypeScript across the entire stack.
*   **API:** All API routes are defined using tRPC in the `packages/api` directory.
*   **Database:** The database schema is defined using Drizzle ORM in the `packages/db` directory.
*   **Feature Proposals:** Use OpenSpec for feature proposals.
