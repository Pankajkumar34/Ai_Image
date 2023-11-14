import React from "react";
const ulList=({data})=>{
    return(
       <>
       {data?.map((item,index)=>{
        return(
          <ul role="list" className="mb-5 text-left" key={index}>
          <li className="flex items-center space-x-3">
            <span>{item}</span>
          </li>
        </ul>
        )
       })}
       </>
    )
}
export default ulList;