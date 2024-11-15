import { Outlet, useParams } from 'react-router-dom';
import baseURL from '~/utils/baseURL';
import { useEffect, useState } from 'react';
import { PageNotFound } from '~/pages/common';
import { CustomAxios } from '~/config';

function PrivateUserIndividualsRoutes() {
  return <Outlet />;
}

export default PrivateUserIndividualsRoutes;
