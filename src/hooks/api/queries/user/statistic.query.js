import { useQuery } from '@tanstack/react-query';
import {
  getStatisticCampaignByTimeOfCurrentUser,
  getStatisticTotalCampaignOfCurrentUser,
} from '~/api/user/statistic.api';

// handleAPI
export const useGetStatisticTotalCampaignOfCurrentUserQuery = () => {
  return useQuery({
    queryKey: ['useGetStatisticTotalCampaignOfCurrentUserQuery'],
    queryFn: () => getStatisticTotalCampaignOfCurrentUser(),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetStatisticCampaignByTimeOfCurrentUserQuery = ({ quarter, year }) => {
  return useQuery({
    queryKey: ['useGetStatisticCampaignByTimeOfCurrentUserQuery', quarter, year],
    queryFn: () => getStatisticCampaignByTimeOfCurrentUser({ quarter, year }),
    refetchOnWindowFocus: false,
  });
};
