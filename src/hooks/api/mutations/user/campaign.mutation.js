import { useMutation } from '@tanstack/react-query';
import {
  createComment,
  editCampaignById,
  launchCampaign,
  followCampaign,
  likeComment,
  paymentSuccess,
  removeComment,
  sendReport,
  createCampaign,
  unLikeComment,
  updateComment,
  checkCampaignOfUser,
} from '~/api/user/campaign.api';

export const useStartCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useStartCampaignMutation'],
    mutationFn: createCampaign,
  });
};

export const useCheckCampaignOfUserMutation = () => {
  return useMutation({
    mutationKey: ['useCheckCampaignOfUserMutation'],
    mutationFn: checkCampaignOfUser,
  });
};

export const useEditCampaignByIdMutation = () => {
  return useMutation({
    mutationKey: ['useEditCampaignByIdMutation'],
    mutationFn: editCampaignById,
  });
};

export const useFollowCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useFollowCampaignMutation'],
    mutationFn: followCampaign,
  });
};

export const useRemoveCommentMutation = () => {
  return useMutation({
    mutationKey: ['useRemoveCommentMutation'],
    mutationFn: removeComment,
  });
};

export const useUpdateCommentMutation = () => {
  return useMutation({
    mutationKey: ['useUpdateCommentMutation'],
    mutationFn: updateComment,
  });
};

export const useLikeCommentMutation = () => {
  return useMutation({
    mutationKey: ['useLikeCommentMutation'],
    mutationFn: likeComment,
  });
};

export const useUnLikeCommentMutation = () => {
  return useMutation({
    mutationKey: ['useUnLikeCommentMutation'],
    mutationFn: unLikeComment,
  });
};

export const useCreateCommentMutation = () => {
  return useMutation({
    mutationKey: ['useCreateCommentMutation'],
    mutationFn: createComment,
  });
};

export const useSendReportCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useSendReportCampaignMutation'],
    mutationFn: sendReport,
  });
};

export const usePaymentSuccessMutation = () => {
  return useMutation({
    mutationKey: ['usePaymentSuccessMutation'],
    mutationFn: paymentSuccess,
  });
};

export const useLaunchCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useLaunchCampaignMutation'],
    mutationFn: launchCampaign,
  });
};
