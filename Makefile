.PHONY: help install install-py dev dev-web dev-server dev-native dev-agents docker-up docker-down docker-logs db-push db-studio db-generate db-migrate clean check

help: ## Show this help message
	@echo "🎬 Bunnyhole Platform - Available Commands"
	@echo ""
	@echo "Development:"
	@echo "  make install       - Install all dependencies"
	@echo "  make dev          - Start all development servers"
	@echo "  make dev-web      - Start only web app (Next.js)"
	@echo "  make dev-server   - Start only API server (Hono)"
	@echo "  make dev-native   - Start only mobile app (React Native)"
	@echo "  make dev-agents   - Start only python agents service"
	@echo ""
	@echo "Docker Services:"
	@echo "  make docker-up    - Start Docker services (PostgreSQL, Redis, Neo4j, Kafka)"
	@echo "  make docker-down  - Stop Docker services"
	@echo "  make docker-logs  - View Docker logs"
	@echo "  make docker-clean - Remove Docker volumes (WARNING: deletes data)"
	@echo ""
	@echo "Database:"
	@echo "  make db-push      - Push database schema changes"
	@echo "  make db-studio    - Open Drizzle Studio"
	@echo "  make db-generate  - Generate migrations"
	@echo "  make db-migrate   - Run migrations"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean        - Clean build artifacts and node_modules"
	@echo "  make check        - Run Biome linter"
	@echo ""

install: install-py ## Install all dependencies
	@echo "📦 Installing dependencies..."
	bun install

install-py:
	@echo "🐍 Installing python dependencies..."
	cd apps/agents && uv venv && uv pip install -r requirements.txt

dev: ## Start all development servers
	@echo "🚀 Starting all development servers..."
	bun run dev

dev-web: ## Start only web app
	@echo "🌐 Starting web app..."
	bun run dev:web

dev-server: ## Start only API server
	@echo "⚡ Starting API server..."
	bun run dev:server

dev-native: ## Start only mobile app
	@echo "📱 Starting mobile app..."
	bun run dev:native

dev-agents: ## Start only python agents service
	@echo "🤖 Starting python agents service..."
	cd apps/agents && source .venv/bin/activate && uvicorn src.main:app --reload

docker-up: ## Start Docker services
	@echo "🐳 Starting Docker services..."
	docker compose up -d
	@echo ""
	@echo "✓ Services started:"
	@echo "  PostgreSQL: localhost:5432"
	@echo "  Redis:      localhost:6379"
	@echo "  Neo4j:      http://localhost:7474 (bolt://localhost:7687)"
	@echo "  Kafka:      localhost:9092 (external: localhost:9094)"
	@echo ""
	@echo "Run 'make docker-logs' to view logs"

docker-down: ## Stop Docker services
	@echo "🛑 Stopping Docker services..."
	docker compose down

docker-logs: ## View Docker logs
	docker compose logs -f

docker-clean: ## Remove Docker volumes (WARNING: deletes data)
	@echo "⚠️  WARNING: This will delete all Docker data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		echo "✓ Volumes removed"; \
	else \
		echo "Cancelled"; \
	fi

db-push: ## Push database schema changes
	@echo "📊 Pushing database schema..."
	bun run db:push

db-studio: ## Open Drizzle Studio
	@echo "🎨 Opening Drizzle Studio..."
	bun run db:studio

db-generate: ## Generate migrations
	@echo "📝 Generating migrations..."
	bun run db:generate

db-migrate: ## Run migrations
	@echo "⬆️  Running migrations..."
	bun run db:migrate

clean: ## Clean build artifacts and node_modules
	@echo "🧹 Cleaning project..."
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/.next
	rm -rf apps/*/dist
	rm -rf packages/*/dist
	rm -rf .turbo
	@echo "✓ Cleaned"

check: ## Run Biome linter
	@echo "🔍 Running Biome checks..."
	bun run check


