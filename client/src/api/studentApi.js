import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const studentApi = {
   register: (params) => axios.post(
      `${baseUrl}student/register`,
      params
   ),
   getAll: () => axios.get(
      `${baseUrl}student`,
      headers
   ),
   getAllNoPage: () => axios.get(
      `${baseUrl}student/get-all`,
      headers
   ),
   getPaging: (params) => axios.get(
      `${baseUrl}student?page=${params}`,
      headers
   ),
   getOne: (id) => axios.get(
      `${baseUrl}student/${id}`,
      headers
   ),
   update: (id, params) => axios.put(
      `${baseUrl}student/update-status/${id}`,
      params,
      headers
   )
} 