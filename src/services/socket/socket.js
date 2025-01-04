// socket.js
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { setActiveUsers } from '~/redux/slides/Chat';

export let socket;
export let activeUsers;
export function connectSocket(dispatch) {
  const accessToken = localStorage.getItem('accessToken') || null;
  if (!accessToken) return;
  try {
    const tokenPayload = jwtDecode(accessToken);
    const userId = tokenPayload.id;

    const wsUrl = process.env.REACT_APP_URL_WS;
    socket = io(wsUrl, {
      query: { userId }, // Gửi userId qua query parameters
    });

    socket.on('activeUsers', (data) => {
      console.log('Active user', data);
      dispatch(setActiveUsers(data));
    });
  } catch (error) {
    console.log(error);
  }
}
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}
