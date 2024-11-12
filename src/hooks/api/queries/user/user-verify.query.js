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
  const { id, email } = jwtDecode(token);
  return useQuery({
    queryKey: [`getInfoUser`],
    queryFn: () => getInfoVerifyUser(id, email),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};

export const useGetInfoVerifyUserByIdQuery = (userId) => {
  const token = localStorage.getItem('accessToken') || false;
  if (!token) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/not-found';
  }

  return useQuery({
    queryKey: [`getInfoUserById`],
    queryFn: () => getInfoVerifyUser(userId, ''),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
