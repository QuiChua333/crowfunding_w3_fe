import { useMutation } from "@tanstack/react-query";
import { createFieldGroup, deleteFieldGroup, updateFieldGroup } from "~/api/admin/admin.fieldGroup.api";

// handleAPI
export const useUpdateFieldGroupMutation = () => {
    return useMutation({
      mutationKey: ['useUpdateFieldGroupMutation'],
      mutationFn: updateFieldGroup,
    });
};


// handleAPI
export const useCreateFieldGroupMutation = () => {
  return useMutation({
    mutationKey: ['useCreateFieldGroupMutation'],
    mutationFn: createFieldGroup,
  });
};

// handleAPI
export const useDeleteFieldGroupMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteFieldGroupMutation'],
    mutationFn: deleteFieldGroup,
  });
};

