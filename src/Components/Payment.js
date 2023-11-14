"use client"

import React, { useState,useEffect } from 'react';
import StripePay from './StripePay';
import * as EmailValidator from 'email-validator'

const options = ['1 month - 20$', '1 year - 120$']

const Payment = () => {
  const [selected, setSelected] = useState(options[0]);
  const [email, setEmail] = useState(null);
  useEffect(()=>{
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    const email = userData && userData.hasOwnProperty('email') ? userData.email : null
    setEmail(email)
    // if(!EmailValidator.validate(email))
    //   alert("Wrong email, please relogin")
  

  },[])
 

  
  
  return (
    <div className='chatview' style={{ width:"100%",height: 'calc(100vh - 56px)'}}>
    <br/>
    <br/>
    <div align='center'>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className='dropdown'>
        { options.map((item, key) => <option key={key} >{options[key]}</option>) }
      </select>
      <br/>
      <br/>
      {
        selected === "1 month - 20$" && !email ===null
        ?
        (
          <StripePay
            email={email}
            payID={process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_MONTH}
            payPeriod="Pay for month"
          />
        )
        : null
      }
      {
        selected === "1 year - 120$"
        ?
        (
          <StripePay
            email={email}
            payID={process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_YEAR}
            payPeriod="Pay for year"
          />
        )
        : null
      }
    </div>
    </div>
  );
};

export default Payment;
