import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getInfoVerifyUser } from '~/api/user/user-vefify.api';

// handleAPI
export const useGetInfoVerifyUserQuery = (id) => {
  const navigate = useNavigate();
  navigate('/not-found');
  const token = localStorage.getItem('accessToken') || false;
  return useQuery({
    queryKey: [`getInfoUser`],
    queryFn: () => getInfoVerifyUser(id),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
