import { useMutation } from '@tanstack/react-query';
import { replyComplaint } from '~/api/admin/admin.complaints.api';

export const useReplyComplaintMutation = () => {
  return useMutation({
    mutationKey: ['useReplyComplaintMutation'],
    mutationFn: replyComplaint,
  });
};
