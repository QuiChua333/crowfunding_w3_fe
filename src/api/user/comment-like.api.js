import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

//handleAPI
export const likeComment = async (id) => {
  await CustomAxios.post(`${baseUrl}/comment-like`, { commentId: id });
};
