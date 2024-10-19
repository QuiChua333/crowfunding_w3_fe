import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '~/api/user.api';

export const useGetCurrentUserQuery = () => {
  const token = localStorage.getItem('accessToken') || false;
  return useQuery({
    queryKey: [`getCurrentUser`],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
