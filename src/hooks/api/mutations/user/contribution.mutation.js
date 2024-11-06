import { useMutation } from '@tanstack/react-query';

import { editContributionStatus, paymentMomo, paymentSuccess } from '~/api/user/contribution.api';

// handleAPI
export const useEditContributionStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditContributionStatusMutation`],
    mutationFn: editContributionStatus,
  });
};

export const usePaymentMomoMutation = () => {
  return useMutation({
    mutationKey: [`usePaymentMomoMutation`],
    mutationFn: paymentMomo,
  });
};

export const usePaymentSuccessMutation = () => {
  return useMutation({
    mutationKey: ['usePaymentSuccessMutation'],
    mutationFn: paymentSuccess,
  });
};
