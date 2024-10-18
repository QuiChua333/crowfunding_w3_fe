import { useMutation } from '@tanstack/react-query';
import { register } from '~/api/auth.api';
import { editCampaignById } from '~/api/campaign.api';

export const useEditCampaignByIdMutation = () => {
  return useMutation({
    mutationKey: ['useEditCampaignByIdMutation'],
    mutationFn: editCampaignById,
  });
};
