import { useQuery } from '@tanstack/react-query';
import { getCampaignById, getTeamMemberByCampaignId } from '~/api/campaign.api';

export const useGetCampaignByIdQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaignById`],
    queryFn: () => getCampaignById(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetTeamMemberByCampaignId = (id) => {
  return useQuery({
    queryKey: [`useGetTeamMemberByCampaignId`],
    queryFn: () => getTeamMemberByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};
