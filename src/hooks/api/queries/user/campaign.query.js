import { useQuery } from '@tanstack/react-query';
import {
  getCampaignById,
  getMoney,
  getPopulateCampaigns,
  getQuantityCampaignOfUser,
  getQuantityPeople,
  getTeam,
  getTeamMemberByCampaignId,
} from '~/api/user/campaign.api';

export const useGetCampaignByIdQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaignById`],
    queryFn: () => getCampaignById(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetTeamMemberByCampaignId = (id) => {
  return useQuery({
    queryKey: [`useGetTeamMemberByCampaignId`],
    queryFn: () => getTeamMemberByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetPopulateCampaigns = () => {
  return useQuery({
    queryKey: [`getPopulateCampaigns`],
    queryFn: () => getPopulateCampaigns(),
  });
};

export const useGetQuantityCampaignOfUserQuery = (id) => {
  return useQuery({
    queryKey: [`getQuantityCampaignOfUser`],
    queryFn: () => getQuantityCampaignOfUser(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetQuantityPeopleQuery = (id) => {
  return useQuery({
    queryKey: [`getQuantityPeople`],
    queryFn: () => getQuantityPeople(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetMoneyQuery = (id) => {
  return useQuery({
    queryKey: [`getMoney`],
    queryFn: () => getMoney(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetTeam = (id) => {
  return useQuery({
    queryKey: [`getTeam`],
    queryFn: () => getTeam(id),
    refetchOnWindowFocus: false,
  });
};
