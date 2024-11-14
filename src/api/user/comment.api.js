import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

//handleAPI
export const createComment = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/comment`, data);
  return response.data;
};

//handleAPI
export const deleteComment = async (id) => {
  await CustomAxios.delete(`${baseUrl}/comment/${id}`);
};

//handleAPI
export const updateComment = async ({ commentId, content }) => {
  await CustomAxios.patch(`${baseUrl}/comment/${commentId}`, { content });
};

//handleAPI
export const getCommentsByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/comment/campaign/${id}`);
  return response.data;
};
