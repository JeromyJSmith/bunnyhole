# Bun Command Reference for Bunnyhole

## ✅ What is Bun?

**Bun** is an all-in-one JavaScript runtime & toolkit:
- 🚀 **Fast** - Significantly faster than Node.js
- 📦 **Package Manager** - Replaces npm/yarn/pnpm
- 🏃 **Runtime** - Replaces Node.js
- 🔧 **Bundler** - Built-in bundler
- ✅ **Test Runner** - Built-in test framework

**Version:** `1.2.19` (installed at `/Users/ojeromyo/.local/bin/bunx`)

---

## 🎯 Command Cheat Sheet

### Package Management

| Task | npm | Bun |
|------|-----|-----|
| Install all | `npm install` | `bun install` |
| Add package | `npm install <pkg>` | `bun add <pkg>` |
| Add dev package | `npm install -D <pkg>` | `bun add -D <pkg>` |
| Remove package | `npm uninstall <pkg>` | `bun remove <pkg>` |
| Run script | `npm run <script>` | `bun run <script>` |
| Execute package | `npx <pkg>` | `bunx <pkg>` |
| Update packages | `npm update` | `bun update` |
| List packages | `npm list` | `bun pm ls` |

### Common Bunnyhole Commands

```bash
# Install all dependencies
bun install

# Start services
bun run dev                    # All services
bun run dev:server             # API server only
bun run dev:web                # Web app only
bun run dev:native             # React Native app

# Database
bun run db:push                # Push schema
bun run db:studio              # Open DB UI
bun run db:generate            # Generate migrations

# Scripts
bun run health-check.ts        # Health check
bun run test-docker-services.ts # Test services

# Execute Inngest Dev Server
bunx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

---

## 🚀 bunx vs npx

**bunx** is Bun's equivalent of npx:

```bash
# ❌ Old (npm/npx)
npx inngest-cli@latest dev

# ✅ New (bun/bunx)
bunx inngest-cli@latest dev

# ❌ Old
npx create-next-app@latest

# ✅ New
bunx create-next-app@latest
```

**Differences:**
- `bunx` is **faster** (uses Bun's runtime)
- `bunx` automatically installs if not found
- `bunx` works with Bun's package resolution

---

## 🔥 Why We Use Bun

### Performance
- **3x faster** installs than npm
- **10x faster** script execution
- Native TypeScript support

### Features
- Drop-in replacement for Node.js
- Built-in `.env` support
- Native ESM and CommonJS support
- Hot reloading with `--hot`

### Our Usage
```bash
# Server with hot reload
bun run --hot src/index.ts

# Test with watch
bun test --watch

# Bundle production
bun build ./src/index.ts --outdir ./dist
```

---

## 📝 Project-Specific Rules

### Always Use Bun For:
- ✅ Installing packages
- ✅ Running scripts
- ✅ Executing CLI tools
- ✅ Running the API server
- ✅ Running tests

### Use Other Tools For:
- **Python:** Use `uv` (not pip)
- **Docker:** Use `docker compose`
- **Database:** Use `bun run db:*` commands

---

## 🛠️ Troubleshooting

### "Command not found: bunx"

**Solution:** Bun is installed, try:
```bash
/Users/ojeromyo/.local/bin/bunx --version
```

Or reinstall Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

### "Package not found"

**Solution:** Clear cache and reinstall:
```bash
bun pm cache rm
bun install
```

### "Module not found"

**Solution:** Ensure dependencies are installed:
```bash
bun install
```

---

## 📚 Quick Links

- **Bun Docs:** https://bun.sh/docs
- **bunx Reference:** https://bun.sh/docs/cli/bunx
- **Package Manager:** https://bun.sh/docs/cli/install
- **Runtime:** https://bun.sh/docs/runtime

---

## 🎯 Summary

**Remember:**
- `npm` → `bun`
- `npm install` → `bun install`
- `npm run` → `bun run`
- `npx` → `bunx`

**All documentation has been updated to use `bunx` instead of `npx`.**

---

**Last Updated:** October 19, 2025

