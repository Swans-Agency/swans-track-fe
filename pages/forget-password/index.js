import { postAxios } from "@/functions/ApiCalls";
import { NotificationSuccess } from "@/functions/Notifications";
import { ConfigProvider, Form, Input, Spin, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UsernameIcon from "../login/UsernameIcon";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

export default function index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
      }}
      spin
    />
  );

  const onFinish = async (values) => {
    setIsLoading(true);
    values["username"] = values["username"].toLowerCase();
    const url = `${process.env.DIGITALOCEAN}/account/forget-password/`;
    const response = await postAxios(url, values, true, false, () => {});
    if (response == "password updated") {
      setIsLoading(false);
      NotificationSuccess({
        description:
          "Your password have been reseted successfully. Kindly check your email for new password.",
      });
      router.push("/login");
    }
    setIsLoading(false);
  };
  return (
    <section className="w-full h-screen desktop:grid desktop:grid-cols-12 text-white">
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
                  prefix={<UsernameIcon />}
                />
              </Form.Item>
              <Form.Item>
                <div className="grid items-center justify-center">
                  <button
                    htmlType="submit"
                    className="bg-gradient-to-br from-[#024380] to-[#0293EA] hover:shadow hover:shadow-gray-400 text-white font-bold py-[1rem] px-[2rem] rounded-full my-3"
                  >
                    
                      {!isLoading ? "Reset Password" :
                        <div className="flex justify-center items-center gap-2">
                          <Spin indicator={antIcon} style={{ color: "white" }} />
                        </div>
                      }
                  </button>
                  <div className="text-white">Do not have an account? <Link className="w-full text-[#0191E7]" href="/signup">Signup</Link></div>
                </div>
              </Form.Item>
            </Form>
            </ConfigProvider>

          </div>
        </div>
      </div>
    </section>
  );
}
