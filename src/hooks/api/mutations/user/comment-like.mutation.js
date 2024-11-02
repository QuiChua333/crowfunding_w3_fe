import { useMutation } from '@tanstack/react-query';
import { likeComment, unLikeComment } from '~/api/user/comment-like.api';

//handleAPI
export const useLikeCommentMutation = () => {
  return useMutation({
    mutationKey: ['useLikeCommentMutation'],
    mutationFn: likeComment,
  });
};
