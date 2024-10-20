import { useMutation } from '@tanstack/react-query';
import { deleteCampaign } from '~/api/admin/admin.campaigns.api';
import { getInfoVerifyUser, updatePasswordUser, updateProfileUser } from '~/api/user/user.profile.api';

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

export const useDeleteCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteCampaignMutation'],
    mutationFn: deleteCampaign,
  });
};
