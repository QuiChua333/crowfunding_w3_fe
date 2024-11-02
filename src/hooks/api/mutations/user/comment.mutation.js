import { useMutation } from '@tanstack/react-query';
import { createComment, deleteComment, likeComment, updateComment } from '~/api/user/comment.api';

//handleAPI
export const useCreateCommentMutation = () => {
  return useMutation({
    mutationKey: ['useCreateCommentMutation'],
    mutationFn: createComment,
  });
};

//handleAPI
export const useDeleteCommentMutation = () => {
  return useMutation({
    mutationKey: ['useDeleteCommentMutation'],
    mutationFn: deleteComment,
  });
};

//handleAPI
export const useUpdateCommentMutation = () => {
  return useMutation({
    mutationKey: ['useUpdateCommentMutation'],
    mutationFn: updateComment,
  });
};
