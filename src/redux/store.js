import { configureStore } from '@reduxjs/toolkit';
import globalAppReducer from './slides/GlobalApp';
import userCampaignReducer from './slides/UserCampaign';
import userReducer from './slides/User';
import paymentReducer from './slides/Payment';
import commentReducer from './slides/Comment';
import adminReducer from './slides/Admin';
import metamaskReducer from './slides/Web3';
import chatReducer from './slides/Chat';
import notificationReducer from './slides/Notification';

const store = configureStore({
  reducer: {
    globalApp: globalAppReducer,
    userCampaign: userCampaignReducer,
    user: userReducer,
    payment: paymentReducer,
    comment: commentReducer,
    admin: adminReducer,
    metamask: metamaskReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
});
export default store;
