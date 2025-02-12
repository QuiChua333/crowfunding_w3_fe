import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const createNFT = async ({ formData, data }) => {
  if (formData) {
    const response = await CustomAxios.post(`${baseUrl}/nft/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } else {
    const response = await CustomAxios.post(`${baseUrl}/nft/create`, data);
    return response.data;
  }
};

// handleAPI
export const getNFTsByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/nft/campaign/${id}`);
  return response.data;
};

// handleAPI
export const getNFT = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/nft/${id}`);
  return response.data;
};

// handleAPI
export const mintNFT = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/nft/mint`, data);
  return response.data;
};
