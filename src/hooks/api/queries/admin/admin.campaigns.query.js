import { useQuery } from '@tanstack/react-query';
import { getAllCampaigns } from '~/api/admin/admin.campaigns.api';

// handleAPI
export const useGetAllCampaignsQuery = ({ page, status, searchString }) => {
  return useQuery({
    queryKey: ['getAllCampaigns', page, status, searchString],
    queryFn: () => getAllCampaigns({ page, status, searchString }),
  });
};
