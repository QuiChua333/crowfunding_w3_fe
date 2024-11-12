import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getAllReports = async ({ page, status, searchString }) => {
  const queryParams = {
    page,
    status,
    searchString,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/report?${queryString}`);
  return response.data;
};

export const replyComplaint = async (dataApi) => {
  const response = await CustomAxios.patch(dataApi.url, dataApi.data);
  return response.data;
};
