import { io } from 'socket.io-client';

export const SOCKET_URL = 'http://localhost:4001'; // URL server của bạn

export const socket = io(SOCKET_URL);
