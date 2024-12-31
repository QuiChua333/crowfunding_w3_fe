import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes, privateUserRoutes, loginRoutes, adminRoutes } from '~/routes';
import { NormalLayout } from '~/layout';
import {
  AdminRoutes,
  LoginRoutes,
  PrivateUserCampaignRoutes,
  PrivateUserIndividualsRoutes,
} from './layout/RoleRouteLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenChat } from '~/redux/slides/GlobalApp';
import { BiCommentDetail } from "react-icons/bi";

const AppRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleOpenChat = () => {
    if (currentUser.id) {
      dispatch(setOpenChat(true));
    } else {
      navigate("/login");
    }
  };

  const renderRoutes = (routes, LayoutWrapper) =>
    routes.map((route, index) => {
      let Layout = NormalLayout;
      if (route.layout) Layout = route.layout;
      if (route.layout === null) Layout = React.Fragment;
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
    });

  return (
    <Routes>
      {renderRoutes(publicRoutes)}
      <Route element={<PrivateUserCampaignRoutes />}>
        {renderRoutes(privateUserRoutes.campaigns)}
      </Route>
      <Route element={<PrivateUserIndividualsRoutes />}>
        {renderRoutes(privateUserRoutes.individuals)}
      </Route>
      <Route element={<LoginRoutes />}>
        {renderRoutes(loginRoutes)}
      </Route>
      <Route element={<AdminRoutes />}>
        {renderRoutes(adminRoutes)}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
