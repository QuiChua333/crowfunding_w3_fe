import { useMutation } from '@tanstack/react-query';
import { getLinkVerifyUser, getUserByEmail } from '~/api/user/user.api';

export const useGetUserByEmailMutation = () => {
  return useMutation({
    mutationKey: [`useGetUserByEmailMutation`],
    mutationFn: getUserByEmail,
  });
};

export const useGetLinkVerifyUserMutation = () => {
  return useMutation({
    mutationKey: [`useGetLinkVerifyUserMutation`],
    mutationFn: getLinkVerifyUser,
  });
};
