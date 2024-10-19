import { useQuery } from '@tanstack/react-query';
import { getPerk, getPerksByCampaignId } from '~/api/perk.api';

export const useGetPerksByCampaignIdQuery = (id) => {
  return useQuery({
    queryKey: [`useGetPerksByCampaignIdQuery`],
    queryFn: () => getPerksByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetPerk = (id) => {
  return useQuery({
    queryKey: [`useGetPerk`],
    queryFn: () => getPerk(id),
    refetchOnWindowFocus: false,
  });
};
