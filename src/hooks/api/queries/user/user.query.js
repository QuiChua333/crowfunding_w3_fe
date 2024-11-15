import { useQuery } from '@tanstack/react-query';
import { getAllContributesOfUser } from '~/api/user/contribution.api';
import { getCurrentUser, getUserById } from '~/api/user/user.api';

// handleAPI
export const useGetCurrentUserQuery = () => {
  const token = localStorage.getItem('accessToken') || false;
  return useQuery({
    queryKey: [`getCurrentUser`],
    queryFn: () => getCurrentUser(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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

export const useGetAllContributesOfUserQuery = ({ page, searchString, status, userId }) => {
  return useQuery({
    queryKey: ['getAllContributesOfUser', page, searchString, status],
    queryFn: () => getAllContributesOfUser({ page, searchString, status, userId }),
    refetchOnWindowFocus: false,
  });
};
