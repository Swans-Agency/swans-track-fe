import React from "react";
import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { login } from "@/functions/GeneralFunctions";
import Image from "next/image";

export default function index() {
  const router = useRouter();

  const onFinish = async (values) => {
    values["username"] = values["username"]?.toLowerCase();
    console.log({ values });
    let loggedIn = await login(values);
    if (loggedIn) {
      router.push("/authorized/dashboard");
    }
  };

  return (
    <>
      <section className="w-full h-screen grid grid-cols-12">
        <div
          className="col-span-4 w-full h-screen"
          style={{
            backgroundImage: "url(/BgForms.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* <Image src="/BgForms.svg" width={1000} height={1000} className="h-screen w-[100%]"/> */}
        </div>

        <div className="col-span-8 w-[90%] m-auto">
          <h1 className="text-[#0191E7] text-[3.75rem] text-center">Sign In</h1>
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
              <Input className="rounded" placeholder="support@swanstrack.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              required
              name="password"
              tooltip={{
                title: "Your password.",
              }}
            >
              <Input
                type="password"
                className="rounded"
                placeholder="password"
              />
            </Form.Item>
            <Form.Item>
              <div className="relative">
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
                  Login
                </button>
                <a
                  className="absolute left-1/2 -translate-x-1/2 mt-2 text-blue-600 text-center font-light text-sm hover:cursor-pointer hover:text-blue-500"
                  href="/forget-password"
                >
                  Forget password!
                </a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>

      {/* <div className="bg-cover bg-center min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-black via-gray-700 to-gray-500 flex flex-col items-center">
      <div className="bg-[#e2e4eb] w-fit mt-10 rounded-lg">
        <h1 className="text-[2.875rem] font-extrabold tracking-tighter py-6 px-10 text-center">
          Welcome Back!
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
            <Input className="rounded" placeholder="support@swanstrack.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            required
            name="password"
            tooltip={{
              title: "Your password.",
            }}
          >
            <Input type="password" className="rounded" placeholder="password" />
          </Form.Item>
          <Form.Item>
            <div className="relative">

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
              Login
            </button>
            <a
              className="absolute left-1/2 -translate-x-1/2 mt-2 text-blue-600 text-center font-light text-sm hover:cursor-pointer hover:text-blue-500"
              href="/forget-password"
            >
              Forget password!
            </a>
            </div>
          </Form.Item>
        </Form>
        <div className="bg-[#163757]  py-5 mt-[5rem] text-center rounded-b">
          <Link href="/signup" className="text-white">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div> */}
    </>
  );
}
