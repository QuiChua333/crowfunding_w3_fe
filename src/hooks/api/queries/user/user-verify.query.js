import { useQuery } from '@tanstack/react-query';
import { getInfoVerifyUser } from '~/api/user/user-vefify.api';
import { jwtDecode } from 'jwt-decode';

// handleAPI
export const useGetInfoVerifyUserQuery = () => {
  const token = localStorage.getItem('accessToken') || false;
  if (!token) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/not-found';
  }
  const { id } = jwtDecode(token);
  return useQuery({
    queryKey: [`getInfoUser`],
    queryFn: () => getInfoVerifyUser(id),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
