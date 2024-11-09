import { useQuery } from '@tanstack/react-query';
import { getFieldGroupByCategory } from '~/api/user/field.api';

// handleAPI
export const useGetFieldGroupByCategoryQuery = (id) => {
  return useQuery({
    queryKey: [`useGetFieldGroupByCategoryQuery`],
    queryFn: () => getFieldGroupByCategory(id),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
