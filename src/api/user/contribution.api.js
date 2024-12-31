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
export const editRefundStatus = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/contribution/refund/${body.id}/status`, body.data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// handleAPI
export const getQuantityContributionOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/contribution/user/${id}/quantity`);
  return response.data;
};

// handleAPI
export const getAllContributesOfUser = async ({ page, searchString, status, userId, sortContributionDate }) => {
  const queryParams = {
    page,
    searchString,
    status,
    sortContributionDate,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/contribution/current-user?${queryString}`);
  return response.data;
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

// handleAPI
export const paymentCrypto = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/contribution/payment/crypto`, body);
  return response.data;
};

export const paymentSuccess = async () => {
  const response = await CustomAxios.post(`${baseUrl}/contribution/checkout/momo/success`);
  return response.data;
};

export const getAllContributionsByCampaign = async ({
  campaignId,
  searchString,
  status,
  sortMoney,
  sortContributionDate,
  page,
}) => {
  const queryParams = {
    campaignId,
    searchString,
    status,
    sortMoney,
    sortContributionDate,
    page,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/contribution/campaign/${campaignId}?${queryString}`);
  return response.data;
};

export const getAllRefundsByCampaign = async ({ campaignId, searchString, status, sortMoney, page }) => {
  const queryParams = {
    campaignId,
    searchString,
    status,
    sortMoney,
    page,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/contribution/refund/campaign/${campaignId}?${queryString}`);
  return response.data;
};
