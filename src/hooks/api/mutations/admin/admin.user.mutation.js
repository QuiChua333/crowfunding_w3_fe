import { useMutation } from '@tanstack/react-query';
import { changeStatusUser, checkAdmin, verifyInfoUser } from '~/api/admin/admin.users.api';

// handleAPI
export const useCheckAdminMutation = () => {
  return useMutation({
    mutationKey: ['useCheckAdminMutation'],
    mutationFn: checkAdmin,
  });
};

// handleAPI
export const useChangeStatusUserMutation = () => {
  return useMutation({
    mutationKey: ['useChangeStatusUserMutation'],
    mutationFn: changeStatusUser,
  });
};

// handleAPI
export const useVerifyInfoUserMutation = () => {
  return useMutation({
    mutationKey: ['useVerifyInfoUserMutation'],
    mutationFn: verifyInfoUser,
  });
};
