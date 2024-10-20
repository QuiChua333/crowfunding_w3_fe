import { useMutation } from '@tanstack/react-query';
import { addItem, deleteItem, editItem } from '~/api/user/item.api';

export const useAddItemMutation = () => {
  return useMutation({
    mutationKey: ['useAddItemMutation'],
    mutationFn: addItem,
  });
};

export const useEditItemMutation = () => {
  return useMutation({
    mutationKey: ['useEditItemMutation'],
    mutationFn: editItem,
  });
};

export const useDeleteItemMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteItemMutation'],
    mutationFn: deleteItem,
  });
};
