import { useQuery } from '@tanstack/react-query';
import { getCampaignById, getMoney, getPopulateCampaigns, getQuantityCampaignByUser } from '~/api/user/campaign.api';

export const useGetCampaignByIdQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaignById`],
    queryFn: () => getCampaignById(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetPopulateCampaigns = () => {
  return useQuery({
    queryKey: [`getPopulateCampaigns`],
    queryFn: () => getPopulateCampaigns(),
  });
};

export const useGetQuantityCampaignByUserQuery = (campaignId) => {
  return useQuery({
    queryKey: [`useGetQuantityCampaignByUserQuery`],
    queryFn: () => getQuantityCampaignByUser(campaignId),
    refetchOnWindowFocus: false,
  });
};

export const useGetQuantityPeopleQuery = (id) => {
  return useQuery({
    queryKey: [`getQuantityPeople`],
    queryFn: () => getQuantityCampaignByUser(id),
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
