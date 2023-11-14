
import axios from 'axios'
import { SEARCH_GPT_API_ENDPOINT } from '../config'

export const callSearchGPT = async (prompt, email) => {
   const axiosConfig = {
     headers: {
       'Content-Type': 'application/json;charset=UTF-8',
       "Access-Control-Allow-Origin": "*",
     }
   }

   const body = {
    "request_id":btoa(String(email).toLowerCase()),
    "q":prompt,
    "is_use_source":"true",
    "llm_service_provider":"openai",
    "llm_model":"gpt-3.5-turbo",
    "language":"en-US"
   }

   const reqUri = SEARCH_GPT_API_ENDPOINT + "generate"


   const data = await axios.post(reqUri, body, axiosConfig)


   return data.data.response_text
};
