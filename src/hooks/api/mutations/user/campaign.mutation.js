import { useMutation } from '@tanstack/react-query';
import { editSendFundStatus } from '~/api/admin/admin.campaigns.api';
import {
  createComment,
  editCampaignById,
  launchCampaign,
  likeComment,
  paymentSuccess,
  removeComment,
  sendReport,
  createCampaign,
  unLikeComment,
  updateComment,
  checkCampaignOfUser,
  deleteCampaign,
} from '~/api/user/campaign.api';

// handleAPI
export const useStartCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useStartCampaignMutation'],
    mutationFn: createCampaign,
  });
};

// handleAPI
export const useCheckCampaignOfUserMutation = () => {
  return useMutation({
    mutationKey: ['useCheckCampaignOfUserMutation'],
    mutationFn: checkCampaignOfUser,
  });
};

// handleAPI
export const useEditCampaignByIdMutation = () => {
  return useMutation({
    mutationKey: ['useEditCampaignByIdMutation'],
    mutationFn: editCampaignById,
  });
};

// handleAPI
export const useLaunchCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useLaunchCampaignMutation'],
    mutationFn: launchCampaign,
  });
};

// handleAPI
export const useDeleteCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteCampaignMutation'],
    mutationFn: deleteCampaign,
  });
};
