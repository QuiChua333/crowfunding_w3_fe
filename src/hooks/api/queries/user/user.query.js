import { useQuery } from '@tanstack/react-query';
import { getAllContributesOfUser, getCurrentUser, getUserById } from '~/api/user/user.api';

// handleAPI
export const useGetCurrentUserQuery = () => {
  const token = localStorage.getItem('accessToken') || false;
  return useQuery({
    queryKey: [`getCurrentUser`],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};

// handleAPI
export const useGetInfoUserQuery = (id) => {
  return useQuery({
    queryKey: ['useGetInfoUserQuery'],
    queryFn: () => getUserById(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetAllContributesOfUserQuery = (url) => {
  return useQuery({
    queryKey: ['getAllContributesOfUser', url],
    queryFn: () => getAllContributesOfUser(url),
    refetchOnWindowFocus: false,
  });
};
