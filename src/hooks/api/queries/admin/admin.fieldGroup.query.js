import { useQuery } from '@tanstack/react-query';
import { getAllFieldGroup, getFieldGroupById } from '~/api/admin/admin.fieldGroup.api';

// handleAPI
export const useGetAllFieldGroupQuery = ({ page, textSearch }) => {
  return useQuery({
    queryKey: ['getAllFieldGroup', page, textSearch],
    queryFn: () => getAllFieldGroup({ page, textSearch }),
  });
};

export const useGetFieldGroupByIdQuery = ({ id }) => {
  return useQuery({
    queryKey: ['getFieldGroupById', id],
    queryFn: () => getFieldGroupById({ id }),
  });
};

