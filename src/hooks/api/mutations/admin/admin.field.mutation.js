import { useMutation } from "@tanstack/react-query";
import { createField, deleteField, updateField } from "~/api/admin/admin.field.api";

// handleAPI
export const useUpdateFieldMutation = () => {
    return useMutation({
      mutationKey: ['useUpdateFieldMutation'],
      mutationFn: updateField,
    });
};


// handleAPI
export const useCreateFieldMutation = () => {
  return useMutation({
    mutationKey: ['useCreateFieldMutation'],
    mutationFn: createField,
  });
};

// handleAPI
export const useDeleteFieldMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteFieldMutation'],
    mutationFn: deleteField,
  });
};

