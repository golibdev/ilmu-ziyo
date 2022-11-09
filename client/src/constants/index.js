export const baseUrl = "http://localhost:5000/api/v1/"
export const token = localStorage.getItem('token');
export const headers = { headers: { Authorization: `Bearer ${token}` } }
export const serverUrl = "http://localhost:5000"