import { useQuery } from '@tanstack/react-query';
import { getCommentsByCampaignId } from '~/api/user/comment.api';

// handleAPI
export const useGetCommentsByCampaignIdQuery = (id) => {
  return useQuery({
    queryKey: [`useGetCommentsByCampaignIdQuery`],
    queryFn: () => getCommentsByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};
