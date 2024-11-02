import { useMutation } from '@tanstack/react-query';
import { followCampaign } from '~/api/user/follow-campaign';

// handleAPI
export const useFollowCampaignMutation = () => {
  return useMutation({
    mutationKey: [`useFollowCampaignMutation`],
    mutationFn: followCampaign,
  });
};
