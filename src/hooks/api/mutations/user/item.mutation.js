import { useMutation } from '@tanstack/react-query';
import { addItem, deleteItem, editItem } from '~/api/user/item.api';

// handleAPI
export const useAddItemMutation = () => {
  return useMutation({
    mutationKey: ['useAddItemMutation'],
    mutationFn: addItem,
  });
};

// handleAPI
export const useEditItemMutation = () => {
  return useMutation({
    mutationKey: ['useEditItemMutation'],
    mutationFn: editItem,
  });
};

// handleAPI
export const useDeleteItemMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteItemMutation'],
    mutationFn: deleteItem,
  });
};
