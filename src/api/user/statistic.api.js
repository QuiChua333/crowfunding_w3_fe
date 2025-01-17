import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

//handleAPI
export const getStatisticTotalCampaignOfCurrentUser = async () => {
  const response = await CustomAxios.get(`${baseUrl}/statistic/me/total-campaign`);
  return response.data;
};

export const getStatisticCampaignByTimeOfCurrentUser = async ({ quarter, year }) => {
  const queryParams = {
    quarter,
    year,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/statistic/me/campaign-by-time?${queryString}`);

  return response.data;
};

export const getStatisticMoneyByTimeOfCurrentUser = async ({ year }) => {
  const queryParams = {
    year,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/statistic/me/money-by-time?${queryString}`);
  console.log(response.data);
  return response.data;
};
