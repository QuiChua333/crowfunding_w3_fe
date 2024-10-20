import { useQuery } from '@tanstack/react-query';
import { getAllCampaigns } from '~/api/admin/admin.campaigns.api';

export const useGetAllCampaignsQuery = (url) => {
  return useQuery({
    queryKey: ['getAllCampaigns', url],
    queryFn: () => getAllCampaigns(url),
  });
};

export default useGetAllCampaignsQuery;
