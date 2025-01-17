import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { publicRoutes, privateUserRoutes, loginRoutes, AdminRoutes } from '';
import { CustomLayout, NormalLayout } from '~/layout';
import {
  AdminRoutes,
  LoginRoutes,
  PrivateUserCampaignRoutes,
  PrivateUserIndividualsRoutes,
} from './layout/RoleRouteLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BiCommentDetail } from 'react-icons/bi';
import ChatComponent from './components/ChatComponent';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, disconnectSocket, socket } from './services/socket/socket';
import { setOpenChat, setTotalUnreadMessage } from './redux/slides/Chat';
import ChatGemini from './components/ChatGemini';
import { setOpenGemini } from './redux/slides/GlobalApp';
import { setNotifications } from './redux/slides/Notification';
import { CustomAxios } from './config';
import baseURL from './utils/baseURL';
import { privateUserRoutes, publicRoutes, loginRoutes, adminRoutes } from '~/routes';

function App() {
  const client = new QueryClient();
  const open = useSelector((state) => state.chat.openChat);
  const totalUnreadMessage = useSelector((state) => state.chat.totalUnreadMessage);
  const chatList = useSelector((state) => state.chat.chatList);
  const openGemini = useSelector((state) => state.globalApp.openGemini);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleOpenChat = () => {
    if (currentUser.id) {
      dispatch(setOpenChat(true));
    } else {
      window.location.assign('/login');
    }
  };

  const handleOpenGemini = () => {
    if (currentUser.id) {
      dispatch(setOpenGemini(true));
    } else {
      window.location.assign('/login');
    }
  };

  useEffect(() => {
    connectSocket(dispatch);

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const totalUnreadMessage = chatList.reduce((acc, cur) => {
      return acc + cur.unreadMessageCount;
    }, 0);
    console.log({ totalUnreadMessage });
    dispatch(setTotalUnreadMessage(totalUnreadMessage));
  }, [chatList]);

  const getNotification = async () => {
    try {
      const response = await CustomAxios.get(`${baseURL}/notification/me`);
      const notifications = response.data;
      dispatch(setNotifications(notifications));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('accessToken') || false;
    if (token) {
      getNotification();
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      {open && <ChatComponent />}
      {openGemini && <ChatGemini />}
      <Router>
        <div className="App">
          <CustomLayout>
            <Routes>
              {publicRoutes.map((route, index) => {
                let Layout = NormalLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout item={route.item}>
                        {!currentUser.isAdmin && currentUser.id && (
                          <>
                            <button
                              onClick={handleOpenGemini}
                              className="fixed z-[1000] bottom-72 right-5 shadow-sm hover:opacity-90 hover:cursor-pointer text-[#85b6f3] ring-[4px] ring-[#2d4365] font-bold text-[10px] bg-[#0b192e] w-20 h-20 rounded-full flex items-center justify-center"
                            >
                              Chatbot
                            </button>

                            <div className="fixed bottom-40 z-[1000] right-5">
                              {totalUnreadMessage > 0 && (
                                <div className="text-[12px] z-[10] rounded-full absolute -top-[5px] text-white  bg-red-500 inline-flex w-7 h-7 items-center justify-center">
                                  {totalUnreadMessage}
                                </div>
                              )}
                              <button
                                onClick={handleOpenChat}
                                className=" shadow-sm hover:opacity-90 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] ring-[4px] ring-[#1c7e7f] w-20 h-20 rounded-full flex items-center justify-center"
                              >
                                <BiCommentDetail />
                              </button>
                            </div>
                          </>
                        )}
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
              <Route element={<PrivateUserCampaignRoutes />}>
                {privateUserRoutes.campaigns.map((route, index) => {
                  let Layout = NormalLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout item={route.item}>
                          {!currentUser.isAdmin && currentUser.id && (
                            <>
                              <button
                                onClick={handleOpenGemini}
                                className="fixed bottom-72 z-[1000] right-5 shadow-sm hover:opacity-90 hover:cursor-pointer text-[#85b6f3] ring-[4px] ring-[#2d4365] font-bold text-[10px] bg-[#0b192e] w-20 h-20 rounded-full flex items-center justify-center"
                              >
                                Chatbot
                              </button>

                              <div className="fixed bottom-40 z-[1000] right-5">
                                {totalUnreadMessage > 0 && (
                                  <div className="text-[12px] z-[10] rounded-full absolute -top-[5px] text-white  bg-red-500 inline-flex w-7 h-7 items-center justify-center">
                                    {totalUnreadMessage}
                                  </div>
                                )}
                                <button
                                  onClick={handleOpenChat}
                                  className=" shadow-sm hover:opacity-90 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] ring-[4px] ring-[#1c7e7f] w-20 h-20 rounded-full flex items-center justify-center"
                                >
                                  <BiCommentDetail />
                                </button>
                              </div>
                            </>
                          )}
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Route>
              <Route element={<PrivateUserIndividualsRoutes />}>
                {privateUserRoutes.individuals.map((route, index) => {
                  let Layout = NormalLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout item={route.item}>
                          {!currentUser.isAdmin && currentUser.id && (
                            <>
                              <button
                                onClick={handleOpenGemini}
                                className="fixed bottom-72 z-[1000] right-5 shadow-sm hover:opacity-90 hover:cursor-pointer text-[#85b6f3] ring-[4px] ring-[#2d4365] font-bold text-[10px] bg-[#0b192e] w-20 h-20 rounded-full flex items-center justify-center"
                              >
                                Chatbot
                              </button>

                              <div className="fixed bottom-40 z-[1000] right-5">
                                {totalUnreadMessage > 0 && (
                                  <div className="text-[12px] z-[10] rounded-full absolute -top-[5px] text-white  bg-red-500 inline-flex w-7 h-7 items-center justify-center">
                                    {totalUnreadMessage}
                                  </div>
                                )}
                                <button
                                  onClick={handleOpenChat}
                                  className=" shadow-sm hover:opacity-90 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] ring-[4px] ring-[#1c7e7f] w-20 h-20 rounded-full flex items-center justify-center"
                                >
                                  <BiCommentDetail />
                                </button>
                              </div>
                            </>
                          )}
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Route>
              <Route element={<LoginRoutes />}>
                {loginRoutes.map((route, index) => {
                  let Layout = NormalLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout item={route.item}>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Route>
              <Route element={<AdminRoutes />}>
                {adminRoutes.map((route, index) => {
                  let Layout = NormalLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout item={route.item}>
                          {!currentUser.isAdmin && currentUser.id && (
                            <>
                              <button
                                onClick={handleOpenGemini}
                                className="fixed bottom-72 z-[1000] right-5 shadow-sm hover:opacity-90 hover:cursor-pointer text-[#85b6f3] ring-[4px] ring-[#2d4365] font-bold text-[10px] bg-[#0b192e] w-20 h-20 rounded-full flex items-center justify-center"
                              >
                                Chatbot
                              </button>

                              <div className="fixed bottom-40 z-[1000] right-5">
                                {totalUnreadMessage > 0 && (
                                  <div className="text-[12px] z-[10] rounded-full absolute -top-[5px] text-white  bg-red-500 inline-flex w-7 h-7 items-center justify-center">
                                    {totalUnreadMessage}
                                  </div>
                                )}
                                <button
                                  onClick={handleOpenChat}
                                  className=" shadow-sm hover:opacity-90 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] ring-[4px] ring-[#1c7e7f] w-20 h-20 rounded-full flex items-center justify-center"
                                >
                                  <BiCommentDetail />
                                </button>
                              </div>
                            </>
                          )}
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Route>
            </Routes>
          </CustomLayout>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
