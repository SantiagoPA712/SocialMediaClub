import axios from 'axios';

const API_URL = 'http://localhost:3001/orders';

export const getOrders = () => axios.get(API_URL);
export const addOrder = (order) => axios.post(API_URL, order);
export const getOrderById = (id) => axios.get(`${API_URL}/${id}`);
export const updateOrder = (id, updatedOrder) => axios.put(`${API_URL}/${id}`, updatedOrder);
export const deleteOrder = (id) => axios.delete(`${API_URL}/${id}`);


