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

export const useUpdateProfileUserMutation = () => {
  return useMutation({
    mutationKey: ['useUpdateProfileUserMutation'],
    mutationFn: updateProfileUser,
  });
};

export const useGetInfoVerifyUserMutation = () => {
  return useMutation({
    mutationKey: ['useGetInfoVerifyUserMutation'],
    mutationFn: getInfoVerifyUser,
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationKey: ['useUpdatePasswordMutation'],
    mutationFn: updatePasswordUser,
  });
};

export const useRequestVerifyUserUserMutation = () => {
  return useMutation({
    mutationKey: ['useRequestVerifyUserUserMutation'],
    mutationFn: requestVerifyInfoUser,
  });
};
