import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const courseApi = {
   getAll: () => axios.get(
      `${baseUrl}course`
   ),
   getOne: (id) => axios.get(
      `${baseUrl}course/${id}`
   ),
   create: (params) => axios.post(
      `${baseUrl}course`,
      params,
      headers
   ),
   update: (id, params) => axios.put(
      `${baseUrl}course/${id}`,
      params,
      headers
   )
} 