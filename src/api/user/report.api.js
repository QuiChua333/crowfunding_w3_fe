import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const sendReport = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/report`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
