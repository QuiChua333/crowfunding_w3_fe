import { useQuery } from '@tanstack/react-query';
import {
  getListPerksByCampaignId,
  getPerk,
  getPerksByCampaignId,
  getPerksHasListItemsByCampaignId,
} from '~/api/user/perk.api';

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

export const useGetListPerksByCampaignId = (id) => {
  return useQuery({
    queryKey: [`getListPerksByCampaignId`],
    queryFn: () => getListPerksByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetPerksHasListItemsByCampaignIdQuery = (id) => {
  return useQuery({
    queryKey: [`useGetPerksHasListItemsByCampaignIdQuery`],
    queryFn: () => getPerksHasListItemsByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};
