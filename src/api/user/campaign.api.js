import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// qq
export const createCampaign = async () => {
  const response = await CustomAxios.post(`${baseUrl}/campaign/new`);
  return response.data;
};

// qq
export const getCampaignById = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/${id}`);
  return response.data;
};

export const checkCampaignOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/${id}/checkOwner`);
  return response.data;
};

export const editCampaignById = async (data) => {
  const response = await CustomAxios.patch(`${baseUrl}/campaign/editCampaign/${data.id}`, data.body);
  return response.data;
};

export const getTeamMemberByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getTeamMember/${id}`);
  return response.data;
};

export const sendInvitation = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/campaign/sendInvitation`, body);
  return response.data;
};

export const deleteMember = async (body) => {
  const response = await CustomAxios.delete(`${baseUrl}/campaign/${body.campaignId}/deleteMember/${body.memberId}`);
  return response.data;
};

export const launchCampaign = async (id) => {
  const response = await CustomAxios.patch(`${baseUrl}/campaign/launchCampaign/${id}`);
  return response.data;
};

export const getQuantityCampaignByUser = async (campaignId) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getQuantityCampaignByUser/${campaignId}`);
  return response.data;
};

export const getPopulateCampaigns = async () => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getPopulateCampaigns`);
  return response.data.data;
};

export const getQuantityCampaignOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getQuantityCampaignByUser/${id}`);
  return response.data;
};

export const getQuantityPeople = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/getQuantityPeopleByCampaign/${id}`);
  return response.data;
};

export const getMoney = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/getMoneyByCampaign/${id}`);
  return response.data;
};

export const getTeam = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getTeamMember/${id}`);
  return response.data;
};

export const followCampaign = async (id) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/handleFollowedCampaigns`, { campaignId: id });
  return response.data;
};

export const removeComment = async (id) => {
  await CustomAxios.delete(`${baseUrl}/comment/deleteComment/${id}`);
};

export const updateComment = async (dataApi) => {
  await CustomAxios.patch(`${baseUrl}/comment/updateComment/${dataApi.id}`, dataApi.content);
};

export const likeComment = async (id) => {
  await CustomAxios.patch(`${baseUrl}/comment/likeComment/${id}`);
};

export const unLikeComment = async (id) => {
  await CustomAxios.patch(`${baseUrl}/comment/unLikeComment/${id}`);
};

export const createComment = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/comment/createComment`, data);
  return response.data;
};

export const sendReport = async (body) => {
  const response = await CustomAxios.post(body.url, body.data);
  return response.data;
};

export const paymentSuccess = async (url) => {
  const response = await CustomAxios.post(url);
  return response.data;
};
