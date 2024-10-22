import { useMutation } from '@tanstack/react-query';

import { editContributionStatus, getAllContributionsByCampaign, paymentMomo } from '~/api/user/contribution.api';

export const useGetAllContributionsByCampaignQuery = () => {
  return useMutation({
    mutationKey: [`useGetAllContributionsByCampaignQuery`],
    mutationFn: getAllContributionsByCampaign,
    refetchOnWindowFocus: false,
  });
};

export const useEditContributionStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditContributionStatusMutation`],
    mutationFn: editContributionStatus,
    refetchOnWindowFocus: false,
  });
};

export const usePaymentMomoMutation = () => {
  return useMutation({
    mutationKey: [`usePaymentMomoMutation`],
    mutationFn: paymentMomo,
    refetchOnWindowFocus: false,
  });
};
