import { useQuery } from '@tanstack/react-query';
import { getAllFieldByGroup } from '~/api/admin/admin.field.api';

// handleAPI
export const useGetAllFieldByGroupQuery = ({ page, textSearch, idFieldGroup }) => {
  return useQuery({
    queryKey: ['getAllFieldByGroup', page, textSearch, idFieldGroup],
    queryFn: () => getAllFieldByGroup({ page, textSearch, idFieldGroup }),
  });
};
