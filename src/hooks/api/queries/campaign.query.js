import { useQuery } from '@tanstack/react-query';
import { getCampaignById } from '~/api/campaign.api';

export const useGetCampaignByIdQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaignById`],
    queryFn: () => getCampaignById(id),
  });
};
