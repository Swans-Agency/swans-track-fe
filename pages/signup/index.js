import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/functions/GeneralFunctions";
import Image from "next/image";

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
    <section className="w-full h-screen desktop:grid desktop:grid-cols-12 dark:text-white">
      <div
        className="col-span-4 w-full h-full desktop:block phone:hidden laptop:hidden tablet:hidden"
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
          <h1 className="text-[#0191E7] text-[3rem] text-center font-black pb-16">
            Create Account
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
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
                name="email"
                required
                tooltip="You will use this for signing in."
                className="text-[#000000]"
              >
                <Input
                  className="bg-[#E6F4FD] border-none loginInput py-3 tablet:w-[663px] desktop:w-full text-[#000000]"
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
              <Form.Item
                name="company"
                required
                tooltip={{
                  title:
                    "Your company name, i.e. swansagency. Note that it should be all in small letters, any spaces will be replaced with an underscore.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  className="bg-[#E6F4FD] border-none loginInput py-3 tablet:w-[663px] desktop:w-full text-black"
                  placeholder=" Company"
                  size="large"
                  prefix={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_342_7261)">
                        <path
                          d="M0.824219 29.2783H28.8655"
                          stroke="#0191E7"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.59766 29.2783V1.03092L10.8245 0.103088V29.2783"
                          stroke="#0191E7"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.8242 0.103088L16.5974 3.91752V29.2783"
                          stroke="#0191E7"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.5977 8.76285L19.2781 8.0412V29.2783"
                          stroke="#0191E7"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19.2773 8.0412L23.6072 10.8247V29.2783"
                          stroke="#0191E7"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15.4672 5.11623L11.7676 2.96674V3.56899L15.4672 5.71848V5.11623Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 7.86959L11.7676 5.72009V6.32234L15.4672 8.47184V7.86959Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 10.623L11.7676 8.47351V9.07576L15.4672 11.2253V10.623Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 13.3763L11.7676 11.2268V11.8291L15.4672 13.9786V13.3763Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 16.1297L11.7676 13.9802V14.5825L15.4672 16.732V16.1297Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 18.8831L11.7676 16.7336V17.3358L15.4672 19.4853V18.8831Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 21.6364L11.7676 19.4869V20.0891L15.4672 22.2386V21.6364Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 24.3898L11.7676 22.2403V22.8425L15.4672 24.992V24.3898Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M15.4672 27.1432L11.7676 24.9937V25.596L15.4672 27.7455V27.1432Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M22.7827 11.9421L20.1016 10.0035V10.5466L22.7827 12.4853V11.9421Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M22.7827 14.4253L20.1016 12.4867V13.0299L22.7827 14.9685V14.4253Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M22.7827 16.9087L20.1016 14.97V15.5132L22.7827 17.4518V16.9087Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M22.7827 19.3918L20.1016 17.4532V17.9964L22.7827 19.935V19.3918Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M22.7827 21.8751L20.1016 19.9365V20.4796L22.7827 22.4183V21.8751Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M22.7827 24.3584L20.1016 22.4198V22.963L22.7827 24.9016V24.3584Z"
                          fill="#0191E7"
                        />
                        <path
                          d="M22.7827 26.8416L20.1016 24.903V25.4462L22.7827 27.3848V26.8416Z"
                          fill="#0191E7"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_342_7261">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
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
                    SIGN UP
                  </button>
                </div>
                <div className="flex gap-1 justify-center">
                  <h1>Already a user?</h1>
                  <Link href="/login" className="text-[#0191E7]">
                    Sign in
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="flex flex-wrap justify-center pt-10 gap-1 w-[100%] pb-2">
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
