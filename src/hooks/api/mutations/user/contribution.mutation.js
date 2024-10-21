import { useMutation } from '@tanstack/react-query';
import { getAllContributionsByCampaign } from '~/api/user/contribution.api';

export const useGetAllContributionsByCampaignQuery = () => {
  return useMutation({
    mutationKey: [`useGetAllContributionsByCampaignQuery`],
    mutationFn: getAllContributionsByCampaign,
    refetchOnWindowFocus: false,
  });
};
