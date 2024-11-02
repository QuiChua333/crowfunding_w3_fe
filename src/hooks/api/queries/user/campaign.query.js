import { useQuery } from '@tanstack/react-query';
import { getCampaignById, getMoney, getPopulateCampaigns, getQuantityCampaignsOfOwner } from '~/api/user/campaign.api';
import { getQuantityPeopleByCampaign } from '~/api/user/contribution.api';

// handleAPI
export const useGetCampaignByIdQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaignById`],
    queryFn: () => getCampaignById(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetQuantityCampaignsOfOwnerQuery = (campaignId) => {
  return useQuery({
    queryKey: [`useGetQuantityCampaignsOfOwnerQuery`],
    queryFn: () => getQuantityCampaignsOfOwner(campaignId),
    refetchOnWindowFocus: false,
  });
};

export const useGetPopulateCampaigns = () => {
  return useQuery({
    queryKey: [`getPopulateCampaigns`],
    queryFn: () => getPopulateCampaigns(),
  });
};

export const useGetQuantityPeopleQuery = (id) => {
  return useQuery({
    queryKey: [`getQuantityPeople`],
    queryFn: () => getQuantityPeopleByCampaign(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetMoneyQuery = (id) => {
  return useQuery({
    queryKey: [`getMoney`],
    queryFn: () => getMoney(id),
    refetchOnWindowFocus: false,
  });
};
