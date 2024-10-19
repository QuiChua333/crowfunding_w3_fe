import { useMutation } from '@tanstack/react-query';
import { register } from '~/api/auth.api';
import { addPerk, deletePerk, editPerk } from '~/api/perk.api';

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
