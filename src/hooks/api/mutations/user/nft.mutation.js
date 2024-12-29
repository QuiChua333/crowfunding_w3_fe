import { useMutation } from '@tanstack/react-query';
import { createNFT, mintNFT } from '~/api/user/nft.api';

// handleAPI
export const useCreateNFTMutation = () => {
  return useMutation({
    mutationKey: ['useCreateNFTMutation'],
    mutationFn: createNFT,
  });
};

// handleAPI
export const useMintNFTMutation = () => {
  return useMutation({
    mutationKey: ['useMintNFTMutation'],
    mutationFn: mintNFT,
  });
};
