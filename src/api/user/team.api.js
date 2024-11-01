import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getTeamMemberByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/team-member/campaign/${id}`);
  return response.data;
};

// handleAPI
export const sendInvitation = async ({ campaignId, email, isEdit }) => {
  const response = await CustomAxios.post(`${baseUrl}/team-member/campaign/${campaignId}`, {
    email,
    isEdit,
  });
  return response.data;
};

// handleAPI
export const deleteMember = async ({ campaignId, userId }) => {
  const response = await CustomAxios.delete(`${baseUrl}/team-member/campaign/${campaignId}/${userId}`);
  return response.data;
};
