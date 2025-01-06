import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      state.totalUnreadMessage = action.payload;
    },
  },
});

export const { setActiveUsers, setOpenChat, setChatList, setActiveChat, setNewChat, setTotalUnreadMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
