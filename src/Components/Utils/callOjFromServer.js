"use client"
import axios from "axios";
import { OJ_API_ENDPOINT } from "../config";

export const callOjFromServer = async (prompt, email) => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },

  };

  const body = {
    image_description: prompt,
    userId: btoa(String(email).toLowerCase()),
    
  };
  console.log("body", body)

  const data = await axios.post(
    OJ_API_ENDPOINT + "create-image",
    body,
    axiosConfig,
  );
  console.log("data", data)

  // console.log("dataapi", data);

  const uri = OJ_API_ENDPOINT + "output/" + data.data.image_name;
   console.log("uri",uri)
  return uri;
};
