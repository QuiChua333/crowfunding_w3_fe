import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '~/api/admin/admin.users.api';

export const useGetAllUsersQuery = (url) => {
  return useQuery({
    queryKey: ['getAllUsers', url],
    queryFn: () => getAllUsers(url),
  });
};

export default useGetAllUsersQuery;
