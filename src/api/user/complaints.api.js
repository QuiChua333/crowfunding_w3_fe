import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getAllReportOfCurrentUser = async ({ page, status, searchString }) => {
  const queryParams = {
    page,
    status,
    searchString,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/report/me?${queryString}`);
  return response.data;
};
