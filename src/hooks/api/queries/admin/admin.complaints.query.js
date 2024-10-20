import { useQuery } from '@tanstack/react-query';
import { getAllReports } from '~/api/admin/admin.complaints.api';

export const useGetAllReportsQuery = (url) => {
  return useQuery({
    queryKey: ['getAllReports', url],
    queryFn: () => getAllReports(url),
  });
};

export default useGetAllReportsQuery;
