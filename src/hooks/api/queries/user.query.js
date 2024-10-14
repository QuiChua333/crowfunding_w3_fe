import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '~/api/user.api';

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: [`getCurrentUser`],
    queryFn: getCurrentUser,
  });
};

export default useGetCurrentUserQuery;
