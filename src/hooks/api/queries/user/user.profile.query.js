import { useQuery } from '@tanstack/react-query';
import {
  getAllContributesOfUser,
  getCampaigns,
  getCampaignsFollowed,
  getInfoUser,
  getQuantityCampaignOfUser,
  getQuantityContributeOfUser,
} from '~/api/user/user.profile.api';

export const useGetInfoUserQuery = (id) => {
  return useQuery({
    queryKey: [`getInfoUser`],
    queryFn: () => getInfoUser(id),
  });
};

export const useGetQuantityCampaignOfUserQuery = (id) => {
  return useQuery({
    queryKey: [`getQuantityCampaignOfUser`],
    queryFn: () => getQuantityCampaignOfUser(id),
  });
};

export const useGetQuantityContributeOfUserQuery = (id) => {
  return useQuery({
    queryKey: [`getQuantityContributeOfUser`],
    queryFn: () => getQuantityContributeOfUser(id),
  });
};

export const useGetCampaignsQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaigns`],
    queryFn: () => getCampaigns(id),
  });
};

export const useGetCampaignsFollowedQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaignsFollowed`],
    queryFn: () => getCampaignsFollowed(id),
  });
};

export const useGetAllContributesOfUserQuery = (url) => {
  return useQuery({
    queryKey: ['getAllContributesOfUser', url],
    queryFn: () => getAllContributesOfUser(url),
  });
};
