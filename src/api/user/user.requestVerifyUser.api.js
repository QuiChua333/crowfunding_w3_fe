import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const requestVerifyInfoUser = async (dataApi) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/editUser/${dataApi.id}`, dataApi.infoVerify);
  return response;
};

export const checkLink = async (tokenLinkVerifyUser) => {
  const response = await CustomAxios.get(`${baseUrl}/user/checkLinkVerifyUser/${tokenLinkVerifyUser}`);
  return response;
};
