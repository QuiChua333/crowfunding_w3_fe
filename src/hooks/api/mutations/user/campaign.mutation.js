import { useMutation } from '@tanstack/react-query';
import {
  checkAdmin,
  createComment,
  deleteMember,
  editCampaignById,
  launchCampaign,
  followCampaign,
  likeComment,
  paymentSuccess,
  removeComment,
  sendInvitation,
  sendReport,
  startCampaign,
  unLikeComment,
  updateComment,
} from '~/api/user/campaign.api';

export const useEditCampaignByIdMutation = () => {
  return useMutation({
    mutationKey: ['useEditCampaignByIdMutation'],
    mutationFn: editCampaignById,
  });
};

export const useSendInvitationMutation = () => {
  return useMutation({
    mutationKey: ['useSendInvitationMutation'],
    mutationFn: sendInvitation,
  });
};

export const useDeleteMemberMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteMemberMutation'],
    mutationFn: deleteMember,
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

export const useCheckAdminMutation = () => {
  return useMutation({
    mutationKey: ['useCheckAdminMutation'],
    mutationFn: checkAdmin,
  });
};

export const useStartCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useStartCampaignMutation'],
    mutationFn: startCampaign,
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
