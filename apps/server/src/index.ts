import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@bunnyhole/api/context";
import { appRouter } from "@bunnyhole/api/routers/index";
import { auth } from "@bunnyhole/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "inngest/hono";
import { inngest } from "./inngest/client";
import * as functions from "./inngest/functions";
import { handleLiveKitWebhook } from "./lib/livekit/webhooks";

const app = new Hono();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "",
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	}),
);

app.post("/livekit/webhook", async (c) => {
    const result = await handleLiveKitWebhook(c.req.raw);
    return c.json(result);
});

app.use("/api/inngest", serve({ client: inngest, functions: Object.values(functions) }));

app.get("/", (c) => {
	return c.text("OK");
});

export default {
	port: process.env.PORT || 3001,
	fetch: app.fetch,
};
