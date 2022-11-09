export const baseUrl = "https://api.perfectbuxgalter.uz/api/v1/"
export const token = localStorage.getItem('token');
export const headers = { headers: { Authorization: `Bearer ${token}` } }
export const serverUrl = "https://api.perfectbuxgalter.uz"