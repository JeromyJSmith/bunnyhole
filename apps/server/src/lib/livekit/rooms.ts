import { roomService } from "./server";

export async function createLiveKitRoom(roomName: string) {
  const room = await roomService.createRoom({
    name: roomName,
    emptyTimeout: 300, // 5 minutes
    maxParticipants: 20,
  });
  console.log("Room created:", room);
  return room;
}
