import { RoomServiceClient, AgentDispatchClient } from 'livekit-server-sdk';

const livekitHost = process.env.LIVEKIT_URL!;
const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;

export const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);
export const agentDispatchClient = new AgentDispatchClient(livekitHost, apiKey, apiSecret);
