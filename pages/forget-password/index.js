import { postAxios } from '@/functions/ApiCalls';
import { NotificationSuccess } from '@/functions/Notifications';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


export default function index() {
    const router = useRouter();

    const onFinish = async (values) => {
        values["username"] = values["username"].toLowerCase();
        console.log({ values });
        const url = `${process.env.DIGITALOCEAN}/account/forget-password/`;
        const response = await postAxios(url, values, true, false, () => { });
        console.log({ response });
        if (response == "password updated") {
            NotificationSuccess({
                description: "Your password have been reseted successfully. Kindly check your email for new password."
            })
        }
    };
    return (
        <div className="bg-cover bg-center min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-black via-gray-700 to-gray-500 flex flex-col items-center">
            <div className="bg-[#e2e4eb] w-fit mt-10 rounded-lg">
                <h1 className="text-[2.875rem] font-extrabold tracking-tighter py-6 px-10 text-center">
                    Forget Password!
                </h1>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    style={{
                        alignContent: "center",
                        maxWidth: 700,
                        paddingRight: 25,
                        paddingLeft: 25,
                    }}
                >
                    <Form.Item
                        label="E-mail"
                        name="username"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                        required
                        tooltip="E-mail address used in the signing up process."
                    >
                        <Input className="rounded-lg" placeholder="support@swanstrack.com" />
                    </Form.Item>
                    <Form.Item>
                        <button
                            htmlType="submit"
                            size="large"
                            className="rounded w-[100%] bg-[#163757] hover:shadow-xl py-2 text-white flex gap-x-2 text-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                />
                            </svg>
                            Reset Password
                        </button>
                    </Form.Item>
                </Form>
                <div className="bg-[#163757]  py-5 mt-[5rem] text-center rounded-b">
                    <Link href="/signup" className="text-white">
                        Don't have an account?
                    </Link>
                </div>
            </div>
        </div>

    );
};