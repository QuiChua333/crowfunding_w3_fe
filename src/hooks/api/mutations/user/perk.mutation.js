import { useMutation } from '@tanstack/react-query';
import { addPerk, deletePerk, editPerk } from '~/api/user/perk.api';

export const useDeletePerkMutation = () => {
  return useMutation({
    mutationKey: ['useDeletePerkMutation'],
    mutationFn: deletePerk,
  });
};

export const useAddPerkMutation = () => {
  return useMutation({
    mutationKey: ['useAddPerkMutation'],
    mutationFn: addPerk,
  });
};

export const useEditPerkMutation = () => {
  return useMutation({
    mutationKey: ['useEditPerkMutation'],
    mutationFn: editPerk,
  });
};
