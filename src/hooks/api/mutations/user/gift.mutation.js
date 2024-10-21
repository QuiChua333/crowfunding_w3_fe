import { useMutation } from '@tanstack/react-query';
import { addGift, editGiftStatus, getAllGiftsByCampaign } from '~/api/user/gift.api';

export const useGetAllGiftsByCampaignQuery = () => {
  return useMutation({
    mutationKey: [`useGetAllGiftsByCampaignQuery`],
    mutationFn: getAllGiftsByCampaign,
    refetchOnWindowFocus: false,
  });
};

export const useAddGiftMutation = () => {
  return useMutation({
    mutationKey: [`useAddGiftMutation`],
    mutationFn: addGift,
    refetchOnWindowFocus: false,
  });
};

export const useEditGiftStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditGiftStatusMutation`],
    mutationFn: editGiftStatus,
    refetchOnWindowFocus: false,
  });
};
