import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tabAdmin: {
    number: 1,
    content: 'Quản lý chiến dịch',
  },
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setTabAdmin: (state, action) => {
      console.log('1111');
      state.tabAdmin = action.payload;
    },
  },
});

export default slice.reducer;
export const { setTabAdmin } = slice.actions;
