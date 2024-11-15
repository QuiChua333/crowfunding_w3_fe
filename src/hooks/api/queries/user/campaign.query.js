import { useQuery } from '@tanstack/react-query';
import {
  getCampaignById,
  getCampaignsOfMember,
  getCampaignsOfOwner,
  getCampaignsOfUser,
  getCampainsExplore,
  getPopulateCampaigns,
  getQuantityCampaignsOfOwner,
  getQuantityCampaignsOfUser,
  getQuantitySuccessCampaignByCampaignId,
  getQuantitySuccessCampaignsOfUser,
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

export const useGetQuantitySuccessCampaignByCampaignId = (id) => {
  return useQuery({
    queryKey: [`useGetQuantitySuccessCampaignByCampaignId`, id],
    queryFn: () => getQuantitySuccessCampaignByCampaignId(id),
    refetchOnWindowFocus: false,
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
export const useGetCampaignsOfMemberQuery = (id) => {
  return useQuery({
    queryKey: [`useGetCampaignsOfMemberQuery`],
    queryFn: () => getCampaignsOfMember(id),
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
export const useGetQuantitySuccessCampaignsOfUserQuery = (id) => {
  return useQuery({
    queryKey: [`useGetQuantitySuccessCampaignsOfUserQuery`],
    queryFn: () => getQuantitySuccessCampaignsOfUser(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useUserGetAllCampaignQuery = ({ page, status, searchString, criteria, field, fieldGroup }) => {
  return useQuery({
    queryKey: ['useUserGetAllCampaignQuery', page, status, searchString, criteria, field, fieldGroup],
    queryFn: () => getCampainsExplore({ page, status, searchString, criteria, field, fieldGroup }),
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
