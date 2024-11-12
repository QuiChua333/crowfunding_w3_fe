import { useMutation } from '@tanstack/react-query';

import { editContributionStatus, paymentMomo, paymentStripe, paymentSuccess } from '~/api/user/contribution.api';

// handleAPI
export const useEditContributionStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditContributionStatusMutation`],
    mutationFn: editContributionStatus,
  });
};

// handleAPI
export const usePaymentStripeMutation = () => {
  return useMutation({
    mutationKey: [`usePaymentStripeMutation`],
    mutationFn: paymentStripe,
  });
};

// handleAPI
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
