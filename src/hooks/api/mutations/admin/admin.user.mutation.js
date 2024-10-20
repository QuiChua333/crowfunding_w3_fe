import { useMutation } from '@tanstack/react-query';
import { changeStatusUser, verifyInfoUser } from '~/api/admin/admin.users.api';

export const useChangeStatusUserMutation = () => {
  return useMutation({
    mutationKey: ['useChangeStatusUserMutation'],
    mutationFn: changeStatusUser,
  });
};

export const useVerifyInfoUserMutation = () => {
  return useMutation({
    mutationKey: ['useVerifyInfoUserMutation'],
    mutationFn: verifyInfoUser,
  });
};
