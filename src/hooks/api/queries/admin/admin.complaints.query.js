import { useQuery } from '@tanstack/react-query';
import { getAllReports } from '~/api/admin/admin.complaints.api';

// handleAPI
export const useGetAllReportsQuery = ({ page, status, searchString }) => {
  return useQuery({
    queryKey: ['getAllReports', page, status, searchString],
    queryFn: () => getAllReports({ page, status, searchString }),
  });
};
