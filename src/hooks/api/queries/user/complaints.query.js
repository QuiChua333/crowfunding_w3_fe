import { useQuery } from '@tanstack/react-query';
import { getAllReportOfCurrentUser } from '~/api/user/complaints.api';

// handleAPI
export const useGetAllReportOfCurrentUser = ({ page, status, searchString }) => {
  return useQuery({
    queryKey: ['useGetAllReportOfCurrentUser', page, status, searchString],
    queryFn: () => getAllReportOfCurrentUser({ page, status, searchString }),
  });
};
