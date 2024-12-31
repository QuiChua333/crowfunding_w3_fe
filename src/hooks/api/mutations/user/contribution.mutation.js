import { useMutation } from '@tanstack/react-query';

import {
  editContributionStatus,
  editRefundStatus,
  paymentCrypto,
  paymentMomo,
  paymentStripe,
  paymentSuccess,
} from '~/api/user/contribution.api';

// handleAPI
export const useEditContributionStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditContributionStatusMutation`],
    mutationFn: editContributionStatus,
  });
};

// handleAPI
export const useEditRefundStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditRefundStatusMutation`],
    mutationFn: editRefundStatus,
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

// handleAPI
export const usePaymentCryptoMutation = () => {
  return useMutation({
    mutationKey: [`usePaymentCryptoMutation`],
    mutationFn: paymentCrypto,
  });
};

export const usePaymentSuccessMutation = () => {
  return useMutation({
    mutationKey: ['usePaymentSuccessMutation'],
    mutationFn: paymentSuccess,
  });
};
