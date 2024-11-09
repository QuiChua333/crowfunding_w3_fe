import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  campaign: {},
  tab: {
    number: 1,
    content: 'Cơ bản',
  },
  showErrorDelete: false,
  contentError: '',
  isEditAll: true,
  isEditComponent: true,
};

const slice = createSlice({
  name: 'userCampaign',
  initialState,
  reducers: {
    setCampaign: (state, action) => {
      state.campaign = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setShowErrorDelete: (state, action) => {
      state.showErrorDelete = action.payload;
    },
    setContentError: (state, action) => {
      state.contentError = action.payload;
    },
    setEditAll: (state, action) => {
      state.isEditAll = action.payload;
    },
    setEditComponent: (state, action) => {
      state.isEditComponent = action.payload;
    },
  },
});

export default slice.reducer;
export const { setShowErrorDelete, setContentError, setEditAll, setEditComponent, setCampaign, setTab } = slice.actions;
