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

// handleAPI
export const getContributeNFT = async ({searchString, page}) => {
  const queryParams = {
    page,
    searchString
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/nft/current-user?${queryString}`);
  return response.data;
};