"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { TwitterShareButton } from "react-share";

const ImageId = () => {
  const { id } = useParams();
  const [ImageId, setImageId] = useState([]);

  const ImagePramsID = async () => {
  
    try {
      let userId=null
      if (typeof window !== "undefined") {
        let email = window.localStorage.getItem("userData");
        let userdata = JSON.parse(email);
         userId = userdata.email;
      }
      const response = await axios.get(
        process.env.Get_Images_OJ + `getImage/${id}?user_id=${userId}`
      );
  

      setImageId(response.data[0]);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  // like Image
    // like Image API
    const LikeImage = async (id) => {
      if (typeof window !== "undefined") {
        let email = window.localStorage.getItem("userData");
        let userdata = JSON.parse(email);
        let userId = userdata.email;
  
        const response = await axios.post(process.env.Get_Images_OJ + `like`, {
          userId: userId,
          image_id: id,
          date_time: new Date().toLocaleString(),
        });
        console.log("liker", response.data);
        ImagePramsID()
      }

    };

  useEffect(() => {
 
    ImagePramsID();
  }, []);

  return (
    <div
      className=" bg-[#e2e8f0] dark:bg-light-grey"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <div className=" max-w-[1140px] m-auto ">
        <div className="main_singleImage flex gap-[20px] pt-3">
          <div className="main_singleImage_Image_box">
            <img className="rounded" src={ImageId.link_to_image} alt="" />
          </div>
          <div className="imageinfo  ">
            <div className="flex justify-between items-center">
              <p>
                <b>OpenJourney</b>
              </p>
              <p className={` inline-block text-end shadow shadow-black my-2 p-2 rounded ${ImageId.is_user_liked > 0 ? "imageLiked" : ""}`} onClick={() => LikeImage(ImageId.id)}>
                {" "}
                <i className="fa-solid fa-heart " />
                {ImageId.like_count}
              </p>
            </div>

            <div className=" shadow shadow-black rounded w-[300px] h-[300px] p-3 flex flex-col justify-between items-center">
              <div className="flex gap-2">
                <p>
                  <b>{ImageId.keywords}</b>
                </p>
              </div>

              <div className="w-[80%]">
                    <TwitterShareButton className="shadow-black shadow my-2 p-2 rounded mx-3" url={ImageId.link_to_image}>
                    <span className="flex items-center gap-2 p-[10px] font-semibold">
                      <AiOutlineTwitter /> Share
                      </span>
                    </TwitterShareButton>
                
                <button className="shadow-black shadow my-2 p-[10px] rounded">
                  <span className="flex items-center gap-2 font-semibold">
                    {" "}
                    <FiCopy />
                    {""}Copy
                  </span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageId;
