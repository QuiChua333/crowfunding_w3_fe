import { useQuery } from '@tanstack/react-query';
import { getCampaignById } from '~/api/user/campaign.api';

export const useGetFieldGroupByCategoryQuery = () => {
  return useQuery({
    queryKey: [`getCampaignById`],
    queryFn: () => getCampaignById(),
    refetchOnWindowFocus: false,
  });
};

export default useGetFieldGroupByCategoryQuery;
