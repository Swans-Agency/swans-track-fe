import { getAxios, getAxiosServer } from "@/functions/ApiCalls";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { Badge, Card, Space } from "antd";

export default function index({ plans, paymentId }) {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [trialPeriod, setTrialPeriod] = useState(null);
  useEffect(() => {
    if (paymentId?.subscriptionEnded) {
      setAction("");
    } else {
      setAction("disabled");
    }

    if (paymentId?.trialMode) {
      setTrialPeriod(true);
    } else {
      setTrialPeriod(false);
    }
  }, [paymentId]);

  useEffect(() => {
    console.log(action);
  }, [action]);

  const handleUpgrade = async (plan) => {
    let subscription = await getAxios(
      `${process.env.DIGITALOCEAN}/company/subscription/${plan}`,
      true,
      true,
      () => {}
    );
    if (subscription?.url) {
      router.push(subscription?.url);
    }
  };

  const handleCreateCustomerPortal = async () => {
    let res = await getAxios(
      `${process.env.DIGITALOCEAN}/company/portal-session/`,
      true,
      true,
      () => {}
    );
    window.open(res?.url, "_blank");
  };

  return (
    <div className="overflow-hidden">
      <div className="text-3xl font-light tracking-tight text-black my-[3rem] text-center">
        <h1>Unleash your productivity</h1>
        <h1>Join the Swans</h1>
      </div>
      <div className="max-w-[20rem] m-auto">
        <Carousel autoplay dots="true">
          {plans?.map((item, index) => {
            return (
              <div className="border rounded-lg  w-1/4 p-2">
                <Badge.Ribbon text="Flash discount" className="Button">
                  <div className="px-6 py-10">
                    <h1 className="text-2xl font-semibold text-center">
                      {item.name}
                    </h1>
                    <p className="text-[3rem] text-green-600 font-bold mb-3 text-center">
                      ${item?.price}
                    </p>
                    <ul className="mb-[3rem] mt-[3rem]">
                      {item?.features?.map((feature, index) => {
                        return (
                          <li className="flex gap-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.5 12.75L10.5 18.75L19.5 5.25"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            {feature}
                          </li>
                        );
                      })}
                    </ul>
               

                    {action ? (
                        
                      <button
                        className={`w-full border rounded-lg mt-3 py-1 shadow font-bold hover:shadow-green-200 ${action}`}
                        onClick={() => handleUpgrade(item?.stripeId)}
                      >
                        Subscribe
                      </button>
                    ):(
                      <Button onClick={handleCreateCustomerPortal} type="primary" size="larg" className="w-full mt-[20%] mb-2 Button">
                      Update Payment Method
                    </Button>
                    )}

                     
                    <div className="text-xs font-light text-gray-700 mt-2 text-justify">
                      By placing this order, you agree to Swans Track's{" "}
                      <a
                        href="/terms-conditions"
                        target="_blank"
                        className="text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-2"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/swans-privacy-policy"
                        target="_blank"
                        className="text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-2"
                      >
                        Privacy Policy
                      </a>
                      . Your card will be charges $ {item?.price} each month.
                      Subscription automatically renews uless subscription is
                      canceled. A redirect link will be available to manage your
                      subscription once the transaction is completed.
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            );
          })}
        </Carousel>
      </div>
 
      {/* <div className="bg-foreignBackground w-full absolute flex flex-col py-2 pl-[200px] text-white justify-center items-center gap-x-10 bottom-0 left-0">
        <p className="text-center text-white">
          {trialPeriod
            ? `You are currently in trial mode, your trial ends in ${Math.round(
                (paymentId?.subscriptionEndsIn || 0) / 86400
              )} days!`
            : `Your subscription ends in ${Math.round(
                (paymentId?.subscriptionEndsIn || 0) / 86400
              )} days!`}
        </p>
        {!trialPeriod && (
          <div>
            You can view and manage your subscription by clicking{" "}
            <span
              className="underline hover:cursor-pointer"
              onClick={handleCreateCustomerPortal}
            >
              here
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let userId = ctx.req.cookies["userId"];
  let plans = null;
  let paymentId = false;
  try {
    if (accessToken) {
      plans = await getAxiosServer(
        `${process.env.DIGITALOCEAN}/company/subscription-plans/`,
        accessToken
      );
      paymentId = await getAxiosServer(
        `${process.env.DIGITALOCEAN}/company/has-paymentid/`,
        accessToken
      );
     } else {
      return {
        redirect: {
          destination: "/401",
          permanent: false,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }
  return { props: { accessToken, userPermission, userId, plans, paymentId } };
};
