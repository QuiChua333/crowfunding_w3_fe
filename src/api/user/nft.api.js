import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const createNFT = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/nft/create`, data);
  return response.data;
};

// handleAPI
export const mintNFT = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/nft/mint`, data);
  return response.data;
};
