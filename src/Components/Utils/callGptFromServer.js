"use client"
import axios from 'axios'

import { GPT_API_ENDPOINT } from '../config';

export const callGptFromServer = async (prompt, email) => {
  
   const axiosConfig = {
     headers: {
       'Content-Type': 'application/json;charset=UTF-8',
       "Access-Control-Allow-Origin": "*",
     }
   }

   const body = {
     prompt,
     userId:btoa(String(email).toLowerCase())
   }

   const data = await axios.post(GPT_API_ENDPOINT + "generate", body, axiosConfig)

   return data.data.data.choices[0].message.content;
};
