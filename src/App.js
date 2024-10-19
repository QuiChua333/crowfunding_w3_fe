import { Fragment } from 'react';
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

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
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
