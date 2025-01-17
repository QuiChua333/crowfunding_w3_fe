import { useQuery } from '@tanstack/react-query';
import { getCampaignsFollowed, getQuantityFollowsOfCampaign } from '~/api/user/follow-campaign';

export const useGetCampaignsFollowedQuery = ({ id, searchString, status, page }) => {
  return useQuery({
    queryKey: [`useGetCampaignsFollowedQuery`, id, searchString, status, page],
    queryFn: () => getCampaignsFollowed({ id, searchString, status, page }),
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
