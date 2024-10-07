import { Outlet, useParams } from 'react-router-dom';
import baseURL from '~/utils/baseURL';
import { useEffect, useState } from 'react';
import { PageNotFound } from '~/pages/common';
import { CustomAxios } from '~/config';

function PrivateUserIndividualsRoutes() {
  const { id } = useParams();
  const [isMatched, setMatched] = useState(null);
  const checkIndividualOfUser = async () => {
    try {
      const token = localStorage.getItem('accessToken') || false;
      if (!token) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      } else {
        const res = await CustomAxios.get(`${baseURL}/user/checkIndividualOfUser/${id}`);
        if (!res.data.data) {
          setMatched(false);
        } else {
          setMatched(true);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    checkIndividualOfUser();
  }, []);
  return (
    // isMatched? <Outlet /> : <Navigate to='/login'/>
    <>
      {isMatched && <Outlet />}
      {isMatched === false && <PageNotFound />}
    </>
  );
}

export default PrivateUserIndividualsRoutes;
