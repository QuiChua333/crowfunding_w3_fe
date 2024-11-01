import { useQuery } from '@tanstack/react-query';
import { getTeamMemberByCampaignId } from '~/api/user/team.api';

export const useGetTeamMemberByCampaignId = (id) => {
  return useQuery({
    queryKey: [`useGetTeamMemberByCampaignId`],
    queryFn: () => getTeamMemberByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};
