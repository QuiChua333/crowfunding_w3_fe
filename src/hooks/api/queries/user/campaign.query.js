import { useQuery } from '@tanstack/react-query';
import {
  getCampaignById,
  getCampaignsOfOwner,
  getCampaignsOfUser,
  getPopulateCampaigns,
  getQuantityCampaignsOfOwner,
  getQuantityCampaignsOfUser,
} from '~/api/user/campaign.api';

// handleAPI
export const useGetCampaignByIdQuery = (id) => {
  return useQuery({
    queryKey: [`getCampaignById`, id],
    queryFn: () => getCampaignById(id),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

// handleAPI
export const useGetCampaignsOfOwnerQuery = (id) => {
  return useQuery({
    queryKey: [`useGetCampaignsOfOwnerQuery`],
    queryFn: () => getCampaignsOfOwner(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetQuantityCampaignsOfOwnerQuery = (campaignId) => {
  return useQuery({
    queryKey: [`useGetQuantityCampaignsOfOwnerQuery`],
    queryFn: () => getQuantityCampaignsOfOwner(campaignId),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetCampaignsOfUserQuery = (id) => {
  return useQuery({
    queryKey: [`useGetCampaignsOfUserQuery`],
    queryFn: () => getCampaignsOfUser(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetQuantityCampaignOfUserQuery = (id) => {
  return useQuery({
    queryKey: [`getQuantityCampaignOfUser`],
    queryFn: () => getQuantityCampaignsOfUser(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetPopulateCampaigns = () => {
  return useQuery({
    queryKey: [`getPopulateCampaigns`],
    queryFn: () => getPopulateCampaigns(),
    refetchOnWindowFocus: false,
  });
};
