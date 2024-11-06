import { useQuery } from '@tanstack/react-query';
import { getItemContainPerks, getItemsByCampaignId, getItemsContainPerksByCampaignId } from '~/api/user/item.api';

// handleAPI
export const useGetItemsByCampaignIdQuery = (id, enable = true) => {
  return useQuery({
    queryKey: [`useGetItemsByCampaignIdQuery`],
    queryFn: () => getItemsByCampaignId(id),
    refetchOnWindowFocus: false,
    enabled: enable,
  });
};

// handleAPI
export const useGetItemsContainPerksByCampaignIdQuery = (id) => {
  return useQuery({
    queryKey: [`useGetItemsContainPerksByCampaignIdQuery`],
    queryFn: () => getItemsContainPerksByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetItemContainPerks = (id, enable = true) => {
  return useQuery({
    queryKey: [`useGetItemContainPerks`],
    queryFn: () => getItemContainPerks(id),
    refetchOnWindowFocus: false,
    enabled: enable,
  });
};
