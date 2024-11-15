import { useQuery } from '@tanstack/react-query';
import { getAllGiftsByCampaign } from '~/api/user/gift.api';

// handleAPI
export const useGetAllGiftssByCampaignQuery = ({ campaignId, searchString, status, page }) => {
  return useQuery({
    queryKey: ['useGetAllGiftssByCampaignQuery', searchString, status, page],
    queryFn: () =>
      getAllGiftsByCampaign({
        campaignId,
        searchString,
        status,
        page,
      }),
    refetchOnWindowFocus: false,
  });
};
