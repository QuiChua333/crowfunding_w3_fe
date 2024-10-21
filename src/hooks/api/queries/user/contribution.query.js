import { useQuery } from '@tanstack/react-query';
import { getCampaignById } from '~/api/user/campaign.api';
import {
  getAllContributionsByCampaign,
  getMoneyByCampaign,
  getQuantityPeopleByCampaign,
  getTopUserContributionByCampaign,
} from '~/api/user/contribution.api';

export const useGetTopUserContributionByCampaignQuery = (id) => {
  return useQuery({
    queryKey: [`useGetTopUserContributionByCampaignQuery`],
    queryFn: () => getTopUserContributionByCampaign(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetMoneyByCampaignQuery = (id) => {
  return useQuery({
    queryKey: [`useGetMoneyByCampaignQuery`],
    queryFn: () => getMoneyByCampaign(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetQuantityPeopleByCampaignQuery = (id) => {
  return useQuery({
    queryKey: [`useGetQuantityPeopleByCampaignQuery`],
    queryFn: () => getQuantityPeopleByCampaign(id),
    refetchOnWindowFocus: false,
  });
};
