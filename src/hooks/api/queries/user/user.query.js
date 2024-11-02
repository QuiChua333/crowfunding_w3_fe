import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '~/api/user/user.api';
import { useQuery } from '@tanstack/react-query';
import {
  getAllContributesOfUser,
  getCampaigns,
  getInfoUser,
  getQuantityCampaignOfUser,
  getQuantityContributeOfUser,
} from '~/api/user/user.profile.api';

// handleAPI
export const useGetCurrentUserQuery = () => {
  const token = localStorage.getItem('accessToken') || false;
  return useQuery({
    queryKey: [`getCurrentUser`],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};

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

export const useGetAllContributesOfUserQuery = (url) => {
  return useQuery({
    queryKey: ['getAllContributesOfUser', url],
    queryFn: () => getAllContributesOfUser(url),
  });
};

export const useCheckLinkUserQuery = (tokenLinkVerifyUser) => {
  return useQuery({
    queryKey: [`checkLink`],
    queryFn: () => checkLink(tokenLinkVerifyUser),
  });
};
