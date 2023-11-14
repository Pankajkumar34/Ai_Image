"use client";
import React, { useState, useRef } from "react";
import { MdComputer } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import moment from "moment";
import Image from "next/image";
import SharePopup from "./NewComponents/IconsPopup/ShareIcon";
import EditPopup from "./NewComponents/IconsPopup/EditIPrompt";
// import axios from "axios";
const imageModels = ["DALL·E", "OpenJourney"];
import ImageComp from "./imageComp";
import PersonImg from "../assets/person.png";
// import searchgpt from "@/app/searchgpt/page";

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */

const ChatMessage = (props) => {
  const { id, createdAt, Time, text, ai = false, selected } = props.message;


  const ref = useRef(null);

  const [isopen, setIsopen] = useState(false); //popup share icon
  const [isopenEdit, setIsopenEdit] = useState(false); //popup Edit icon

  const editIcon = () => {
   
      setIsopenEdit(!isopenEdit);
  
  };

  return (
    <>
      <div
        className={`${
          ai && "flex-row-reverse bg-light-white "
        } message  sm:flex`}
      >
        {imageModels.includes(selected) && ai ? (
          <section className="flex flex-col">
            {/* <div className="message__pic hidden">
          
              <MdComputer />
            </div> */}

            <ImageComp url={text} selected={selected} Time={Time} />
          </section>
        ) : (
       <div className="flex">
         {ai ===true ?<div className="message__pic">
               <MdComputer />
            </div>:""}
           <div className="message__wrapper " ref={ref}>
          
              <ReactMarkdown
            
               className={`message__markdown ${ai ? "text-left" : "text-right"}`}
               children={text}
               remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
               components={{
                 a: ({ node, ...props }) => (
                   <a
                     className="text-red"
                     style={{ background: "red" }}
                     onClick={() => handleClick(props.href)}
                   >
                     {props.href}
                   </a>
                 ),
                 code({ node, inline, className, children, ...props }) {
                   const match = /language-(\w+)/.exec(
                     className || "language-js"
                   );
 
                   return !inline && match ? (
                     <SyntaxHighlighter
                       children={String(children).replace(/\n$/, "")}
                       style={atomDark}
                       language={match[1]}
                       PreTag="div"
                       {...props}
                     />
                   ) : (
                     <code className={className} {...props}>
                       {children}{" "}
                     </code>
                   );
                 },
               }}
             /> 
 {/* // thumbs icons  */}
          {ai===true &&  <div className={`${ai && "text-left"} `}>
               <i className=" services-icons fa-regular fa-thumbs-up  text-[15px] cursor-pointer dark:text-slate-300 "></i>
               <i className="services-icons fa-regular fa-thumbs-down pl-[15px] text-[15px] cursor-pointer dark:text-slate-300 "></i>
               <i
                 onClick={editIcon}
                 className=" services-icons fa-sharp fa-solid fa-pen-to-square text-[15px]  px-[15px] cursor-pointer dark:text-slate-300 "
               ></i>
               <i
                 onClick={() => setIsopen(!isopen)}
                 className=" services-icons fa-solid fa-share-from-square text-[12px] cursor-pointer dark:text-slate-300 "
               ></i>
             </div>}
  {/* // thumbs icons  end */}
             <div
               className={`${
                 ai ? "text-left" : "text-right "
               } message__createdAt `}
             >
               {moment(createdAt).calendar()}
             </div>
            
           </div>
       </div>
          
        )}

        

        {!ai  && (
          <div className="message__pic profilepic">
            <Image
              className="rounded-full"
              loading="lazy"
              src={PersonImg}
              alt="profile pic"
            />
          </div>
        )}
      </div>
      <SharePopup setIsopen={setIsopen} isopen={isopen} />

      <EditPopup setIsopenEdit={setIsopenEdit} isopenEdit={isopenEdit} />
    </>
  );
};

export default ChatMessage;
