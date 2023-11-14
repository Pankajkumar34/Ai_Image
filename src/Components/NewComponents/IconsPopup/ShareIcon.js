"use client"
import React from "react";
const SharePopup = (props) => {
  return (
    <div className="flex  relative mr-[110px]">
    <div
      className=" share-popup-box  fixed h-full w-full top-0 right-0 left-0 bottom-0  z-[999] bg-[#20201c91] "
      style={{ display: !props.isopen ? "none" : "block" }}
    >
      <div className="sm:right-0 sm:left-0 absolute rounded-[10px] bg-white left-[512px] right-[500px] top-[178px] p-4">
        <div className="flex justify-between mb-[10px]">
          <h3 className="font-bold ">Share Chat </h3>
          <i
            className="fa-sharp fa-solid fa-xmark"
            onClick={() => props.setIsopen(false)}
          ></i>
        </div>

        <div className="">
          <p className="p-1 border border-black">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point{" "}
          </p>
          <div className="my-3">
            <input type="radio" />
            {""} Showcase: <input type="checkbox" />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="border px-3 bg-[#f74444]  text-white font-[500]  rounded"
            onClick={() => props.setIsopen(false)}
          >
            Cancel
          </button>
          <button
            className="ml-[150px] py-[4px] px-3 border bg-[#4CAF50] rounded font-[500] text-white"
            onClick={() => props.setIsopen(false)}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};
export default SharePopup;
