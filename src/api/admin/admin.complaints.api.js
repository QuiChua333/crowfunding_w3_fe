import { CustomAxios } from '~/config';

export const getAllReports = async (url) => {
  const response = await CustomAxios.get(url);
  return response.data;
};

export const replyComplaint = async (dataApi) => {
  const response = await CustomAxios.patch(dataApi.url, dataApi.data);
  return response.data;
}