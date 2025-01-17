import { useQuery } from '@tanstack/react-query';
import {
  getStatisticCampaignByTimeAdmin,
  getStatisticMoneyByTimeAdmin,
  getStatisticTotalCampaignAdmin,
} from '~/api/admin/admin.statistic.api';

// handleAPI
export const useGetStatisticTotalCampaignAdminQuery = () => {
  return useQuery({
    queryKey: ['useGetStatisticTotalCampaignAdminQuery'],
    queryFn: () => getStatisticTotalCampaignAdmin(),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetStatisticCampaignByTimeAdminQuery = ({ quarter, year }) => {
  return useQuery({
    queryKey: ['useGetStatisticCampaignByTimeAdminQuery', quarter, year],
    queryFn: () => getStatisticCampaignByTimeAdmin({ quarter, year }),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetStatisticMoneyByTimeAdminQuery = ({ year }) => {
  return useQuery({
    queryKey: ['useGetStatisticMoneyByTimeAdminQuery', year],
    queryFn: () => getStatisticMoneyByTimeAdmin({ year }),
    refetchOnWindowFocus: false,
  });
};
