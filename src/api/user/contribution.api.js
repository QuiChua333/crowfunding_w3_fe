import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getTopUserContributionByCampaign = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/campaign/${id}/top-contributions`);
  return response.data;
};

// handleAPI
export const getMoneyByCampaign = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/campaign/${id}/total-money`);
  return response.data;
};

// handleAPI
export const getQuantityPeopleByCampaign = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/campaign/${id}/quantity-people`);
  return response.data;
};

// handleAPI
export const editContributionStatus = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/contribution/${body.id}/status`, body.data);
  return response.data;
};

// handleAPI
export const getQuantityContributeOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/user/quantity`);
  return response;
};

// handleAPI
export const paymentStripe = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/contribution/payment/stripe`, body);
  return response.data;
};

// handleAPI
export const paymentMomo = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/contribution/payment/momo`, body);
  return response.data;
};

export const paymentSuccess = async () => {
  const response = await CustomAxios.post(`${baseUrl}/contribution/checkout/momo/success`);
  return response.data;
};

export const getAllContributionsByCampaign = async ({ id, queryString }) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/campaign/${id}?${queryString}`);
  return response.data;
};
