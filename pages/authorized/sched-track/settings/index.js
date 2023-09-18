import FloatButtonJS from '@/components/ANTD/FloatButton';
import SchedSettingsForm from '@/components/Sched/SchedSettingsForm';
import { FloatButton, notification } from 'antd';
import React from 'react';
import cookie from "react-cookies";
import { PlusOutlined, QuestionOutlined } from "@ant-design/icons";

export default function index() {

    return (
        <div>
            {/* <h1 className="text-3xl font-light tracking-tight text-black mb-3">Sched Settings</h1> */}
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
        </div>

    );
};