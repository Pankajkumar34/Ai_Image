"use client";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
// import Chatbtn from "../ChatBtnTopbar/Chatbtn";
import Link from "next/link";

import { usePathname } from "next/navigation";
// import Sharebtn from "../TopbarShare/Share";

const TopbarBtns = ({setisOpenChat,isOpenChat} ) => {
const router = usePathname()

  // for date event outside clck
  function useOutsideAlerter1(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setisOpenChat(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter1(wrapperRef);

  return (
    <div>
      <div className="new-topic relative">
        <Link
          type="button"
          // onClick={Chatbutton}
          className={`nav_createbtn  ${router=='/'?"active-nav":""}`}
          href="/"
          prefetch={false}
        >
          Create
        </Link>
        {/* <Link
          className="sm:pl-[1.5rem] sm:pr-0 sm:text-[15px] px-[3rem] text-white"
          href="/"
          prefetch={false}
        >
          Topics
        </Link> */}
        <Link
          className={`nav_createbtn px-[21px] py-[10px] ${router=='/find'?"active-nav ":""}`}
          href="/find"
          prefetch={false}
        >
          Find
        </Link>
       
      </div>
      <div className="topic-main absolute  ">
        <div
          className="popup sm:left-[35px] topic absolute  rounded-[12px] top-[20px]  left-[30px] z-10 bg-white  "
          style={{
            height:!isOpenChat?"0": "300px",
            overflowX: "scroll",
            transitionDuration: "200ms",
          }}
          ref={wrapperRef}
        >
          {/* <Chatbtn
            setopenchat={setisOpenChat}
            isOpenChat={isOpenChat}
          /> */}
        </div>
      </div>
    </div>
  );
};
export default TopbarBtns;
