import { useQuery } from '@tanstack/react-query';
import {
  getAllContributionsByCampaign,
  getMoneyByCampaign,
  getQuantityContributeOfUser,
  getQuantityPeopleByCampaign,
  getTopUserContributionByCampaign,
} from '~/api/user/contribution.api';

// handleAPI
export const useGetTopUserContributionByCampaignQuery = (id) => {
  return useQuery({
    queryKey: [`useGetTopUserContributionByCampaignQuery`],
    queryFn: () => getTopUserContributionByCampaign(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetMoneyByCampaignQuery = (id) => {
  return useQuery({
    queryKey: [`useGetMoneyByCampaignQuery`],
    queryFn: () => getMoneyByCampaign(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetQuantityPeopleByCampaignQuery = (id) => {
  return useQuery({
    queryKey: [`useGetQuantityPeopleByCampaignQuery`],
    queryFn: () => getQuantityPeopleByCampaign(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetMoneyQuery = (id) => {
  return useQuery({
    queryKey: [`getMoney`],
    queryFn: () => getMoneyByCampaign(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetQuantityContributeOfUserQuery = (id) => {
  return useQuery({
    queryKey: [`useGetQuantityContributeOfUserQuery`],
    queryFn: () => getQuantityContributeOfUser(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetAllContributionsByCampaignQuery = ({
  campaignId,
  searchString,
  status,
  sortMoney,
  sortContributionDate,
  page,
}) => {
  return useQuery({
    queryKey: ['useGetAllContributionsByCampaignQuery', searchString, status, sortMoney, sortContributionDate, page],
    queryFn: () =>
      getAllContributionsByCampaign({
        campaignId,
        searchString,
        status,
        sortMoney,
        sortContributionDate,
        page,
      }),
    refetchOnWindowFocus: false,
  });
};
