import { useMutation } from '@tanstack/react-query';
import { deleteMember, editCampaignById, launchCampaign, sendInvitation } from '~/api/user/campaign.api';

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

export const useLaunchCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useLaunchCampaignMutation'],
    mutationFn: launchCampaign,
  });
};
