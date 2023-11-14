"use client"
import React from 'react'
// import { MdComputer } from 'react-icons/md'

const Thinking = () => {
  return (
    <div className='message'>
      <div className='message__wrapper flex'>
        <div className="message__pic">
        <i className="fa-solid fa-laptop"></i>
          {/* <MdComputer /> */}
        </div>
        <div className='text-left message__createdAt'>
          <div className="message__thinking">
            thinking...
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thinking