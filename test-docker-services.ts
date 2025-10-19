#!/usr/bin/env bun
/**
 * Docker Services Connectivity Test
 * Tests connections to PostgreSQL, Redis, Neo4j, and n8n
 */

import { Client } from "pg";
import Redis from "ioredis";
import neo4j from "neo4j-driver";

const results = {
	postgres: false,
	redis: false,
	neo4j: false,
	n8n: false,
};

// Test PostgreSQL
async function testPostgreSQL() {
	try {
		const client = new Client({
			host: "localhost",
			port: 5432,
			user: "postgres",
			password: "postgres",
			database: "bunnyhole",
		});
		await client.connect();
		const res = await client.query("SELECT NOW()");
		await client.end();
		results.postgres = true;
		console.log("✓ PostgreSQL: Connected successfully");
		console.log(`  Current time from database: ${res.rows[0].now}`);
	} catch (error) {
		console.error("✗ PostgreSQL: Connection failed");
		console.error(`  Error: ${error}`);
	}
}

// Test Redis
async function testRedis() {
	try {
		const redis = new Redis({
			host: "localhost",
			port: 6379,
		});
		await redis.ping();
		await redis.quit();
		results.redis = true;
		console.log("✓ Redis: Connected successfully");
	} catch (error) {
		console.error("✗ Redis: Connection failed");
		console.error(`  Error: ${error}`);
	}
}

// Test Neo4j
async function testNeo4j() {
	try {
		const driver = neo4j.driver(
			"bolt://localhost:7687",
			neo4j.auth.basic("neo4j", "bunnyhole123"),
		);
		const session = driver.session();
		const result = await session.run("RETURN 1 AS num");
		await session.close();
		await driver.close();
		results.neo4j = true;
		console.log("✓ Neo4j: Connected successfully");
		console.log(`  Test query result: ${result.records[0].get("num")}`);
	} catch (error) {
		console.error("✗ Neo4j: Connection failed");
		console.error(`  Error: ${error}`);
	}
}

// Test n8n
async function testN8n() {
	try {
		const response = await fetch("http://localhost:5678/healthz");
		if (response.ok) {
			results.n8n = true;
			console.log("✓ n8n: Connected successfully");
			console.log("  Dashboard: http://localhost:5678");
		} else {
			throw new Error(`HTTP ${response.status}`);
		}
	} catch (error) {
		console.error("✗ n8n: Connection failed");
		console.error(`  Error: ${error}`);
	}
}

// Run all tests
async function runTests() {
	console.log("🔍 Testing Docker Services Connectivity...\n");

	await testPostgreSQL();
	await testRedis();
	await testNeo4j();
	await testN8n();

	console.log("\n📊 Test Results:");
	console.log(`  PostgreSQL: ${results.postgres ? "✓" : "✗"}`);
	console.log(`  Redis:      ${results.redis ? "✓" : "✗"}`);
	console.log(`  Neo4j:      ${results.neo4j ? "✓" : "✗"}`);
	console.log(`  n8n:        ${results.n8n ? "✓" : "✗"}`);

	const allPassed = Object.values(results).every((r) => r === true);
	if (allPassed) {
		console.log("\n✅ All services are accessible!");
		process.exit(0);
	}
	console.log("\n⚠️  Some services are not accessible.");
	process.exit(1);
}

runTests();

