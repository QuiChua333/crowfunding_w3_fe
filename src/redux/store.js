import { configureStore } from '@reduxjs/toolkit';
import globalAppReducer from './slides/GlobalApp';
import userCampaignReducer from './slides/UserCampaign';
import userReducer from './slides/User';
import paymentReducer from './slides/Payment';
import commentReducer from './slides/Comment';
import adminReducer from './slides/Admin';

const store = configureStore({
  reducer: {
    globalApp: globalAppReducer,
    userCampaign: userCampaignReducer,
    user: userReducer,
    payment: paymentReducer,
    comment: commentReducer,
    admin: adminReducer,
  },
});
export default store;
