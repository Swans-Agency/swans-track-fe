import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ConfigProvider, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/functions/GeneralFunctions";
import Image from "next/image";
import UsernameIcon from "../login/UsernameIcon";
import CompanyIcon from "./CompanyIcon";

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
    <section className="w-full h-screen desktop:grid desktop:grid-cols-12  text-white">
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
            <ConfigProvider
              theme={{
                algorithm: [theme.defaultAlgorithm,]
              }}
            >
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
                      <UsernameIcon />
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
                    prefix={<CompanyIcon />}
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
                  <div className="flex gap-1 justify-center text-white">
                    <h1>Already a user?</h1>
                    <Link href="/login" className="text-[#0191E7]">
                      Sign in
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </ConfigProvider>
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
