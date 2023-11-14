"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { removeLocalStroage } from "../lib/windowError";
import { getLocalStroage } from "../lib/windowError";
import { MdClose, MdMenu } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import { useRouter,usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const DarkMode =dynamic(()=>import('../DarkMode'), { ssr: false })

// const Setting = dynamic(() => import("../Setting"), { ssr: false })
// import Modal from "../Modal";

const menyLinkStyle = {
  color: "rgb(255 255 255)",
  borderBottom: "1px solid",
  paddingTop: " 4px",
};

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);


  let router = useRouter(); // navigate
let pathname=usePathname(); // get pathname


  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const newLocal = <DarkMode open={open} />;






  const LoginBtn = () => {
     if(!userEmail){
      router.push('/login')
     }else{
      removeLocalStroage()
      router.push('/login')
     }
  }



  return (
    <>
      <section
        className={` px-0 py-[8px] ${open ? " w-full " : "w-full h-[57px] sm:bg-black  sm:text-black"
          } sidebar  fixed top-0 right-0 left-0 bottom-0 z-[1] bg-black h-[57px] `}
      >
        <div className="sidebar__app-bar items-center justify-between">
          <div className={`sidebar__btn-close  pl-[10px] flex items-center`}>
            <div className="fabars_button ">

             <span onClick={() => setOpen(!open)}>
              {!open ? (
                <MdMenu
                  className="sidebar__btn-icon"
                  style={{ fontSize: "25px" }}
                ></MdMenu>
              ) : (
                <MdClose
                  className="sidebar__btn-icon"
                  style={{ fontSize: "25px" }}
                ></MdClose>
              )}
            </span> 
            </div>
            <div className="menu_button ml-[50px] flex">
            <Link href='/'  className="GPT_menus mr-5 "  style={{background: pathname === '/' ? '#2563eb' : '#808080b8'}}>Create</Link>
            <Link href='/find' className=" GPT_menus px-[20px]"  style={{background: pathname === '/find' ? '#2563eb' : '#808080b8'}}>Find</Link>
          </div>
          </div>
          
         


          <div className="pr-[30px] flex gap-[2rem]">
            <Link href='/subscripation' className=" subscribe_btn hover:bg-[#417cfb] transition-[0.25s] ">Subscribe</Link>
            <Link href='/login' className="login_btn hover:bg-[#417cfb] transition-[0.25s] " onClick={LoginBtn} >{!getLocalStroage()?"Login":"Log Out"}</Link>
          </div>
        </div>

        <div className="nav z-10 absolute top-[58px] ">
          <ul
            className="  dropdown-list  font-Rubik duration-200"
            style={{ height: !open ? "0" : "122px" }}
          >
            <li>
              <Link href='/'>
                <h1
                  className={`pl-2  ${!open && "hidden"
                    }  text-black `}
                  style={menyLinkStyle}
                >
                  Main page  <span >{<BiChevronRight className="w-[25px]" style={{ display: "inherit" }} />}</span>
                </h1>
              </Link>
            </li>
            <li>
              <Link href='/pay'>
                <h1
                  className={`pl-2  ${!open && "hidden "
                    }  text-black`}
                  style={menyLinkStyle}
                >
                  Payment <span  >{<BiChevronRight className="w-[45px]" style={{ display: "inherit" }} />}</span>
                </h1>
              </Link >
            </li>
            <li>
              <h1 className="flex items-center cursor-pointer text-white">
                {newLocal}
              </h1>
            </li>
          </ul>
        </div>

        {/* <Modal
          title="Setting"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <Setting />
        </Modal> */}
      </section>
    </>
  );
};

export default SideBar;
