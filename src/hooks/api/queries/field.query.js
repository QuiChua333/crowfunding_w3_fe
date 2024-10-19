import { useQuery } from '@tanstack/react-query';
import { getCampaignById } from '~/api/campaign.api';

export const useGetFieldGroupByCategoryQuery = () => {
  return useQuery({
    queryKey: [`getCampaignById`],
    queryFn: () => getCampaignById(),
    refetchOnWindowFocus: false,
  });
};

export default useGetFieldGroupByCategoryQuery;
