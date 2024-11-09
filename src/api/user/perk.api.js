import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getPerksByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/campaign/${id}`);
  return response.data;
};

// handleAPI
export const getPerk = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/${id}`);
  return response.data;
};

// handleAPI
export const deletePerk = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/perk/${id}`);
  return response.data;
};

// handleAPI
export const addPerk = async ({ id, formData, data }) => {
  if (formData) {
    const response = await CustomAxios.post(`${baseUrl}/perk`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } else {
    const response = await CustomAxios.post(`${baseUrl}/perk`, data);
    return response.data;
  }
};

// handleAPI
export const editPerk = async ({ perkId, formData }) => {
  const response = await CustomAxios.patch(`${baseUrl}/perk/${perkId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// handleAPI
export const getPerksHasListItemsByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/contain-items/campaign/${id}`);
  return response.data;
};
