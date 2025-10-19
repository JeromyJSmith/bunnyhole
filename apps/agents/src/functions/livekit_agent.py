from ..inngest_client import inngest_client
import inngest
from livekit.agents import JobContext, WorkerOptions, cli
from livekit.rtc import RpcInvocationData
import os

@inngest_client.create_function(
    fn_id="livekit-agent",
    trigger=inngest.TriggerEvent(event="agent/run"),
)
async def livekit_agent_fn(ctx: inngest.Context, step: inngest.Step) -> dict:
    room_name = ctx.event.data.get("roomName")
    identity = ctx.event.data.get("identity")

    # In a real scenario, you would use the livekit-agents SDK to join the room
    # and perform some tasks. For now, we'll just log the data.
    print(f"Received job to join room {room_name} with identity {identity}")

    return {"success": True}
