import { useMutation } from '@tanstack/react-query';
import { changeStatusCampaign, deleteCampaign } from '~/api/admin/admin.campaigns.api';

export const useChangeStatusCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useChangeStatusCampaignMutation'],
    mutationFn: changeStatusCampaign,
  });
};

export const useDeleteCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteCampaignMutation'],
    mutationFn: deleteCampaign,
  });
};

