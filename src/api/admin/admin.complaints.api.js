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

export const replyComplaint = async ({ reportId, formData }) => {
  const response = await CustomAxios.post(`${baseUrl}/report-response/report/${reportId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
