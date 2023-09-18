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
  const [action, setAction] = useState(false);
  const [trialPeriod, setTrialPeriod] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  useEffect(() => {
    console.log({paymentId});
    if (paymentId?.subscriptionEnded) {
      setAction("");
    } else {
      setAction(true);
    }

    if (paymentId?.trialMode) {
      setTrialPeriod(true);
    } else {
      setTrialPeriod(false);
    }

    if (paymentId?.subscriptionEndsIn){
      convertToRemainingDaysAndHours(paymentId?.subscriptionEndsIn * 1000)
    }
  }, [paymentId]);

  const convertToRemainingDaysAndHours = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const remainingSeconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    const remainingMinutes = minutes % 60;
    const hours = Math.floor(minutes / 60);
    const remainingHours = hours % 24;
    const days = Math.floor(hours / 24);

    setRemainingTime(`${days} days`);
  }

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
    if (res?.url){
      window.open(res?.url, "_blank");
    }
  };

  return (
    <div className="overflow-hidden">
      {/* <div className="text-3xl font-light tracking-tight text-black my-[3rem] text-center">
        <h1>We Manage You Celebrate</h1>
      </div> */}
      <div className="max-w-[20rem] m-auto">
        <Carousel autoplay dots="true">
          {plans?.map((item, index) => {
            return (
              <div className="w-1/4 p-2">
                <Badge.Ribbon text={<p className="py-[0.2rem] px-[0.4rem]">Flash Discount</p>} className="Button">
                  <div className="px-6 py-5 border rounded-lg">
                    <div className="text-2xl font-semibold text-center mt-4">
                      {item.name}
                    </div>
                    <div className="text-[3rem] text-green-600 font-bold mb-3 text-center">
                      ${item?.price.split(".")[0]}<span className="text-[1rem]">.{item?.price.split(".")[1]}</span>
                    </div>
                    <ul className="my-[2rem]">
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
                      <button
                      className={`w-full border rounded mt-3 py-1 shadow font-bold text-white bg-[#3659d4]  ${action ? "cursor-not-allowed" : "hover:bg-[#1d2e6e]"}`}
                        onClick={() => handleUpgrade(item?.stripeId)}
                        disabled={action}
                      >
                      {trialPeriod ? <div>Your trial ends in {remainingTime}</div> : !paymentId?.subscriptionEnded ? <div>Your subscription ends in {remainingTime}</div> : "Subscribe"}
                      </button>
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
                      subscription once the transaction is completed. {!trialPeriod &&  <span className="hover:underline underline-offset-2 hover:cursor-pointer text-blue-500" onClick={handleCreateCustomerPortal}>Manage your subscription</span>}
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            );
          })}
        </Carousel>
      </div>
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
