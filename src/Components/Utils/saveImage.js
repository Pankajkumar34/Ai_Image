"use client"
import React from "react";
import axios from "axios";
import { getLocalStroage } from "../lib/windowError";
export const SaveImageAPI = async (aiData) => {
console.log(aiData,"aiDatasave")
let createdDate = new Date().toLocaleString();
console.log(createdDate,"createdDate")
    try {
        if (!aiData.text) {
            alert("data not found from server");
        }
        
        let userid= btoa(String(getLocalStroage()).toLowerCase())
        const ImageSaveapi = await axios.post(
            process.env.REACT_APP_GPT5_IMAGE_OJ + "saveImages",
            {
                id:aiData?.id,
                link_to_image: aiData?.text,
                creator:userid,
                keywords: aiData?.keywords,
                createdAt:aiData?.createdAt,
                Likes: 0,
                ai:aiData?.ai,
                selected:aiData?.selected
            }
        );
        console.log(ImageSaveapi,"ImageSaveapi") ;

    } catch (error) {
        console.log(error.message,"error");
    }

}