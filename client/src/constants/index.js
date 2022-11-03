export const baseUrl = "http://localhost:4000/api/v1/"
export const token = localStorage.getItem('token');
export const headers = { headers: { Authorization: `Bearer ${token}` } }