import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/functions/GeneralFunctions";

export default function index() {
  const router = useRouter();
  const onFinish = async (values) => {
    values["email"] = values["email"]?.toLowerCase();
    let signedUp = await signup(values);
    if (signedUp) {
      router.push("/login");
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-black via-gray-700 to-gray-500 flex flex-col items-center">
      <div className="bg-[#e2e4eb] w-fit mt-10 rounded-lg">
        <h1 className="text-[2.875rem] font-extrabold tracking-tighter py-6 px-10 text-center">
          Join the Swans
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
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
            label="E-mail"
            name="email"
            required
            tooltip="You will use this for signing in."
          >
            <Input className="rounded" placeholder="agency.swans@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            required
            tooltip={{
              title:
                "Your company name, i.e. swansagency. Note that it should be all in small letters, any spaces will be replaced with an underscore.",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input className="rounded" placeholder="swans" />
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
              Create Account
            </button>
          </Form.Item>
        </Form>
        <div className="flex justify-center items-center">
          <p className=" px-10 py-1 italic max-w-[400px] text-gray-600  text-center ">
            By selecting Create Account, you agree to our{" "}
            <span
              onClick={() => router.push("/terms-conditions")}
              className="hover:cursor-pointer text-blue-500"
              href="/terms-conditions"
            >
              Terms
            </span>{" "}
            and have read and acknowledge our{" "}
            <span
              onClick={() => router.push("/swans-privacy-policy")}
              className="hover:cursor-pointer text-blue-500"
            >
              Global Privacy Statement{" "}
            </span>
            and {" "}
            <span
              onClick={() => router.push("/swans-cookies")}
              className="hover:cursor-pointer text-blue-500"
            >
              Cookies policies.
            </span>
          </p>
        </div>

        <div className="bg-[#163757] py-5 mt-[5rem] text-center rounded-b">
          <Link href="/login" className="text-white">
            Already a user?
          </Link>
        </div>
      </div>
    </div>
  );
}
