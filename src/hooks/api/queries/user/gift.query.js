import { useMutation } from '@tanstack/react-query';
import { getAllGiftsByCampaign } from '~/api/user/gift.api';

export const useGetAllGiftsByCampaignQuery = () => {
  return useMutation({
    mutationKey: [`useGetAllGiftsByCampaignQuery`],
    mutationFn: getAllGiftsByCampaign,
  });
};
