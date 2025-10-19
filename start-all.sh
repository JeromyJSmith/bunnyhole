#!/bin/bash
# Quick start script for Bunnyhole Platform

echo "🚀 Starting Bunnyhole Platform..."
echo ""

# Check if Docker services are running
echo "1️⃣ Checking Docker services..."
if ! docker compose ps | grep -q "Up"; then
    echo "   Starting Docker services..."
    docker compose up -d
    sleep 5
fi
echo "   ✓ Docker services running"
echo ""

# Start Inngest Dev Server in background
echo "2️⃣ Starting Inngest Dev Server..."
echo "   Dashboard will be at: http://localhost:8288"
bunx inngest-cli@latest dev -u http://localhost:3000/api/inngest > /tmp/inngest.log 2>&1 &
INNGEST_PID=$!
echo "   ✓ Inngest Dev Server started (PID: $INNGEST_PID)"
echo ""

# Start API Server
echo "3️⃣ Starting API Server..."
echo "   Server will be at: http://localhost:3000"
echo "   Press Ctrl+C to stop all services"
echo ""

# Trap Ctrl+C to cleanup
trap "echo ''; echo '🛑 Stopping services...'; kill $INNGEST_PID 2>/dev/null; exit" INT

# Start server in foreground
cd apps/server && bun run --hot src/index.ts

