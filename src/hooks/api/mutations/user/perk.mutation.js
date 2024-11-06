import { useMutation } from '@tanstack/react-query';
import { addPerk, deletePerk, editPerk } from '~/api/user/perk.api';

// handleAPI
export const useDeletePerkMutation = () => {
  return useMutation({
    mutationKey: ['useDeletePerkMutation'],
    mutationFn: deletePerk,
  });
};

// handleAPI
export const useAddPerkMutation = () => {
  return useMutation({
    mutationKey: ['useAddPerkMutation'],
    mutationFn: addPerk,
  });
};

// handleAPI
export const useEditPerkMutation = () => {
  return useMutation({
    mutationKey: ['useEditPerkMutation'],
    mutationFn: editPerk,
  });
};
