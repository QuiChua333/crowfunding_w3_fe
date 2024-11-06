import { useQuery } from '@tanstack/react-query';
import { getCampaignsFollowed } from '~/api/user/follow-campaign';

export const useGetCampaignsFollowedQuery = (id) => {
  return useQuery({
    queryKey: [`useGetCampaignsFollowedQuery`],
    queryFn: () => getCampaignsFollowed(id),
    refetchOnWindowFocus: false,
  });
};
