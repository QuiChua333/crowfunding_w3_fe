import { useMutation } from '@tanstack/react-query';
import { requestVerifyInfoUser } from '~/api/user/user.requestVerifyUser.api';

export const useRequestVerifyUserUserMutation = () => {
  return useMutation({
    mutationKey: ['useRequestVerifyUserUserMutation'],
    mutationFn: requestVerifyInfoUser,
  });
};

