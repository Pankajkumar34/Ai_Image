"use client"
import React from "react";
import UlList from "../ulList";
import { useRouter } from 'next/navigation'
// import { checkOut } from "../lib/checkOut";
import PlanData from "../subscriptions.json";
import { getLocalStroage } from "../lib/windowError";

const Subscripation = () => {

  /************PayId************** */
  let payID = process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_MONTH;
  let payID2 = process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_YEAR;
  /********************************** */

  
 

  let router = useRouter();



  const checkSubscripation = (value) => {
   
    if (value === "Free Trial") {
      router.push(`/?plan=${"freetrial"}`);
    } else if (value === "Monthly" && !getLocalStroage()) {
      router.push("/login");
    } else if (value === "Yearly" && !getLocalStroage()) {
      router.push("/login");
    } else {
      if (value === "Monthly") {
        checkOut({ payID: payID ,email: getLocalStroage() ,plan:"Monthly"});
      } else if (value === "Yearly") {
        checkOut({ payID: payID2, email: getLocalStroage(),plan:"Yearly" });
      }
    }
  };

  return (
    <div className="main_subscribe_page ">
      <div className="container max-w-[1280px] m-auto">
        <div className="sub_subscribe_page">
          <div className="sm:w-[100%]  sub_subscribe_page-about w-[55%] px-2 mx-auto mb-8 text-center">
            <h2 className="border-top mb-4 text-[31px] font-extrabold tracking-tight text-gray-900  dark:text-white">
              Unleash Your Creative Potential with AI42's Cutting-Edge Dating Coach
            </h2>
            <p className="mb-5 text-sm font-light text-gray-500  dark:text-gray-400">
              Ignite your projects with AI42's AI-Powered Image Generator.
              Whether you're an individual, designer, website creator, or stock
              image buyer, our state-of-the-art technology empowers you to
              create extraordinary visuals. Unleash your imagination and bring
              your ideas to the forefront. Experience the revolutionary power of
              AI with AI42.
            </p>
          </div>

          {/* /subscribe plan  */}

          <div className="sm:block sm:px-2 subscribe_group  gap-[2rem] grid grid-cols-3 ">
            {PlanData?.packages.map((items, index) => {
              return (
                <div className="sm:my-2 subscribe-box" key={index}>
                  <h3 className="mb-4 text-2xl font-semibold">{items.title}</h3>
                  <p className="font-light text-[18px] text-gray-500 dark:text-gray-400">
                    {items.description}
                  </p>
                  <div className="flex items-baseline justify-center my-8">
                    <span className="mr-2 text-5xl font-extrabold">
                      ${items.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400"></span>
                  </div>
                  <UlList data={items.items} />
                  <button
                    onClick={() => checkSubscripation(items.title)}
                    className="start_now_btn focus:ring-4 focus:ring-primary-200   dark:focus:ring-primary-900"
                  >
                    {items.plan}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Subscripation;
