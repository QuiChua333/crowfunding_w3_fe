import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getTopUserContributionByCampaign = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/getTopUserContributionByCampaign/${id}`);
  return response.data;
};

export const getMoneyByCampaign = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/getMoneyByCampaign/${id}`);
  return response.data;
};

export const getQuantityPeopleByCampaign = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/getQuantityPeopleByCampaign/${id}`);
  return response.data;
};

export const getAllContributionsByCampaign = async ({ id, queryString }) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/getAllContributionsByCampaign/${id}?${queryString}`);
  return response.data;
};

export const editContributionStatus = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/contribution/editStatus/${body.id}`, body.data);
  return response.data;
};

export const paymentMomo = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/contribution/paymentMomo/handle`, body);
  return response.data;
};
