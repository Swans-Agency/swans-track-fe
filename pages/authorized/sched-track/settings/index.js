import React from 'react';
import SchedSettingsForm from '@/components/Sched/SchedSettingsForm';
import { FloatButton, notification } from 'antd';
import cookie from "react-cookies";
import { QuestionOutlined } from "@ant-design/icons";

export default function index() {

    

    return (
        <>
            <SchedSettingsForm />
            <FloatButton
                type="primary"
                icon={<QuestionOutlined />}
                style={{ bottom: 20 }}
                onClick={() => {
                    return (
                        notification.info({
                            message: "Public Profile",
                            description: <div>Share your calendar with others by using this link: <a
                                href={`https://www.swanstrack.com/swans-track/${cookie.load("company", { path: "/" })}/`}
                                className="text-blue-500 hover:text-blue-400 "
                            >{`https://www.swanstrack.com/swans-track/${cookie.load("company", { path: "/" })}/`}</a></div>,
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
        console.log(e);
    }
    return { props: { accessToken, userPermission } };
};