import { WebhookReceiver } from "livekit-server-sdk";
import { inngest } from "../../inngest/client";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function handleLiveKitWebhook(req: Request) {
  const authorization = req.headers.get("Authorization");
  if (!authorization) {
    throw new Error("Authorization header is required");
  }

  const rawBody = await req.text();
  const event = await receiver.receive(rawBody, authorization);

  await inngest.send({
    name: `livekit/${event.event}`,
    data: event,
  });

  return { success: true };
}
