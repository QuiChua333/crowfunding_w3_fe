import { useQuery } from '@tanstack/react-query';
import { getItemContainPerks, getItemsByCampaignId, getItemsContainPerksByCampaignId } from '~/api/user/item.api';

export const useGetItemsByCampaignIdQuery = (id, enable = true) => {
  return useQuery({
    queryKey: [`useGetItemsByCampaignIdQuery`],
    queryFn: () => getItemsByCampaignId(id),
    refetchOnWindowFocus: false,
    enabled: enable,
  });
};

export const useGetItemsContainPerksByCampaignIdQuery = (id) => {
  return useQuery({
    queryKey: [`useGetItemsContainPerksByCampaignIdQuery`],
    queryFn: () => getItemsContainPerksByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetItemContainPerks = (body, enable = true) => {
  return useQuery({
    queryKey: [`useGetItemContainPerks`],
    queryFn: () => getItemContainPerks(body),
    refetchOnWindowFocus: false,
    enabled: enable,
  });
};
