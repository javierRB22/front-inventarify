import axios from 'axios';

const API_URL = 'http://localhost:3001/api/ventas';

export const getVentas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createVenta = async (venta) => {
  const response = await axios.post(API_URL, venta);
  return response.data;
};

export const updateVenta = async (id, venta) => {
  const response = await axios.put(`${API_URL}/${id}`, venta);
  return response.data;
};

export const deleteVenta = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
