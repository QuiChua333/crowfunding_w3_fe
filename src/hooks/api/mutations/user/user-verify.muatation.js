import { useMutation } from '@tanstack/react-query';
import { requestVerifyInfoUser, updateVerifyInfoUser } from '~/api/user/user-vefify.api';

// handleAPI
export const useRequestVerifyUserUserMutation = () => {
  return useMutation({
    mutationKey: ['useRequestVerifyUserUserMutation'],
    mutationFn: requestVerifyInfoUser,
  });
};

// handleAPI
export const useUpdateVerifyUserUserMutation = () => {
  return useMutation({
    mutationKey: ['useUpdateVerifyUserUserMutation'],
    mutationFn: updateVerifyInfoUser,
  });
};
