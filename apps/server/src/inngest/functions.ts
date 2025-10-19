import { inngest } from "./client";
import { agentDispatchClient } from "../lib/livekit/server";
import { referenceFunction } from "inngest";
import { z } from "zod";

const pythonAgent = referenceFunction({
  appId: "bunnyhole-agents",
  functionId: "livekit-agent",
  schemas: {
    data: z.object({
      roomName: z.string(),
      identity: z.string(),
    }),
    return: z.object({
      success: z.boolean(),
    }),
  },
});

export const dispatchAgent = inngest.createFunction(
  { id: "dispatch-agent" },
  { event: "livekit/participant_joined" },
  async ({ event, step }) => {
    const roomName = event.data.room.name;
    const participantIdentity = event.data.participant.identity;

    // Avoid dispatching for agents themselves
    if (participantIdentity.startsWith("agent-")) {
      return;
    }

    const result = await step.invoke("invoke-python-agent", {
      function: pythonAgent,
      data: {
        roomName,
        identity: participantIdentity,
      },
    });

    return result;
  }
);
