import { useQuery } from '@tanstack/react-query';
import { getContributeNFT } from '~/api/user/nft.api';


// handleAPI
export const useGetContributesNFTQuery = ({searchString, page}) => {
  return useQuery({
    queryKey: [`useGetContributesNFTQuery`, searchString, page],
    queryFn: () => getContributeNFT({searchString, page}),
  });
};