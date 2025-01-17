import { useMutation } from '@tanstack/react-query';
import { changeStatusCampaign, adminDeleteCampaign, editSendFundStatus } from '~/api/admin/admin.campaigns.api';

// handleAPI
export const useChangeStatusCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useChangeStatusCampaignMutation'],
    mutationFn: changeStatusCampaign,
  });
};

export const useAdminDeleteCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteCampaignMutation'],
    mutationFn: adminDeleteCampaign,
  });
};

// handleAPI
export const useEditSendFundStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditSendFundStatusMutation`],
    mutationFn: editSendFundStatus,
  });
};
