import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openChat: false,
  activeUsers: [],
  chatList: [],
  activeChat: {},
  newChat: {},
  totalUnreadMessage: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setOpenChat: (state, action) => {
      state.openChat = action.payload;
    },
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setNewChat: (state, action) => {
      state.newChat = action.payload;
    },
    setTotalUnreadMessage: (state, action) => {
      if (!state.activeChat?.chatRoomId) {
        state.totalUnreadMessage = action.payload;
      } else {
        const totalUnreadMessage = state.chatList.reduce((acc, cur) => {
          return acc + cur.unreadMessageCount;
        }, 0);
        state.totalUnreadMessage = totalUnreadMessage;
      }
    },
  },
});

export const { setActiveUsers, setOpenChat, setChatList, setActiveChat, setNewChat, setTotalUnreadMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
