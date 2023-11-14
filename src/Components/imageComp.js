// "use client";
// import React from "react";

// import {  TwitterIcon, TwitterShareButton } from "react-share";

// /**
//  * A component that displays an image.
//  *
//  * @param {string} text - The source of the image to display.
//  * @returns {JSX.Element} - A JSX element representing the image.
//  */
// const imageComp = ({ url, selected, Time }) => {
//   console.log(url, "url");
//   return (
//     <div className="message__wrapper ">
//       <div className="ml-1">
//         <img
//           className={`" message__img"`}
//           src={url}
//           alt="dalle generated"
//           loading="lazy"
//         />
//       </div>
//       <div className="flex justify-between items-center w-[100%]  p-1 ml-1 bg-[#c8d0db] text-black">
//         <span>{selected}</span>

//         <span>Time at {Time}</span>
//         <div className=" ">
//         <TwitterShareButton title="twitter"  url={url}>
//             <TwitterIcon size={32} round className=" pr-1 pt-1" />
//           </TwitterShareButton>
//         </div>
     
 
//       </div>
//     </div>
//   );
// };

// export default imageComp;
"use client"
import React from "react";
import { TwitterIcon, TwitterShareButton } from "react-share";

const ImageComp = ({ url, selected, Time }) => {
  return (
    <div className="message__wrapper">
      <div className="ml-1">
        <img
          className="message__img"
          src={url}
          alt="dalle generated"
          loading="lazy"
        />
      </div>
      <div className="flex justify-between items-center w-[100%] p-1 ml-1 bg-[#c8d0db] text-black">
        <span className="font-semibold">{selected}</span>
        <span className="font-semibold">Time at {Time}</span>
        <div className="TwitterShareButton ">
          <TwitterShareButton title="Check out this image" url={url}>
            <TwitterIcon size={32} round className="pr-1 pt-1" />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default ImageComp;
