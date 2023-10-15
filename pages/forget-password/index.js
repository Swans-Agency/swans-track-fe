import { postAxios } from "@/functions/ApiCalls";
import { NotificationSuccess } from "@/functions/Notifications";
import { Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const router = useRouter();
  const onFinish = async (values) => {
    values["username"] = values["username"].toLowerCase();
    const url = `${process.env.DIGITALOCEAN}/account/forget-password/`;
    const response = await postAxios(url, values, true, false, () => {});
    if (response == "password updated") {
      NotificationSuccess({
        description:
          "Your password have been reseted successfully. Kindly check your email for new password.",
      });
      router.push("/login");
    }
  };
  return (
    <section className="w-full h-screen desktop:grid desktop:grid-cols-12">
      <div
        className="col-span-4 w-full h-screen desktop:block phone:hidden laptop:hidden tablet:hidden"
        style={{
          backgroundImage: "url(/BgForms.svg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="desktop:col-span-4 desktop:col-start-7 phone:pt-20 tablet:pt-20 tablet:flex tablet:justify-center tablet:flex-col w-[100%] m-auto">
        <div className="  tablet:w-[90%] tablet:m-auto">
          <div className="phone:flex justify-center desktop:hidden">
            <Image src={"/LogoBlue.svg"} width={100} height={100} />
          </div>
          <h1 className="text-[#0191E7] text-center text-[3.0rem] font-black phone:mt-4 latop:mt-0">Reset password</h1>
          <div className="desktop:w-full tablet:flex tablet:justify-center desktop:block tablet:w-[100%]">
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
              className="text-black"
            >
              <Form.Item
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
                <Input
                  className="bg-[#E6F4FD] !text-black border-none loginInput py-3 tablet:w-[663px] desktop:w-full phone:mt-10"
                  placeholder=" E-mail"
                  size="large"
                  prefix={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.375 7.4375C16.9975 7.4375 19.9375 10.3775 19.9375 14C19.9375 17.6225 16.9975 20.5625 13.375 20.5625C9.7525 20.5625 6.8125 17.6225 6.8125 14C6.8125 10.3775 9.7525 7.4375 13.375 7.4375ZM13.375 9.3125C10.7875 9.3125 8.6875 11.4125 8.6875 14C8.6875 16.5875 10.7875 18.6875 13.375 18.6875C15.9625 18.6875 18.0625 16.5875 18.0625 14C18.0625 11.4125 15.9625 9.3125 13.375 9.3125Z"
                        fill="#0191E7"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.085 23.8312C20.5238 23.5588 21.1025 23.6938 21.375 24.1338C21.6488 24.5737 21.5125 25.1525 21.0737 25.425C19.0188 26.7 16.595 27.4375 14 27.4375C6.58375 27.4375 0.5625 21.4163 0.5625 14C0.5625 6.58375 6.58375 0.5625 14 0.5625C21.4163 0.5625 27.4375 6.58375 27.4375 14V16.96C27.4375 18.1688 26.9575 19.3275 26.1025 20.1825C25.2487 21.0362 24.09 21.5163 22.8812 21.5163C21.6737 21.5163 20.515 21.0362 19.66 20.1825C18.8062 19.3275 18.3263 18.1688 18.3263 16.96V8.73625C18.3263 8.22 18.7463 7.79875 19.2638 7.79875C19.78 7.79875 20.2013 8.22 20.2013 8.73625V16.96C20.2013 17.6712 20.4825 18.3538 20.9863 18.8563C21.4888 19.3587 22.17 19.6413 22.8812 19.6413C23.5925 19.6413 24.275 19.3587 24.7775 18.8563C25.28 18.3538 25.5625 17.6712 25.5625 16.96V14C25.5625 7.61875 20.3813 2.4375 14 2.4375C7.61875 2.4375 2.4375 7.61875 2.4375 14C2.4375 20.3813 7.61875 25.5625 14 25.5625C16.2312 25.5625 18.3162 24.9287 20.085 23.8312Z"
                        fill="#0191E7"
                      />
                    </svg>
                  }
                />
              </Form.Item>
              <Form.Item>
                <div className="flex justify-center">
                  <button
                    htmlType="submit"
                    className="bg-gradient-to-br from-[#024380] to-[#0293EA] hover:shadow hover:shadow-gray-400 text-white font-bold py-[3%] px-[10%] rounded-full my-3"
                  >
                    Reset Password
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
