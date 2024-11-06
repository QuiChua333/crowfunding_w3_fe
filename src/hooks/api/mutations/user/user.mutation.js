import { useMutation } from '@tanstack/react-query';
import { getLinkVerifyUser, getUserByEmail, updatePasswordUser, updateProfileUser } from '~/api/user/user.api';

// handleAPI
export const useGetUserByEmailMutation = () => {
  return useMutation({
    mutationKey: [`useGetUserByEmailMutation`],
    mutationFn: getUserByEmail,
  });
};

// handleAPI
export const useUpdateProfileUserMutation = () => {
  return useMutation({
    mutationKey: ['useUpdateProfileUserMutation'],
    mutationFn: updateProfileUser,
  });
};

// handleAPI
export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationKey: ['useUpdatePasswordMutation'],
    mutationFn: updatePasswordUser,
  });
};
