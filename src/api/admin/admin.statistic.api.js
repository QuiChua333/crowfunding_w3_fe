import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

//handleAPI
export const getStatisticTotalCampaignAdmin = async () => {
  const response = await CustomAxios.get(`${baseURL}/statistic/admin/total-campaign`);
  return response.data;
};

export const getStatisticCampaignByTimeAdmin = async ({ quarter, year }) => {
  const queryParams = {
    quarter,
    year,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/statistic/admin/campaign-by-time?${queryString}`);

  return response.data;
};

export const getStatisticMoneyByTimeAdmin = async ({ year }) => {
  const queryParams = {
    year,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/statistic/admin/money-by-time?${queryString}`);
  console.log(response.data);
  return response.data;
};
