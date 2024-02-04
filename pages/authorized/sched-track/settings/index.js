import React from 'react';
const SchedSettingsForm = dynamic(() => import("@/components/Sched/SchedSettingsForm"), {
    loading: () => <Loading />,
});
import { FloatButton, notification } from 'antd';
import cookie from "react-cookies";
import { QuestionOutlined } from "@ant-design/icons";
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading/Loading';
import NextCrypto from 'next-crypto';
import Share from '@/components/Icons/Share';

export default function index() {

    const redirectToSchedTrack = async () => {
        let companyId = cookie.load("company", { path: "/" })
        const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
        const encryptedBuffer = await crypto.encrypt(companyId);
        const encodedValue = encodeURIComponent(encryptedBuffer);

        window.open(`/swans-track/${encodedValue}`, '_blank');
    }


    return (
        <>
            <SchedSettingsForm />
            <FloatButton
                type="primary"
                icon={
                    <div className='flex justify-center items-center'>
                        <Share />
                    </div>
                }

                onClick={() => {
                    return (
                        notification.info({
                            message: "Booking Calendar",
                            description: <div>Share your calendar with others by using this link: <a
                                onClick={() => redirectToSchedTrack()}
                                className="text-blue-500 hover:text-blue-400 "
                            >Click here</a></div>,
                            key: "api",
                        }))
                }}
            />
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"];
    let userPermission = ctx.req.cookies["userPermission"];
    try {
        if (accessToken) {
        } else {
            return {
                redirect: {
                    destination: "/401",
                    permanent: false,
                },
            };
        }
    } catch (e) {
        ;
    }
    return { props: { accessToken, userPermission } };
};