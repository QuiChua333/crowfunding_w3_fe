import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '~/api/admin/admin.users.api';

// handleAPI
export const useGetAllUsersQuery = ({ page, userVerifyStatus, searchString, userStatus }) => {
  return useQuery({
    queryKey: ['useGetAllUsersQuery', page, userVerifyStatus, searchString, userStatus],
    queryFn: () => getAllUsers({ page, userVerifyStatus, searchString, userStatus }),
  });
};
