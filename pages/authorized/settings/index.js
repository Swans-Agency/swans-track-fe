import { getAxios, getAxiosServer } from '@/functions/ApiCalls';
import { saveToLocal } from '@/functions/GeneralFunctions';
import { useRouter } from 'next/router';
import React from 'react';


export default function index({ plans, paymentId }) {
    const router = useRouter()

    const handleUpgrade = async (plan) => {
        if (paymentId) {
            let subscription = await getAxios(`${process.env.DIGITALOCEAN}/company/subscription/${plan}`, true, true, () => {})

        } else {
            router.push("/authorized/settings/checkout")
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-light tracking-tight text-black mb-[2rem]">Subscription Plans</h1>
            {plans?.map((item, index) => {
                return (
                    <div className='border rounded-lg shadow w-fit px-6 py-5'>
                        <h1 className='text-2xl font-bold'>{item.name}</h1>
                        <p className='text-[2rem] text-green-600 font-bold mb-3'>${item?.price}</p>
                        <ul className='mb-[4rem]'>
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
                            {paymentId ? "Upgrade Plan" : "Add Payment Method"}
                        </button>
                    </div>
                )
            })}
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
            console.log({paymentId});
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
