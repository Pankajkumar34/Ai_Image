"use client"
import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
const SortBtn = ({ handlePageClick, totalData, setSortData, getImg, setSortToggle,setSortDate,sortDate,setSortLikes,sortLikes }) => {
  
  const [includesToggle, setIncludesToggle] = useState(false);
  const [excludesToggle, setExcludesToggle] = useState(false);
  const [sortvalue, setSortvalue] = useState(""); // exclude include inter value
  const [exIn, setExIn] = useState(false);
 

const handleChange=(e)=>{
  let value = e.target.value
  if(value ==='newest' || value ==='oldest'){
   
    setSortDate(value)
    console.log(value,"Date")
    
    const sortedArray = [...getImg].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        setSortToggle(true)
        return value === "newest" ? dateA - dateB : dateB - dateA;

    });
    console.log(sortedArray,"sortedArrayDate")
    setSortData(sortedArray);

  }else if(value ==='least' || value ==='most'){
  console.log(sortDate,"likes")
    setSortLikes(value)

    const sortedArray = [...getImg].sort((a, b) => {
        setSortToggle(true)
        return value === "least" ? a.Likes - b.Likes :b.Likes - a.Likes;;
    });
    console.log(sortedArray,"sortedArrayLikes")
    setSortData(sortedArray);
  }else{
    return true
  }

}



  // const sortData = (sortBy, sortOrder) => {
  //   console.log(sortBy,"sortBy")
  //   if (sortBy === "include") {
  //     if (!sortvalue) {
  //       alert("include words");
  //     }
  //     axios
  //       .get(process.env.Get_Images_OJ + `include/${sortvalue}`)
  //       .then((res) => {
  //         console.log("includeObj", res.data);
  //         setSortData(res.data);
  //         GetImageData();
  //       })
  //       .catch((err) => {
  //         console.log(err.messge);
  //       });
  //   } else if (sortBy === "exclude") {
  //     axios
  //       .get(process.env.Get_Images_OJ + `exclude/${sortvalue}`)
  //       .then((res) => {
  //         console.log("in", res.data);
  //         setSortData(res.data);
  //         setIncludesToggle(false);
  //       })
  //       .catch((err) => {
  //         console.log(err.messge);
  //       });
  //   }

  //   const sortedArray = [...getImg].sort((a, b) => {
  //     if (sortDate) {
  //       const dateA = new Date(a.date);
  //       const dateB = new Date(b.date);

  //       return sortDate === "newest" ? dateA - dateB : dateB - dateA;
  //     }
  //     if (sortLikes) {
  //       console.log()
  //       return sortLikes === "least"
  //         ? a.likes - b.likes
  //         : b.likes - a.likes;
  //     }

  //     return 0;
  //   });

  //   setSortData(sortedArray);
  //   setSortToggle(true);
  // };
  return (
    <>
      <div className="shortbtn w-[300px]">

        <div className=" sidebar sm:w-[250px] sm:gap-[6px] fixed gap-[1rem]">
          <h4>
            <strong className="text-grey dark:text-white">Sort By:</strong>{" "}
          </h4>
          <div className="relative  ">
            <select closeMenuOnSelect={false} className="w-[133px] h-[38px] rounded" value={sortLikes} onChange={(e)=>handleChange(e)}>
        
              <option>
                Likes
              </option>
              <option value="least">
                <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                />
                {""} Least
              </option>
              <option value="most">

                <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                />
                {""} Most

              </option>
            </select>
          </div>
          {/* // date sorting */}
          <div className="relative">
          <select className="w-[133px] h-[38px] rounded" value={sortDate} onChange={handleChange}>
              <option>
                Date
              </option>
              <option value="newest">
                <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                />
                {""} Newest
              </option>
              <option value="oldest" >

                <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                />
                {""} Oldest

              </option>
            </select>
          </div>
          {/*Search Exclude Include words*/}

          <div className="sortbtnexclude-include sm:block  hidden ">
            <button
              className="  bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
              onClick={() => setExIn(!exIn)}
            >
              Search
            </button>
          </div>

          {/*sm mobile div*/}

          <div
            className=" sm:absolute sm:bottom-[38px] sm:right-0 sm:w-full sm:p-2 sm:flex sm:flex-col bg-[#e2e8f0]"
            style={{ display: !exIn ? "none" : "block" }}
           
          >
            {/*sm Include Words */}

            <div className="relative mb-2">
              <div className="w-full bottom-[51px] shadow h-[35px] rounded pt-1 px-1  bg-white">
                <input
                  type="text"
                  placeholder="Include Words"
                  className="w-full outline-none bg-white"
                  onChange={(e) => setSortvalue(e.target.value)}
                />{" "}
                <span
                  className="cursor-pointer absolute right-5"
                  onClick={() => sortData("include")}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: "20px", marginTop: "2px" }}
                    icon={faPlus}
                  />
                </span>
              </div>
            </div>
            {/*sm Exclude Words */}
            <div className="relative">
              <div className="w-full bottom-[51px]   shadow h-[35px] rounded pt-1 px-1 bg-white">
                <input
                  type="text"
                  placeholder="Exclude Words"
                  className="w-full outline-none bg-white"
                  onChange={(e) => setSortvalue(e.target.value)}
                />{" "}
                <span
                  className="cursor-pointer absolute right-5 "
                  onClick={() => sortData("Exclude")}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: "20px", marginTop: "2px" }}
                    icon={faPlus}
                  ></FontAwesomeIcon>
                </span>
              </div>
            </div>
          </div>

          {/*sm end*/}

          <div
            className={`sm:hidden  excludewords`}
            
          >
            <button
             
              className="flex items-center   bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
            >
              Include Words
            </button>

            <div
              className="bg-[#060b49]  shadow w-[33%] absolute bottom-[53px] rounded top-[-74px] right-0 p-[12px] left-0 m-auto"
              style={{ display: !includesToggle ? "none" : "block" }}
            >
              <div className="include_input  border  rounded pt-1 px-1 shadow bg-white relative ">
                <input
                  type="text"
                  placeholder="Includes Words"
                  className="w-full outline-none bg-white h-[34px] "
                  onChange={(e) => setSortvalue(e.target.value)}
                />{" "}
                <span
                  className="cursor-pointer absolute  right-[10px] top-[10px]"
                  onClick={() => sortData("include")}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: "16px" }}
                    icon={faPlus}
                  ></FontAwesomeIcon>
                </span>
              </div>
            </div>
            {/*------------*/}
            <div >
              <button
                
                className=" flex items-center bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
              >
                Exclude Words
              </button>

              {excludesToggle && (
                <div className="bg-[#060b49]  shadow w-[33%] absolute bottom-[53px] rounded top-[-74px] right-0 p-[12px] left-0 m-auto">
                  <div className="exclude_input  border  rounded pt-1 px-1 shadow bg-white relative ">
                    <input
                      type="text"
                      placeholder="Excludes Words"
                      className="w-full outline-none bg-white h-[34px] "
                      onChange={(e) => setSortvalue(e.target.value)}
                    />{" "}
                    <span
                      className="cursor-pointer absolute  right-[10px] top-[10px]"
                      onClick={() => sortData("exclude")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "16px" }}
                        icon={faPlus}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
        {/* //pagiantion */}
        <div
          className="pagination bg-[#e2e8f0] dark:bg-light-grey  p-2  flex my-0 bottom-0
            justify-center "
        >
          <ReactPaginate
            className="flex justify-center "
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={Math.ceil(totalData / 2)}
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            renderOnZeroPageCount={null}
            pageClassName="bg-[#060b49] hover:bg-[#2b274c] text-white dark:bg-[#636161] dark:text-black mx-1  rounded "
            activeClassName="active   "
          />
        </div>
        {/* pagiantion end */}
      </div>
    </>
  )
}
export default SortBtn;