import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

export const fetchNeeds = () => axios.get(`${API_URL}/needs`);
export const createNeed = (data) => axios.post(`${API_URL}/needs`, data);
export const fetchVolunteers = () => axios.get(`${API_URL}/volunteers`);
export const matchVolunteers = (needId) => axios.get(`${API_URL}/volunteers/match/${needId}`);
export const assignVolunteer = (needId, volunteerId) => axios.post(`${API_URL}/volunteers/assign`, { needId, volunteerId });
export const autoAssignAll = () => axios.post(`${API_URL}/volunteers/auto-assign`);
export const updateStatus = (needId, status) => axios.post(`${API_URL}/volunteers/update-status`, { needId, status });
export const createVolunteer = (data) => axios.post(`${API_URL}/volunteers`, data);
