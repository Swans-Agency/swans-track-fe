import { getAxios, getAxiosServer } from '@/functions/ApiCalls';
import { saveToLocal } from '@/functions/GeneralFunctions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


export default function index({ plans, paymentId }) {
    const router = useRouter()
    const [action, setAction] = useState(null)
    const [trialPeriod, setTrialPeriod] = useState(null)

    useEffect(() => {
        console.log({ paymentId })
        if ((paymentId?.hasPaymentMethod && paymentId?.subscriptionEnded) || (paymentId?.hasPaymentMethod && paymentId?.trialMode)) {
            setAction("Upgrade Plan")
        } else {
            setAction("Update Payment Method")
        }

        if (paymentId?.trialMode) {
            setTrialPeriod(true)
        } else {
            setTrialPeriod(false)
        }
    }, [paymentId])

    useEffect(() => { console.log(action) }, [action])

    const handleUpgrade = async (plan) => {
        if (action === "Upgrade Plan") {
            let subscription = await getAxios(`${process.env.DIGITALOCEAN}/company/subscription/${plan}`, true, true, () => { })
            router.reload()
        } else {
            router.push("/authorized/settings/checkout")
        }
    }

    const handleCreateCustomerPortal = async () => {
        let res = await getAxios(`${process.env.DIGITALOCEAN}/company/portal-session/`, true, true, () => { })
        console.log({ res })
        window.open(res?.url, '_blank');
    }

    return (
        <div className='overflow-hidden '>
            <h1 className="text-3xl font-light tracking-tight text-black mb-[2rem]">Subscription Plans</h1>
            {plans?.map((item, index) => {
                return (
                    <div className='border rounded-lg shadow w-1/4 px-6 py-5'>
                        <h1 className='text-2xl font-bold'>{item.name}</h1>
                        <p className='text-[2rem] text-green-600 font-bold mb-3'>${item?.price}</p>
                        <ul className='mb-[3rem]'>
                            {item?.features?.map((feature, index) => {
                                return (
                                    <li>{"▪️ " + feature}</li>
                                )
                            })}
                        </ul>
                        <button
                            className='w-full border rounded-lg mt-3 py-1 shadow font-bold hover:shadow-green-200'
                            onClick={() => handleUpgrade(item?.stripeId)}
                        >
                            {action}
                        </button>
                        <div className='text-xs font-light text-gray-700 mt-2 text-justify'>
                            By placing this order, you agree to Swans Track's <a href="/terms-conditions" target='_blank' className='text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-2'>Terms of Service</a> and <a href="/swans-privacy-policy" target='_blank' className='text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-2'>Privacy Policy</a>. Your card will be charges $ {item?.price} each month. Subscription automatically renews uless subscription is canceled. A redirect link will be available to manage your subscription once the transaction is completed.
                        </div>
                    </div>
                )
            })}
            <div className='bg-foreignBackground w-full absolute flex flex-col py-2 pl-[200px] text-white justify-center items-center gap-x-10 bottom-0 left-0'>
                <p className='text-center text-white'>
                    {trialPeriod ? `You are currently in trial mode, your trial ends in ${Math.round((paymentId?.subscriptionEndsIn || 0) / 86400)} days!` : `Your subscription ends in ${Math.round((paymentId?.subscriptionEndsIn || 0) / 86400)} days!`}
                </p>
                {!trialPeriod && <div>
                    You can view and manage your subscription by clicking {" "}
                    <span
                        className='underline hover:cursor-pointer'
                        onClick={handleCreateCustomerPortal}
                    >
                        here
                    </span>
                </div>}
            </div>
        </div>

    );
};

export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"];
    let userPermission = ctx.req.cookies["userPermission"];
    let userId = ctx.req.cookies["userId"];
    let plans = null
    let paymentId = false
    try {
        if (accessToken) {
            plans = await getAxiosServer(`${process.env.DIGITALOCEAN}/company/subscription-plans/`, accessToken)
            paymentId = await getAxiosServer(`${process.env.DIGITALOCEAN}/company/has-paymentid/`, accessToken)
            console.log({ paymentId });
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
