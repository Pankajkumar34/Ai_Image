"use client"
import React from 'react';
import getStripe from './lib/getStripe';
import { SITE_URI } from './config';

// props.payID
// props.payPeriod
// props.email

function StripePay(props) {
  async function handleCheckout() {
    const email = props.email
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: props.payID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `${SITE_URI}#/success`,
      cancelUrl: `${SITE_URI}#/cancel`,
      customerEmail: email
    })

    console.warn(error.message);
  }

  return(
    <button
      type='submit'
      className='signin__btn'
      onClick={() => handleCheckout()}
      >
      {props.payPeriod}
    </button>
  )
}

export default StripePay
