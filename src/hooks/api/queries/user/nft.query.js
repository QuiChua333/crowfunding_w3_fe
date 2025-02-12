import { useQuery } from '@tanstack/react-query';
import { getNFT, getNFTsByCampaignId } from '~/api/user/nft.api';

// handleAPI
export const useGetNFTsByCampaignIdQuery = (id) => {
  return useQuery({
    queryKey: [`useGetNFTsByCampaignIdQuery`],
    queryFn: () => getNFTsByCampaignId(id),
    refetchOnWindowFocus: false,
  });
};

// handleAPI
export const useGetNFT = (id) => {
  return useQuery({
    queryKey: [`useGetNFT`],
    queryFn: () => getNFT(id),
    refetchOnWindowFocus: false,
    enabled: id !== 'new',
  });
};
