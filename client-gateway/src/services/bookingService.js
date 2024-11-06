import axios from 'axios';

const API_URL = 'http://localhost:3002/bookings';

export const getBookings = () => axios.get(API_URL);
export const addBooking = (booking) => axios.post(API_URL, booking);
export const getBookingById = (id) => axios.get(`${API_URL}/${id}`);
export const updateBooking = (id, updatedBooking) => axios.put(`${API_URL}/${id}`, updatedBooking);
export const deleteBooking = (id) => axios.delete(`${API_URL}/${id}`);


