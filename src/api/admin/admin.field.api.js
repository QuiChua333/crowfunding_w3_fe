import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

// handleAPI
export const getAllFieldByGroup = async ({ page, textSearch, idFieldGroup }) => {
  const queryParams = {
    page,
    textSearch,
    idFieldGroup
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/field?${queryString}`);
  return response.data;
};

export const updateField = async ({ id, name }) => {

  const response = await CustomAxios.patch(`${baseURL}/field/${id}`, { name });
  return response.data;
};

export const createField = async ({ name, fieldGroupId }) => {
  const response = await CustomAxios.post(`${baseURL}/field`, { name, fieldGroupId });
  return response.data;
};

export const deleteField = async ({ id }) => {
  const response = await CustomAxios.delete(`${baseURL}/field/${id}`);
  return response.data;
};

