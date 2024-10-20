import axios from 'axios';
import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const register = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/user/checkRegisterEmail`, body);
  return response.data;
};
