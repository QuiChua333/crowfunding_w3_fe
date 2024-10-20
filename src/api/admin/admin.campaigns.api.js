import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

export const getAllCampaigns = async (url) => {
  const response = await CustomAxios.get(url);
  return response.data;
};

export const changeStatusCampaign = async (dataApi) => {
  await CustomAxios.patch(`${baseURL}/campaign/adminChangeStatusCampaign/${dataApi.id}`, dataApi.status);
};

export const deleteCampaign = async (id) => {
  await CustomAxios.delete(`${baseURL}campaign/adminDeleteCampaign/${id}`);
};
