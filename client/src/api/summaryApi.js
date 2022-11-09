import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const summaryApi = {
   getSummaryData: () => axios.get(
      `${baseUrl}summary`,
      headers
   )
}