import { useQuery } from '@tanstack/react-query';
import { getAllCampaigns, getAllFailedCampaigns, getAllSuccessCampaigns } from '~/api/admin/admin.campaigns.api';

// handleAPI
export const useGetAllCampaignsQuery = ({ page, status, searchString }) => {
  return useQuery({
    queryKey: ['getAllCampaigns', page, status, searchString],
    queryFn: () => getAllCampaigns({ page, status, searchString }),
  });
};

// handleAPI
export const useGetAllSuccessCampaign = ({ page, status, searchString }) => {
  return useQuery({
    queryKey: ['useGetAllSuccessCampaign', searchString, status, page],
    queryFn: () => getAllSuccessCampaigns({ page, status, searchString }),
  });
};

// handleAPI
export const useGetAllFailedCampaign = ({ page, status, searchString }) => {
  return useQuery({
    queryKey: ['useGetAllFailedCampaign', searchString, status, page],
    queryFn: () => getAllFailedCampaigns({ page, status, searchString }),
  });
};
