import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getCampaignById = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getCampaignById/${id}`);
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
