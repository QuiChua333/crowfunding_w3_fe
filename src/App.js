import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateUserRoutes, loginRoutes, adminRoutes } from '~/routes';
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
import { setOpenChat } from './redux/slides/Chat';

function App() {
  const client = new QueryClient();
  const open = useSelector((state) => state.chat.openChat);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleOpenChat = () => {
    if (currentUser.id) {
      dispatch(setOpenChat(true));
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

  return (
    <QueryClientProvider client={client}>
      {open && <ChatComponent />}
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
                        <button
                          onClick={handleOpenChat}
                          className="fixed bottom-40 right-5 shadow-sm hover:opacity-90 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] w-20 h-20 rounded-full flex items-center justify-center"
                        >
                          <BiCommentDetail />
                        </button>
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
                          <button
                            onClick={handleOpenChat}
                            className="fixed bottom-40 right-5 shadow-sm ring-1 ring-white hover:ring-2 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] w-20 h-20 rounded-full flex items-center justify-center"
                          >
                            <BiCommentDetail />
                          </button>
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
                          <button
                            onClick={handleOpenChat}
                            className="fixed bottom-40 right-5 shadow-sm ring-1 ring-white hover:ring-2 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] w-20 h-20 rounded-full flex items-center justify-center"
                          >
                            <BiCommentDetail />
                          </button>
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
                          <button
                            onClick={handleOpenChat}
                            className="fixed bottom-40 right-5 shadow-sm ring-1 ring-white hover:ring-2 hover:cursor-pointer text-white font-bold text-[22px] bg-[#299899] w-20 h-20 rounded-full flex items-center justify-center"
                          >
                            <BiCommentDetail />
                          </button>
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
