// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import { ChatContext } from "@/Components/Contex/ChatContext";
// import axios from "axios";

// const Chatbtn = ({setopenchat}) => {
//   const [editableId, setEditableId] = useState(null);

//   const [Check, setCheck] = useState(false);
//   const [getData, setGetData] = useState([]);
//   const [EditData, setEditData] = useState();
//   const [messages, addMessage, clearMessages] = useContext(ChatContext);

//   function clear() {
//     clearMessages({});
//   }

//   //update convo
//   const UpdateConvo = async (id) => {
//     if (EditData) {
//       let responce = await axios.put(
//         process.env.Get_Images_OJ + `users/${id}`,
//         {
//           title: `${EditData}`,
//         }
//       );
//       FetchApi();
//       // console.log("--", responce);
//     }

//     setCheck(false);
//   };
//   // const FetchApi = async () => {
//   //   let responce = await axios.get(process.env.Get_Images_OJ + "getusers");
//   //   let res = await responce.data;
//   //   setGetData(res);
//   // };

//   // useEffect(() => {
//   //   FetchApi();
//   // }, [messages]);

//   // const EditConvo = async (id) => {
//   //   setEditableId(id);
//   //   const response = await axios.get(process.env.Get_Images_OJ + `users/${id}`);
//   //   setEditData(response.data.user.title);
//   //   setCheck(true);
//   // };

//   const showOldConv = async (id) => {
//     clearMessages({});
//     const response = await axios.get(process.env.Get_Images_OJ + `users/${id}`);
//     const oldCanvoChat = response.data.user;
//     const idPresent = messages.some(
//       (message) => message.id === oldCanvoChat.id
//     );
//     if (!idPresent) {
//       addMessage(oldCanvoChat);
//      setopenchat(false);
//     }
//   };
//   return (
//     <div className="all-topics w-[200px] leading-10  shadow transition-all duration-300   ">
//       <div className={`pl-[10px] my-2 `}>
//         <span
//           className=" border-black inline-flex items-center border rounded-lg pl-2"
//           onClick={() => clear()}
//         >
//           <i className=" fa-solid fa-plus ml-[4px] text-[#551a8b]"></i>{" "}
//           <p className=" cursor-pointer w-[152px] pl-[10px] outline-none te bg-inherit text-[16px] font-bold text-[#551a8b]">
//             New Chat
//           </p>
//         </span>
//       </div>
//       {getData &&
//         getData?.results?.map((item, index) => {
//           if (item.title == null) {
//             return true;
//           } else {
//             return (
//               <div
//                 className="all-topic-name  pl-[14px] flex hover:bg-slate-500 hover:text-white hover:cursor-pointer "
//                 key={index}
//               >
//                 {!Check ? (
//                   <>
//                     <p
//                       className="text-[#551a8b] w-[75%] pl-2"
//                       onClick={() => showOldConv(item.id)}
//                     >
//                       {item.title.slice(0, 15)}
//                     </p>
//                     <i
//                       className="fa-sharp fa-solid fa-pen-to-square mt-[10px] ml-[10px] text-[#551a8b]"
//                       onClick={() => EditConvo(item.id)}
//                     ></i>
//                   </>
//                 ) : (
//                   <>
//                     {editableId === item.id ? (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="All topics"
//                           value={EditData}
//                           onChange={(e) => setEditData(e.target.value)}
//                           className=" cursor-pointer w-[152px]  outline-none  pl-2 bg-inherit focus:pointer-events-auto"
//                         />
//                         <i
//                           className="fa-solid fa-check text-[#551a8b] mt-3"
//                           onClick={() => UpdateConvo(item.id)}
//                         ></i>
//                       </>
//                     ) : (
//                       <>
//                         <p className="text-[#551a8b] w-[75%] pl-2">
//                           {item.title.slice(0, 15)}
//                         </p>
//                         <i
//                           className="fa-sharp fa-solid fa-pen-to-square mt-[10px] ml-[10px] text-[#551a8b]"
//                           onClick={() => EditConvo(item.id)}
//                         ></i>
//                       </>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           }
//         })}
//     </div>
//   );
// };

// export default Chatbtn;
