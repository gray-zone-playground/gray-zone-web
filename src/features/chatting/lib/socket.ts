import { io, type Socket } from 'socket.io-client';

// TODO: .env.local 파일에 NEXT_PUBLIC_SOCKET_URL 설정 필요
// 예시: NEXT_PUBLIC_SOCKET_URL=https://your-app.up.railway.app
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? '';

let socket: Socket | null = null;

/** Connect to the chat socket server with an auth token. */
export function connectSocket(token: string): Socket {
  if (socket?.connected) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
    autoConnect: true,
  });

  return socket;
}

/** Disconnect the current socket connection. */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/** Get the current socket instance (may be null if not connected). */
export function getSocket(): Socket | null {
  return socket;
}
