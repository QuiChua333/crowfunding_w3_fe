// socket.js
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { setActiveUsers, setTotalUnreadMessage } from '~/redux/slides/Chat';

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
      dispatch(setActiveUsers(data));
    });

    socket.on('totalUnreadMessage', (totalUnreadMessage) => {
      console.log({ totalUnreadMessage });
      dispatch(setTotalUnreadMessage(totalUnreadMessage));
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
