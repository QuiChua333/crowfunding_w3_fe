import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

// handleAPI
export const checkAdmin = async () => {
  await CustomAxios.get(`${baseURL}/admin/check-admin`);
};

// handleAPI
export const getAllUsers = async ({ page, userVerifyStatus, searchString, userStatus }) => {
  const queryParams = {
    page,
    searchString,
    userVerifyStatus,
    userStatus,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/user?${queryString}`);
  return response.data;
};

// handleAPI
export const changeStatusUser = async (id) => {
  const response = await CustomAxios.patch(`${baseURL}/user/change-status/${id}`);
  return response;
};

// handleAPI
export const verifyInfoUser = async (id) => {
  await CustomAxios.patch(`${baseURL}/user-verify/admin-verify/${id}`);
};
