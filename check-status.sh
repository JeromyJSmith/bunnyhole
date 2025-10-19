#!/bin/bash
# Quick status check for Bunnyhole Platform

echo "🔍 Bunnyhole Platform Status Check"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Docker Services
echo "🐳 Docker Services (PostgreSQL, Redis, Neo4j, n8n):"
docker compose ps --format "  {{.Name}}: {{.Status}}" 2>/dev/null || echo "  ❌ Docker Compose not running"
echo ""

# API Server
echo "🌐 API Server (http://localhost:3000):"
if curl -s http://localhost:3000/ > /dev/null 2>&1; then
    echo "  ✅ Running"
else
    echo "  ❌ Not running"
fi
echo ""

# Inngest Dev Server
echo "🔄 Inngest Dev Server (http://localhost:8288):"
if curl -s http://localhost:8288/ > /dev/null 2>&1; then
    echo "  ✅ Running"
else
    echo "  ❌ Not running - Start with: bunx inngest-cli@latest dev -u http://localhost:3000/api/inngest"
fi
echo ""

# n8n Workflow Automation
echo "🔧 n8n Workflow Automation (http://localhost:5678):"
if curl -s http://localhost:5678/healthz > /dev/null 2>&1; then
    echo "  ✅ Running"
else
    echo "  ❌ Not running"
fi
echo ""

# Python Agents
echo "🐍 Python Agents:"
if [ -d "apps/agents/.venv" ]; then
    echo "  ✅ Virtual environment exists"
else
    echo "  ❌ Virtual environment not created"
fi
echo ""

echo "═══════════════════════════════════════════════════════════"
echo ""
echo "💡 Tips:"
echo "  • Start everything: ./start-all.sh"
echo "  • Full health check: bun run health-check.ts"
echo "  • View report: cat TEST-REPORT.md"

