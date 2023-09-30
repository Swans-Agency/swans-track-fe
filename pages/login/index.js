import React from "react";
import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { login } from "@/functions/GeneralFunctions";
import Image from "next/image";

export default function index() {
  const router = useRouter();

  const onFinish = async (values) => {
    console.log(values);
    values["username"] = values["username"]?.toLowerCase();
    console.log({ values });
    let loggedIn = await login(values);
    if (loggedIn) {
      router.push("/authorized/dashboard");
    }
  };

  return (
    <section className="w-full h-full desktop:grid desktop:grid-cols-12">
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
            <Image
              src={"/LogoBlue.svg"}
              width={100}
              height={100}
              className=""
            />
          </div>
          <h1 className="text-[#0191E7] text-[3.75rem] text-center font-black pb-16">
            Sign In
          </h1>
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
                  className="bg-[#E6F4FD] border-none loginInput py-3 tablet:w-[663px] desktop:w-full"
                  placeholder="  E-mail"
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
              <Form.Item
                name="password"
                required
                tooltip={{
                  title: "Your password.",
                }}
              >
                <Input
                  type="password"
                  className="bg-[#E6F4FD] border-none loginInput py-3 tablet:w-[663px] desktop:w-full"
                  placeholder="  Password"
                  size="large"
                  prefix={
                    <svg
                      width="20"
                      height="25"
                      viewBox="0 0 27 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.1558 16.632V10.494C21.1558 8.77801 19.7698 7.42501 18.0868 7.42501H18.0208V5.34601C18.0208 2.87101 16.0078 0.825012 13.4998 0.825012C10.9918 0.825012 8.97875 2.83801 8.97875 5.34601V7.42501H8.91275C7.19675 7.42501 5.84375 8.81101 5.84375 10.494V16.632C5.84375 18.348 7.22975 19.701 8.91275 19.701H18.0208C19.7698 19.734 21.1558 18.348 21.1558 16.632ZM10.4638 5.34601C10.4638 3.66301 11.8168 2.31001 13.4998 2.31001C15.1828 2.31001 16.5358 3.66301 16.5358 5.34601V7.42501H10.4638V5.34601ZM19.6707 16.632C19.6707 17.523 18.9448 18.249 18.0538 18.249H8.94575C8.05475 18.249 7.32875 17.523 7.32875 16.632V10.494C7.32875 9.60301 8.05475 8.87701 8.94575 8.87701H18.0538C18.9448 8.87701 19.6707 9.60301 19.6707 10.494V16.632Z"
                        fill="#0191E7"
                      />
                      <path
                        d="M15.3478 11.583L12.9388 13.992L11.6188 12.672C11.3218 12.375 10.8598 12.375 10.5958 12.672C10.2988 12.969 10.2988 13.431 10.5958 13.695L12.4438 15.543C12.5758 15.675 12.7738 15.741 12.9718 15.741C13.1698 15.741 13.3348 15.675 13.4998 15.543L16.4368 12.606C16.7338 12.309 16.7338 11.847 16.4368 11.583C16.1068 11.319 15.6448 11.319 15.3478 11.583Z"
                        fill="#0191E7"
                      />
                      <path
                        d="M6.90029 23.496C6.70229 23.133 6.24029 23.034 5.91029 23.232L4.39229 24.09V22.341C4.39229 21.945 4.06229 21.615 3.66629 21.615C3.27029 21.615 2.94029 21.945 2.94029 22.341V24.09L1.42229 23.199C1.05929 23.001 0.630289 23.133 0.432289 23.463C0.234289 23.826 0.366289 24.255 0.696289 24.453L2.21429 25.311L0.696289 26.169C0.333289 26.367 0.234289 26.829 0.432289 27.159C0.564289 27.39 0.828289 27.522 1.05929 27.522C1.19129 27.522 1.32329 27.489 1.42229 27.423L2.94029 26.532V28.38C2.94029 28.776 3.27029 29.106 3.66629 29.106C4.06229 29.106 4.39229 28.776 4.39229 28.38V26.631L5.91029 27.522C6.00929 27.588 6.14129 27.621 6.27329 27.621C6.53729 27.621 6.76829 27.489 6.90029 27.258C7.09829 26.895 6.96629 26.466 6.63629 26.268L5.11829 25.377L6.63629 24.486C6.99929 24.288 7.09829 23.826 6.90029 23.496Z"
                        fill="#0191E7"
                      />
                      <path
                        d="M16.7673 23.496C16.5693 23.133 16.1073 23.034 15.7773 23.232L14.2263 24.09V22.341C14.2263 21.945 13.8963 21.615 13.5003 21.615C13.1043 21.615 12.7743 21.945 12.7743 22.341V24.09L11.2563 23.199C10.8933 23.001 10.4643 23.133 10.2663 23.463C10.0683 23.826 10.2003 24.255 10.5303 24.453L12.0483 25.311L10.5303 26.235C10.1673 26.433 10.0683 26.895 10.2663 27.225C10.3983 27.456 10.6623 27.588 10.8933 27.588C11.0253 27.588 11.1573 27.555 11.2563 27.489L12.7743 26.598V28.38C12.7743 28.776 13.1043 29.106 13.5003 29.106C13.8963 29.106 14.2263 28.776 14.2263 28.38V26.631L15.7443 27.522C15.8433 27.588 15.9753 27.621 16.1073 27.621C16.3713 27.621 16.6023 27.489 16.7343 27.258C16.9323 26.895 16.8003 26.466 16.4703 26.268L14.9523 25.377L16.4703 24.486C16.8333 24.288 16.9653 23.826 16.7673 23.496Z"
                        fill="#0191E7"
                      />
                      <path
                        d="M26.3373 26.235L24.8193 25.344L26.3373 24.453C26.7003 24.255 26.7993 23.793 26.6013 23.463C26.4033 23.1 25.9413 23.001 25.6113 23.199L24.0603 24.09V22.341C24.0603 21.945 23.7303 21.615 23.3343 21.615C22.9383 21.615 22.6083 21.945 22.6083 22.341V24.09L21.0903 23.232C20.7273 23.034 20.2983 23.166 20.1003 23.496C19.9023 23.859 20.0343 24.288 20.3643 24.486L21.8823 25.344L20.3643 26.202C20.0013 26.4 19.9023 26.862 20.1003 27.192C20.2323 27.423 20.4963 27.555 20.7273 27.555C20.8593 27.555 20.9913 27.522 21.0903 27.456L22.6083 26.565V28.38C22.6083 28.776 22.9383 29.106 23.3343 29.106C23.7303 29.106 24.0603 28.776 24.0603 28.38V26.631L25.5783 27.522C25.6773 27.588 25.8093 27.621 25.9413 27.621C26.2053 27.621 26.4363 27.489 26.5683 27.258C26.7993 26.895 26.6673 26.433 26.3373 26.235Z"
                        fill="#0191E7"
                      />
                      <path
                        d="M5.97666 30.723H1.32366C0.927657 30.723 0.597656 31.053 0.597656 31.449C0.597656 31.845 0.927657 32.175 1.32366 32.175H5.97666C6.37266 32.175 6.70266 31.845 6.70266 31.449C6.70266 31.053 6.37266 30.723 5.97666 30.723Z"
                        fill="#0191E7"
                      />
                      <path
                        d="M15.8436 30.723H11.1576C10.7616 30.723 10.4316 31.053 10.4316 31.449C10.4316 31.845 10.7616 32.175 11.1576 32.175H15.8106C16.2066 32.175 16.5366 31.845 16.5366 31.449C16.5366 31.053 16.2396 30.723 15.8436 30.723Z"
                        fill="#0191E7"
                      />
                      <path
                        d="M25.6778 30.723H21.0248C20.6288 30.723 20.2988 31.053 20.2988 31.449C20.2988 31.845 20.6288 32.175 21.0248 32.175H25.6778C26.0738 32.175 26.4038 31.845 26.4038 31.449C26.4038 31.053 26.0738 30.723 25.6778 30.723Z"
                        fill="#0191E7"
                      />
                    </svg>
                  }
                />
              </Form.Item>
              <div className=" flex justify-end">
                <a
                  className="mt-2 text-[#0191E7] font-semibold text-sm hover:cursor-pointer"
                  href="/forget-password"
                >
                  Forget password?
                </a>
              </div>
              <Form.Item>
                <div className="flex justify-center">
                  <button
                    htmlType="submit"
                    className="bg-gradient-to-br from-[#024380] to-[#0293EA] hover:shadow hover:shadow-gray-400 text-white font-bold py-[3%] px-[10%] rounded-full my-3"
                  >
                    SIGN IN
                  </button>
                </div>
                <div className="flex gap-1 justify-center">
                  <h1>Don’t have an account?</h1>
                  <Link href="/signup" className="text-[#0191E7]">
                    Sign up
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="flex flex-wrap justify-center pt-10 gap-1 w-[100%]">
          <h1>By signing in, you agree to our</h1>
          <Link href="/terms-conditions" className="text-[#0191E7]">
            Terms
          </Link>
          <h1>and have read and knowledge our</h1>
          <Link href="/swans-privacy-policy" className="text-[#0191E7]">
            Global Privacy Statement
          </Link>
          <h1>and</h1>
          <Link href="/swans-cookies" className="text-[#0191E7]">
            Cookies polices.
          </Link>
        </div>
      </div>
    </section>
  );
}
