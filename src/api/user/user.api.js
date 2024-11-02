import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getCurrentUser = async () => {
  const response = await CustomAxios.get(`${baseUrl}/user/findMe`);
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getUserByEmail/${email}`);
  return response.data;
};

export const getLinkVerifyUser = async (ownerId) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getLinkVerifyUser/${ownerId}`);
  return response.data;
};

export const updateProfileUser = async (dataUser) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/editUser/${dataUser.id}`, dataUser.body);
  return response.data.data;
};

export const getInfoVerifyUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getLinkVerifyUser/${id}`);
  return response.data.data;
};

export const updatePasswordUser = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/updatePassword`, body);
  return response;
};

export const getInfoUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getInfoUser/${id}`);
  return response;
};

export const getAllContributesOfUser = async (url) => {
  const response = await CustomAxios.get(url);
  return response.data;
};

export const requestVerifyInfoUser = async (dataApi) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/editUser/${dataApi.id}`, dataApi.infoVerify);
  return response;
};

export const checkLink = async (tokenLinkVerifyUser) => {
  const response = await CustomAxios.get(`${baseUrl}/user/checkLinkVerifyUser/${tokenLinkVerifyUser}`);
  return response;
};
