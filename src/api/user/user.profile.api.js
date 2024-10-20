import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const updateProfileUser = async (dataUser) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/editUser/${dataUser.id}`, dataUser.body);
  return response.data.data;
};

export const getInfoVerifyUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getLinkVerifyUser/${id}`);
  return response.data.data;
};

export const updatePasswordUser = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/updatePassword`, body);
  return response;
};

export const getInfoUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getInfoUser/${id}`);
  return response;
};

export const getQuantityCampaignOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getQuantityCampaignOfUserId/${id}`);
  return response;
};

export const getQuantityContributeOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/getQuantityContributeOfUserId/${id}`);
  return response;
};

export const getCampaigns = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getCampaignsOfUserId/${id}`);
  return response;
};

export const getCampaignsFollowed = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getCampaignFollowed/${id}`);
  return response;
};

export const deleteCampaign = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/campaign/delete/userDeleteCampaign/${id}`);
  return response;
};

export const getAllContributesOfUser = async (url) => {
  const response = await CustomAxios.get(url);
  return response.data;
};
