import { useQuery } from '@tanstack/react-query';
import { getCampaignById, getQuantityCampaignByUser, getTeamMemberByCampaignId } from '~/api/user/campaign.api';

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

export const useGetQuantityCampaignByUserQuery = (campaignId) => {
  return useQuery({
    queryKey: [`useGetQuantityCampaignByUserQuery`],
    queryFn: () => getQuantityCampaignByUser(campaignId),
    refetchOnWindowFocus: false,
  });
};
