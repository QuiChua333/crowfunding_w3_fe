import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

// handleAPI
export const getAllFieldGroup = async ({ page, textSearch }) => {
  const queryParams = {
    page,
    textSearch
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/field-group?${queryString}`);
  return response.data;
};

export const getFieldGroupById = async ({ id }) => {
  const response = await CustomAxios.get(`${baseURL}/field-group/${id}`);
  return response.data;
};

export const updateFieldGroup = async ({ id, name }) => {

  const response = await CustomAxios.patch(`${baseURL}/field-group/${id}`, { name });
  return response.data;
};

export const createFieldGroup = async ({ name }) => {
  const response = await CustomAxios.post(`${baseURL}/field-group`, { name });
  return response.data;
};

export const deleteFieldGroup = async ({ id }) => {
  const response = await CustomAxios.delete(`${baseURL}/field-group/${id}`);
  return response.data;
};



