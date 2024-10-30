import { Outlet, useParams } from 'react-router-dom';
import baseURL from '~/utils/baseURL';
import { useEffect, useState } from 'react';
import { CustomAxios } from '~/config';
import { PageNotFound } from '~/pages/common';
import { useCheckCampaignOfUserMutation } from '~/hooks/api/mutations/user/campaign.mutation';
function PrivateUserCampaignRoutes() {
  const { id } = useParams();
  const [isMatched, setMatched] = useState(null);
  const checkCampaignOfUser = useCheckCampaignOfUserMutation();
  //   try {
  //     const token = localStorage.getItem('accessToken') || false;
  //     if (!token) {
  //       localStorage.removeItem('accessToken');
  //       localStorage.removeItem('refreshToken');
  //       window.location.href = '/login';
  //     } else {
  //       const res = await CustomAxios.get(`${baseURL}/campaign/checkCampaignOfUser/${id}`);
  //       if (!res.data.data) {
  //         setMatched(false);
  //       } else {
  //         setMatched(true);
  //       }
  //     }
  //   } catch (error) {}
  // };
  useEffect(() => {
    const token = localStorage.getItem('accessToken') || false;
    if (!token) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    } else {
      checkCampaignOfUser.mutate(id, {
        onSuccess() {
          setMatched(true);
        },
        onError() {
          setMatched(false);
        },
      });
    }
  }, []);
  return (
    // isMatched? <Outlet /> : <Navigate to='/login'/>
    <>
      {isMatched && <Outlet />}
      {isMatched === false && <PageNotFound />}
    </>
  );
}

export default PrivateUserCampaignRoutes;
