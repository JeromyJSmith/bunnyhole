#!/usr/bin/env bun
/**
 * Comprehensive Health Check Script for Bunnyhole Platform
 * Tests all services and dependencies
 */

import { Client } from "pg";
import Redis from "ioredis";
import neo4j from "neo4j-driver";

interface HealthStatus {
	name: string;
	status: "healthy" | "unhealthy" | "warning";
	message: string;
	details?: string;
}

const results: HealthStatus[] = [];

async function checkPostgreSQL(): Promise<void> {
	try {
		const client = new Client({
			connectionString: process.env.DATABASE_URL,
		});
		await client.connect();
		const res = await client.query("SELECT NOW() as time, version() as version");
		await client.end();
		results.push({
			name: "PostgreSQL",
			status: "healthy",
			message: "Connected successfully",
			details: `Version: ${res.rows[0].version.split(" ")[0]} ${res.rows[0].version.split(" ")[1]}`,
		});
	} catch (error) {
		results.push({
			name: "PostgreSQL",
			status: "unhealthy",
			message: "Connection failed",
			details: String(error),
		});
	}
}

async function checkRedis(): Promise<void> {
	try {
		const redis = new Redis({
			host: "localhost",
			port: 6379,
		});
		const pong = await redis.ping();
		const info = await redis.info("server");
		await redis.quit();
		results.push({
			name: "Redis",
			status: "healthy",
			message: "Connected successfully",
			details: `Response: ${pong}`,
		});
	} catch (error) {
		results.push({
			name: "Redis",
			status: "unhealthy",
			message: "Connection failed",
			details: String(error),
		});
	}
}

async function checkNeo4j(): Promise<void> {
	try {
		const driver = neo4j.driver(
			"bolt://localhost:7687",
			neo4j.auth.basic("neo4j", "bunnyhole123"),
		);
		const session = driver.session();
		const result = await session.run(
			"CALL dbms.components() YIELD name, versions RETURN name, versions[0] as version",
		);
		await session.close();
		await driver.close();
		results.push({
			name: "Neo4j",
			status: "healthy",
			message: "Connected successfully",
			details: `Version: ${result.records[0].get("version")}`,
		});
	} catch (error) {
		results.push({
			name: "Neo4j",
			status: "unhealthy",
			message: "Connection failed",
			details: String(error),
		});
	}
}

async function checkN8n(): Promise<void> {
	try {
		const response = await fetch("http://localhost:5678/healthz");
		if (response.ok) {
			results.push({
				name: "n8n",
				status: "healthy",
				message: "Workflow automation available",
				details: "Dashboard: http://localhost:5678",
			});
		} else {
			results.push({
				name: "n8n",
				status: "warning",
				message: "Service responded but not healthy",
				details: `Status: ${response.status}`,
			});
		}
	} catch (error) {
		results.push({
			name: "n8n",
			status: "unhealthy",
			message: "Service not accessible",
			details: String(error),
		});
	}
}

async function checkAPIServer(): Promise<void> {
	try {
		const response = await fetch("http://localhost:3001/");
		const text = await response.text();
		if (response.ok && text === "OK") {
			results.push({
				name: "API Server",
				status: "healthy",
				message: "Server is running",
				details: "http://localhost:3001",
			});
		} else {
			results.push({
				name: "API Server",
				status: "warning",
				message: "Server responded but with unexpected content",
				details: `Status: ${response.status}, Content: ${text}`,
			});
		}
	} catch (error) {
		results.push({
			name: "API Server",
			status: "unhealthy",
			message: "Server is not responding",
			details: String(error),
		});
	}
}

async function checkTRPC(): Promise<void> {
	try {
		const response = await fetch("http://localhost:3001/trpc/healthCheck");
		const data = await response.json();
		if (response.ok && data.result?.data === "OK") {
			results.push({
				name: "tRPC API",
				status: "healthy",
				message: "tRPC router is accessible",
				details: "Health check endpoint working",
			});
		} else {
			results.push({
				name: "tRPC API",
				status: "warning",
				message: "tRPC responded but with unexpected data",
				details: JSON.stringify(data),
			});
		}
	} catch (error) {
		results.push({
			name: "tRPC API",
			status: "unhealthy",
			message: "tRPC is not accessible",
			details: String(error),
		});
	}
}

async function checkEnvironmentVariables(): Promise<void> {
	const required = [
		"DATABASE_URL",
		"CORS_ORIGIN",
		"LIVEKIT_URL",
		"LIVEKIT_API_KEY",
		"LIVEKIT_API_SECRET",
	];

	const missing = required.filter((key) => !process.env[key]);
	const placeholder = required.filter(
		(key) =>
			process.env[key]?.includes("your-") ||
			process.env[key]?.includes("placeholder"),
	);

	if (missing.length === 0 && placeholder.length === 0) {
		results.push({
			name: "Environment Variables",
			status: "healthy",
			message: "All required variables are set",
		});
	} else if (missing.length > 0) {
		results.push({
			name: "Environment Variables",
			status: "unhealthy",
			message: "Missing required environment variables",
			details: `Missing: ${missing.join(", ")}`,
		});
	} else {
		results.push({
			name: "Environment Variables",
			status: "warning",
			message: "Some variables have placeholder values",
			details: `Placeholders: ${placeholder.join(", ")}`,
		});
	}
}

function printResults(): void {
	console.log("\n🏥 Bunnyhole Platform Health Check\n");
	console.log("═".repeat(70));

	const healthy = results.filter((r) => r.status === "healthy");
	const warnings = results.filter((r) => r.status === "warning");
	const unhealthy = results.filter((r) => r.status === "unhealthy");

	for (const result of results) {
		const icon =
			result.status === "healthy"
				? "✓"
				: result.status === "warning"
					? "⚠"
					: "✗";
		const color =
			result.status === "healthy"
				? "\x1b[32m"
				: result.status === "warning"
					? "\x1b[33m"
					: "\x1b[31m";
		const reset = "\x1b[0m";

		console.log(
			`${color}${icon}${reset} ${result.name.padEnd(25)} ${result.message}`,
		);
		if (result.details && result.status !== "healthy") {
			console.log(`  ${result.details}`);
		}
	}

	console.log("═".repeat(70));
	console.log(
		`\n📊 Summary: ${healthy.length} healthy, ${warnings.length} warnings, ${unhealthy.length} unhealthy\n`,
	);

	if (unhealthy.length === 0 && warnings.length === 0) {
		console.log("✅ All systems operational!\n");
	} else if (unhealthy.length === 0) {
		console.log(
			"⚠️  All systems running but some configuration needed.\n",
		);
	} else {
		console.log("❌ Some systems are not operational.\n");
	}
}

async function runHealthCheck(): Promise<void> {
	console.log("🔍 Running health checks...\n");

	await checkPostgreSQL();
	await checkRedis();
	await checkNeo4j();
	await checkN8n();
	await checkAPIServer();
	await checkTRPC();
	checkEnvironmentVariables();

	printResults();

	const unhealthy = results.filter((r) => r.status === "unhealthy");
	process.exit(unhealthy.length > 0 ? 1 : 0);
}

runHealthCheck();

