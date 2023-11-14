"use client"
import React from "react";
const EditPopup = (props) => {
    return (
         <div className="flex  relative mt-3 mr-[110px]">
        <div className="share-popup-box fixed h-full w-full top-0 right-0 left-0 bottom-0  z-[999] bg-[#20201c91] " style={{ display: !props.isopenEdit ? "none" : "block" }}>
            <div className="sm:right-0 sm:left-0 absolute rounded-[10px] bg-white left-[512px] right-[500px] top-[178px] p-4" >
                <div className="flex justify-between mb-[10px]">
                    <h3 className="font-bold ">Edit  </h3>
                    <i className="fa-sharp fa-solid fa-xmark" onClick={() => props.setIsopenEdit(false)}></i>
                </div>
                <div>
                    <input type="text" placeholder="Text Prompt" className="border w-[78%]  border-black rounded-[10px] py-3 px-2" />
                    <i className="fa-solid fa-play p-[10px] w-[38px] text-center m-[15px] rounded-[24px] border border-black"    ></i>
                </div>


            </div>
        </div>
        </div>
    )
}
export default EditPopup