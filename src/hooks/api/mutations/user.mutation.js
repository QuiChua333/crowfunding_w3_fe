import { useMutation } from '@tanstack/react-query';
import { getUserByEmail } from '~/api/user.api';

export const useGetUserByEmailMutation = () => {
  return useMutation({
    mutationKey: [`useGetUserByEmailMutation`],
    mutationFn: getUserByEmail,
  });
};
