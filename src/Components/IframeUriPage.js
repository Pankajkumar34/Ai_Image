"use client"
import React from 'react';
import { isMobile } from 'react-device-detect';

function IframeUriPage({uri}){
  return (
    <div className='chatview' style={{ width: "100%" }}>
    <div align="center" >
     {
       isMobile
       ?
       (
         <div align="center" style={{color:"white", backgroundColor: "#101010"}}>
         Sorry this works only on laptop devices, new version with support mobile will be soon
         </div>
       )
       :
       (
         <iframe title="agentagi" src={uri} width="1600" height="800" scrolling="yes"/>
       )
     }
    </div>
    </div>
)
}

export default IframeUriPage
