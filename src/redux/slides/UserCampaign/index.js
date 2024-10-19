import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  tagline: '',
  cardImage: '',
  location: {
    country: '',
    city: '',
  },
  category: '',
  field: '',
  status: '',
  startDate: null,
  duration: 0,
  videoUrl: '',
  imageDetailPage: '',
  story: '',
  goal: 0,
  momoNumber: '',
  faqs: [],
  owner: '',
  team: [],

  showErrorDelete: false,
  contentError: '',
  isEditAll: true,
  isEditComponent: true,
};

const slice = createSlice({
  name: 'userCampaign',
  initialState,
  reducers: {
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
export const { setShowErrorDelete, setContentError, setEditAll, setEditComponent } = slice.actions;
