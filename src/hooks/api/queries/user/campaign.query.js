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
export const useGetCampaignsOfOwnerQuery = ({ id, searchString, status, page }) => {
  return useQuery({
    queryKey: [`useGetCampaignsOfOwnerQuery`, id, searchString, status, page],
    queryFn: () => getCampaignsOfOwner({ id, searchString, status, page }),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetCampaignsOfMemberQuery = ({ id, searchString, status, page }) => {
  return useQuery({
    queryKey: [`useGetCampaignsOfMemberQuery`, id, searchString, status, page],
    queryFn: () => getCampaignsOfMember({ id, searchString, status, page }),
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
