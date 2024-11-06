import { useMutation } from '@tanstack/react-query';

import { addGift, editGiftStatus, getAllGiftsByCampaign } from '~/api/user/gift.api';

// handleAPI
export const useAddGiftMutation = () => {
  return useMutation({
    mutationKey: [`useAddGiftMutation`],
    mutationFn: addGift,
  });
};

// handleAPI
export const useEditGiftStatusMutation = () => {
  return useMutation({
    mutationKey: [`useEditGiftStatusMutation`],
    mutationFn: editGiftStatus,
  });
};
