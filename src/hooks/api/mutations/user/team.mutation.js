import { useMutation } from '@tanstack/react-query';
import { deleteMember, sendInvitation } from '~/api/user/team.api';

export const useSendInvitationMutation = () => {
  return useMutation({
    mutationKey: ['useSendInvitationMutation'],
    mutationFn: sendInvitation,
  });
};

export const useDeleteMemberMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteMemberMutation'],
    mutationFn: deleteMember,
  });
};
