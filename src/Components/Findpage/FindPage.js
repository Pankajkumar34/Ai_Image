"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SortBtn from "../NewComponents/sortBtn";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRouter } from "next/navigation";
import { getLocalStroage } from "../lib/windowError";
// import Spinner from "../NewComponents/Spinner";
// const imageModels = ["DALL·E", "OpenJourney"];
const findpage = () => {
  const BaseUrl = process?.env?.REACT_APP_GPT5_IMAGE_OJ;
  const [getImg, setGetImg] = useState([]); // get image data
  const [sortdata, setSortData] = useState([]); /// //all sort data like ,date ,include , exclude
  const [sortToggle, setSortToggle] = useState(false); // toggle for map

  const [totalData, setTotalData] = useState();
  const [paginationNum, setPaginationNum] = useState();

  const [sortLikes, setSortLikes] = useState('')
  const [sortDate, setSortDate] = useState('')
  const [is_Liked, stIs_liked] = useState([])
  const [spinner, setSpinner] = useState(false);
  // ======================states==========================//


  // =======spinner========//
  useEffect(() => {
    const interval = setInterval(() => {
      setSpinner(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // =======spinner========//
  const navigate = useRouter(); // router
  const GetImageData = async () => {
    //pagintion API here
    try {
      // const response = await axios.get(process.env.Get_Images_OJ + "getImages");
      const response = await axios.get(
        `${BaseUrl}pegination?page=${paginationNum}&limit=${2}`
      );
      setTotalData(response?.data?.totalLength);
      setGetImg(response?.data?.currentPageData);
      setSortToggle(false);
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  // pagination number increase handleClick
  const handlePageClick = (e) => {
    setPaginationNum(e.selected + 1);
  };


  //validaton for get image
  const isImageFile = (filename) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    return imageRegex.test(filename);
  };


  // like Image API
  const LikeImage = async (id) => {
    const response = await axios.put(BaseUrl + `likeImages/` + `${id}`, {
      Like_user: getLocalStroage(),
      createdAt: Date.now(),
    });
    console.log("liker", response.data)

    GetImageData();

  };


  useEffect(() => {
    const checkLiked = async () => {
      const response2 = await axios.get(BaseUrl + `likedimage/` + `${getLocalStroage()}`)
      let checked = response2?.data?.results
      console.log(checked, "checked")
      stIs_liked(checked)
    }
    checkLiked()

  }, [])
  /// Go to singleImage page
  const ImageIdGet = (id) => {
    navigate.push(`/find/${id}`);
  };
  // pagination fc
  useEffect(() => {
    GetImageData();

  }, [paginationNum]);

  return (

    <div className="main-find-page pt-[65px] bg-[#e2e8f0] overflow-auto relative  dark:bg-light-grey ">
      <div className="container max-w-[1280px] m-auto">
        <div className="flex ">
          <div className="sortBtns  w-[300px]  h-screen">
            <SortBtn
              setSortToggle={setSortToggle}
              handlePageClick={handlePageClick}
              totalData={totalData}
              getImg={getImg}
              setSortData={setSortData}
              setSortLikes={setSortLikes}
              sortLikes={sortLikes}
              setSortDate={setSortDate}
              sortDate={sortDate}
            />
          </div>
          <div className="sm:pb-[83px]  getimg-box flex-wrap flex justify-end gap-[23px]   ">
            {getImg && !sortToggle
              ? getImg?.map((items, index) => {


                if (isImageFile(items.link_to_image)) {
                  return (
                    <div>
                      <div
                        key={index}
                        className="OjImagebox sm:px-[6px] mb-2 relative  p-2  "
                      >
                        <div
                          className=" object-bottom object-cover rounded"
                          onClick={() => ImageIdGet(items.id)}
                        >

                          <LazyLoadImage
                            className=" sm:w-[300px] sm:h-[300px] h-[400px] w-[400px] rounded"
                            alt="Images"
                            effect="blur"
                            src={items.link_to_image}
                          />

                        </div>

                        <div className=" left-[10px] leading-[18px] pt-[10px] absolute bottom-[20px]">
                          <div className="likes_date">
                            <p
                              onClick={() => LikeImage(items.id, index)}
                              className={`inline-block pl-2 ${is_Liked.includes(items.id) ? "imageLiked" : "text-gray-400"
                                }`}
                            >
                              <span
                                className={`sm:pl-3 cursor-pointer text-[20px] `}
                              >
                                {" "}
                                <i className={`fa-solid fa-heart `}></i>
                                {items.Likes == 0 ? "" : items.Likes}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
              : sortdata?.map((items, index) => {
                if (isImageFile(items.link_to_image)) {
                  return (
                    <div>
                      <div
                        key={index}
                        className="OjImagebox sm:px-[6px] mb-2 relative  p-2  "
                      >
                        <div
                          className=" object-bottom object-cover rounded"
                          onClick={() => ImageIdGet(items.id)}
                        >

                          <LazyLoadImage
                            className=" sm:w-[300px] sm:h-[300px] h-[400px] w-[400px] rounded"
                            alt="Images"
                            effect="blur"
                            src={items.link_to_image}
                          />

                        </div>

                        <div className=" left-[10px] leading-[18px] pt-[10px] absolute bottom-[20px]">
                          <div className="likes_date">
                            <p
                              onClick={() => LikeImage(items.id, index)}
                              className={`inline-block pl-2 ${is_Liked.includes(items.id) ? "imageLiked" : "text-gray-400"
                                }`}
                            >
                              <span
                                className={`sm:pl-3 cursor-pointer text-[20px] `}
                              >
                                {" "}
                                <i className={`fa-solid fa-heart `}></i>
                                {items.Likes == 0 ? "" : items.Likes}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>

        </div>
      </div>
    </div>

  );
};

export default findpage;
