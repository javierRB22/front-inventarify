import axios from 'axios';

const API_URL = 'http://localhost:3001/api/proveedores';

export const getProveedores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProveedor = async (proveedor) => {
  const response = await axios.post(API_URL, proveedor);
  return response.data;
};

export const updateProveedor = async (id, proveedor) => {
  const response = await axios.put(`${API_URL}/${id}`, proveedor);
  return response.data;
};

export const deleteProveedor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
