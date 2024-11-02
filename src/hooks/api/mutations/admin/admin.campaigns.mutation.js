import { useMutation } from '@tanstack/react-query';
import { changeStatusCampaign, adminDeleteCampaign } from '~/api/admin/admin.campaigns.api';

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
