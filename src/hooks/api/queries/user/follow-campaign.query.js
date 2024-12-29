import { useQuery } from '@tanstack/react-query';
import { getCampaignsFollowed, getQuantityFollowsOfCampaign } from '~/api/user/follow-campaign';

export const useGetCampaignsFollowedQuery = (id) => {
  return useQuery({
    queryKey: [`useGetCampaignsFollowedQuery`],
    queryFn: () => getCampaignsFollowed(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetQuantityFollowsOfCampaignQuery = (id) => {
  return useQuery({
    queryKey: [`useGetQuantityFollowsOfCampaignQuery`],
    queryFn: () => getQuantityFollowsOfCampaign(id),
    refetchOnWindowFocus: false,
  });
};
