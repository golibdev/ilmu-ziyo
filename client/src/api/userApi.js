import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const userApi = {
   register: (params) => axios.post(
      `${baseUrl}user/register`,
      params
   ),
   getAll: () => axios.get(
      `${baseUrl}user`,
      headers
   ),
   getAllNoPage: () => axios.get(
      `${baseUrl}user/get-all`,
      headers
   ),
   getPaging: (params) => axios.get(
      `${baseUrl}user?page=${params}`,
      headers
   ),
   getOne: (id) => axios.get(
      `${baseUrl}user/${id}`,
      headers
   ),
} 