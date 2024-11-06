import { useQuery } from '@tanstack/react-query';
import { getFieldGroupByCategory } from '~/api/user/field.api';

// handleAPI
export const useGetFieldGroupByCategoryQuery = () => {
  return useQuery({
    queryKey: [`useGetFieldGroupByCategoryQuery`],
    queryFn: () => getFieldGroupByCategory(),
    refetchOnWindowFocus: false,
  });
};
