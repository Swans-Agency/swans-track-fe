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
    <section className="w-full h-screen desktop:grid desktop:grid-cols-12">
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
          <h1 className="text-[#0191E7] text-[3.75rem] text-center font-black pb-16">
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
              <Form.Item name="referralCode" required>
                <Input
                  className="bg-[#E6F4FD] border-none loginInput py-3 tablet:w-[663px] desktop:w-full text-black"
                  placeholder=" Referral Code"
                  size="large"
                  prefix={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_360_73)">
                        <path
                          d="M17.322 24.7515L17.3221 24.7516C17.4336 24.8791 17.559 24.9192 17.6776 24.8818C17.7907 24.8462 17.8833 24.7442 17.9449 24.6203C18.068 24.3729 18.0873 23.9975 17.866 23.7443L10.2455 14.994L17.866 6.24362C18.0873 5.99042 18.068 5.61503 17.9449 5.36761C17.8833 5.24366 17.7907 5.14171 17.6776 5.1061C17.559 5.06874 17.4336 5.10884 17.3221 5.23636L17.322 5.23644L9.26904 14.484C9.26893 14.4841 9.26883 14.4843 9.26872 14.4844C9.15386 14.6115 9.09795 14.8013 9.09647 14.9872C9.09498 15.1734 9.148 15.3655 9.26316 15.4972L17.322 24.7515ZM5.70972 17.203V15.693C7.28405 15.8294 8.51302 17.1633 8.51302 18.7509V20.2342H1.53309V18.7509C1.53309 17.1626 2.76241 15.8293 4.33746 15.693V17.1908C4.3351 17.2406 4.34764 17.2911 4.37732 17.3359L4.37738 17.336L4.82093 18.0016C4.91161 18.1508 5.13015 18.1578 5.22831 18.0083L5.22832 18.0083L5.66522 17.3425C5.69296 17.3034 5.70972 17.255 5.70972 17.203ZM26.8656 20.503C26.8656 18.7668 25.4579 17.3592 23.7217 17.3592C21.9855 17.3592 20.5778 18.7668 20.5778 20.503C20.5778 22.2389 21.9855 23.6466 23.7217 23.6466C25.4576 23.6466 26.8656 22.2389 26.8656 20.503ZM26.8656 4.18297C26.8656 2.44674 25.4579 1.03911 23.7217 1.03911C21.9855 1.03911 20.5778 2.44674 20.5778 4.18297C20.5778 5.91921 21.9855 7.32683 23.7217 7.32683C25.4576 7.32683 26.8656 5.91921 26.8656 4.18297ZM25.119 8.56119C26.9045 8.56119 28.3817 9.98692 28.4524 11.7644H28.4436H28.4286H28.4135H28.3985H28.3834H28.3684H28.3533H28.3383H28.3233H28.3083H28.2932H28.2782H28.2632H28.2482H28.2332H28.2182H28.2033H28.1883H28.1733H28.1583H28.1434H28.1284H28.1135H28.0985H28.0836H28.0686H28.0537H28.0387H28.0238H28.0089H27.9939H27.979H27.9641H27.9492H27.9342H27.9193H27.9044H27.8895H27.8746H27.8597H27.8448H27.8299H27.815H27.8001H27.7852H27.7703H27.7554H27.7405H27.7256H27.7107H27.6958H27.6809H27.666H27.6511H27.6362H27.6213H27.6065H27.5916H27.5767H27.5618H27.5469H27.532H27.5171H27.5022H27.4873H27.4724H27.4575H27.4426H27.4277H27.4128H27.3979H27.383H27.3681H27.3532H27.3382H27.3233H27.3084H27.2935H27.2785H27.2636H27.2487H27.2338H27.2188H27.2039H27.1889H27.174H27.159H27.1441H27.1291H27.1141H27.0992H27.0842H27.0692H27.0542H27.0392H27.0242H27.0092H26.9942H26.9792H26.9642H26.9492H26.9342H26.9191H26.9041H26.8891H26.874H26.8589H26.8439H26.8288H26.8137H26.7987H26.7836H26.7685H26.7534H26.7383H26.7231H26.708H26.6929H26.6777H26.6626H26.6474H26.6322H26.6171H26.6019H26.5867H26.5715H26.5563H26.5411H26.5258H26.5106H26.4954H26.4801H26.4648H26.4496H26.4343H26.419H26.4037H26.3884H26.373H26.3577H26.3424H26.327H26.3116H26.2963H26.2809H26.2655H26.2501H26.2346H26.2192H26.2037H26.1883H26.1728H26.1573H26.1418H26.1263H26.1108H26.0953H26.0797H26.0642H26.0486H26.033H26.0174H26.0018H25.9862H25.9706H25.9549H25.9392H25.9236H25.9079H25.8922H25.8765H25.8607H25.845H25.8292H25.8134H25.7976H25.7818H25.766H25.7502H25.7343H25.7184H25.7025H25.6866H25.6707H25.6548H25.6388H25.6229H25.6069H25.5909H25.5749H25.5589H25.5428H25.5267H25.5107H25.4946H25.4784H25.4623H25.4461H25.43H25.4138H25.3976H25.3814H25.3651H25.3489H25.3326H25.3163H25.3H25.2836H25.2673H25.2509H25.2345H25.2181H25.2017H25.1852H25.1687H25.1522H25.1357H25.1192H25.1026H25.0861H25.0695H25.0529H25.0362H25.0196H25.0029H24.9862H24.9695H24.9527H24.936H24.9192H24.9024H24.8856H24.8687H24.8519H24.835H24.818H24.8011H24.7842H24.7672H24.7502H24.7331H24.7161H24.699H24.6819H24.6648H24.6476H24.6305H24.6133H24.5961H24.5788H24.5616H24.5443H24.527H24.5096H24.4923H24.4749H24.4575H24.44H24.4226H24.4051H24.3876H24.37H24.3524H24.3349H24.3172H24.2996H24.2819H24.2642H24.2465H24.2288H24.211H24.1932H24.1754H24.1575H24.1396H24.1217H24.1038H24.0858H24.0678H24.0498H24.0317H24.0137H23.9956H23.9774H23.9593H23.9411H23.9229H23.9046H23.8863H23.868H23.8497H23.8313H23.8129H23.7945H23.7761H23.7576H23.7391H23.7205H23.7019H23.6833H23.6647H23.646H23.6273H23.6086H23.5899H23.5711H23.5523H23.5334H23.5145H23.4956H23.4767H23.4577H23.4387H23.4196H23.4006H23.3815H23.3623H23.3432H23.324H23.3047H23.2855H23.2662H23.2468H23.2275H23.2081H23.1886H23.1692H23.1497H23.1301H23.1105H23.0909H23.0713H23.0516H23.0319H23.0122H22.9924H22.9726H22.9528H22.9329H22.913H22.893H22.873H22.853H22.8329H22.8128H22.7927H22.7725H22.7523H22.7321H22.7118H22.6915H22.6712H22.6508H22.6304H22.6099H22.5894H22.5689H22.5483H22.5277H22.507H22.4863H22.4656H22.4449H22.4241H22.4032H22.3823H22.3614H22.3405H22.3195H22.2985H22.2774H22.2563H22.2351H22.2139H22.1927H22.1714H22.1501H22.1288H22.1074H22.086H22.0645H22.043H22.0214H21.9998H21.9782H21.9565H21.9348H21.9131H21.8913H21.8694H21.8476H21.8256H21.8037H21.7817H21.7596H21.7375H21.7154H21.6932H21.671H21.6488H21.6265H21.6041H21.5817H21.5593H21.5368H21.5143H21.4917H21.4691H21.4465H21.4238H21.4011H21.3783H21.3555H21.3326H21.3097H21.2867H21.2637H21.2407H21.2176H21.1944H21.1712H21.148H21.1247H21.1014H21.0781H21.0546H21.0312H21.0077H20.9841H20.9605H20.9369H20.9132H20.8895H20.8657H20.8418H20.818H20.794H20.7701H20.746H20.722H20.6979H20.6737H20.6495H20.6252H20.6009H20.5766H20.5522H20.5277H20.5032H20.4786H20.454H20.4294H20.4047H20.3799H20.3551H20.3303H20.3054H20.2805H20.2555H20.2304H20.2053H20.1802H20.155H20.1297H20.1044H20.0791H20.0537H20.0282H20.0027H19.9771H19.9515H19.9259H19.9002H19.8744H19.8486H19.8227H19.7968H19.7708H19.7448H19.7187H19.6926H19.6664H19.6402H19.6139H19.5876H19.5612H19.5347H19.5082H19.4817H19.455H19.4284H19.4017H19.3749H19.3481H19.3212H19.2942H19.2673H19.2402H19.2131H19.186H19.1587H19.1315H19.1042H19.0768H19.0493H19.0219H18.9943H18.9907C19.0613 9.98692 20.5386 8.56119 22.3241 8.56119H25.119ZM25.119 7.69685H22.3241C20.013 7.69685 18.1236 9.58582 18.1236 11.8973V12.1966C18.1236 12.4353 18.3171 12.6287 18.5558 12.6287H28.8872C29.1259 12.6287 29.3194 12.4353 29.3194 12.1966V11.8973C29.3194 9.58617 27.4301 7.69685 25.119 7.69685ZM21.4422 4.18297C21.4422 2.92381 22.4625 1.90346 23.7217 1.90346C24.9809 1.90346 26.0012 2.92381 26.0012 4.18297C26.0012 5.44178 24.9805 6.46249 23.7217 6.46249C22.4629 6.46249 21.4422 5.44178 21.4422 4.18297ZM25.119 24.8813C26.9045 24.8813 28.3817 26.307 28.4524 28.0845H28.4436H28.4286H28.4135H28.3985H28.3834H28.3684H28.3533H28.3383H28.3233H28.3083H28.2932H28.2782H28.2632H28.2482H28.2332H28.2182H28.2033H28.1883H28.1733H28.1583H28.1434H28.1284H28.1135H28.0985H28.0836H28.0686H28.0537H28.0387H28.0238H28.0089H27.9939H27.979H27.9641H27.9492H27.9342H27.9193H27.9044H27.8895H27.8746H27.8597H27.8448H27.8299H27.815H27.8001H27.7852H27.7703H27.7554H27.7405H27.7256H27.7107H27.6958H27.6809H27.666H27.6511H27.6362H27.6213H27.6065H27.5916H27.5767H27.5618H27.5469H27.532H27.5171H27.5022H27.4873H27.4724H27.4575H27.4426H27.4277H27.4128H27.3979H27.383H27.3681H27.3532H27.3382H27.3233H27.3084H27.2935H27.2785H27.2636H27.2487H27.2338H27.2188H27.2039H27.1889H27.174H27.159H27.1441H27.1291H27.1141H27.0992H27.0842H27.0692H27.0542H27.0392H27.0242H27.0092H26.9942H26.9792H26.9642H26.9492H26.9342H26.9191H26.9041H26.8891H26.874H26.8589H26.8439H26.8288H26.8137H26.7987H26.7836H26.7685H26.7534H26.7383H26.7231H26.708H26.6929H26.6777H26.6626H26.6474H26.6322H26.6171H26.6019H26.5867H26.5715H26.5563H26.5411H26.5258H26.5106H26.4954H26.4801H26.4648H26.4496H26.4343H26.419H26.4037H26.3884H26.373H26.3577H26.3424H26.327H26.3116H26.2963H26.2809H26.2655H26.2501H26.2346H26.2192H26.2037H26.1883H26.1728H26.1573H26.1418H26.1263H26.1108H26.0953H26.0797H26.0642H26.0486H26.033H26.0174H26.0018H25.9862H25.9706H25.9549H25.9392H25.9236H25.9079H25.8922H25.8765H25.8607H25.845H25.8292H25.8134H25.7976H25.7818H25.766H25.7502H25.7343H25.7184H25.7025H25.6866H25.6707H25.6548H25.6388H25.6229H25.6069H25.5909H25.5749H25.5589H25.5428H25.5267H25.5107H25.4946H25.4784H25.4623H25.4461H25.43H25.4138H25.3976H25.3814H25.3651H25.3489H25.3326H25.3163H25.3H25.2836H25.2673H25.2509H25.2345H25.2181H25.2017H25.1852H25.1687H25.1522H25.1357H25.1192H25.1026H25.0861H25.0695H25.0529H25.0362H25.0196H25.0029H24.9862H24.9695H24.9527H24.936H24.9192H24.9024H24.8856H24.8687H24.8519H24.835H24.818H24.8011H24.7842H24.7672H24.7502H24.7331H24.7161H24.699H24.6819H24.6648H24.6476H24.6305H24.6133H24.5961H24.5788H24.5616H24.5443H24.527H24.5096H24.4923H24.4749H24.4575H24.44H24.4226H24.4051H24.3876H24.37H24.3524H24.3349H24.3172H24.2996H24.2819H24.2642H24.2465H24.2288H24.211H24.1932H24.1754H24.1575H24.1396H24.1217H24.1038H24.0858H24.0678H24.0498H24.0317H24.0137H23.9956H23.9774H23.9593H23.9411H23.9229H23.9046H23.8863H23.868H23.8497H23.8313H23.8129H23.7945H23.7761H23.7576H23.7391H23.7205H23.7019H23.6833H23.6647H23.646H23.6273H23.6086H23.5899H23.5711H23.5523H23.5334H23.5145H23.4956H23.4767H23.4577H23.4387H23.4196H23.4006H23.3815H23.3623H23.3432H23.324H23.3047H23.2855H23.2662H23.2468H23.2275H23.2081H23.1886H23.1692H23.1497H23.1301H23.1105H23.0909H23.0713H23.0516H23.0319H23.0122H22.9924H22.9726H22.9528H22.9329H22.913H22.893H22.873H22.853H22.8329H22.8128H22.7927H22.7725H22.7523H22.7321H22.7118H22.6915H22.6712H22.6508H22.6304H22.6099H22.5894H22.5689H22.5483H22.5277H22.507H22.4863H22.4656H22.4449H22.4241H22.4032H22.3823H22.3614H22.3405H22.3195H22.2985H22.2774H22.2563H22.2351H22.2139H22.1927H22.1714H22.1501H22.1288H22.1074H22.086H22.0645H22.043H22.0214H21.9998H21.9782H21.9565H21.9348H21.9131H21.8913H21.8694H21.8476H21.8256H21.8037H21.7817H21.7596H21.7375H21.7154H21.6932H21.671H21.6488H21.6265H21.6041H21.5817H21.5593H21.5368H21.5143H21.4917H21.4691H21.4465H21.4238H21.4011H21.3783H21.3555H21.3326H21.3097H21.2867H21.2637H21.2407H21.2176H21.1944H21.1712H21.148H21.1247H21.1014H21.0781H21.0546H21.0312H21.0077H20.9841H20.9605H20.9369H20.9132H20.8895H20.8657H20.8418H20.818H20.794H20.7701H20.746H20.722H20.6979H20.6737H20.6495H20.6252H20.6009H20.5766H20.5522H20.5277H20.5032H20.4786H20.454H20.4294H20.4047H20.3799H20.3551H20.3303H20.3054H20.2805H20.2555H20.2304H20.2053H20.1802H20.155H20.1297H20.1044H20.0791H20.0537H20.0282H20.0027H19.9771H19.9515H19.9259H19.9002H19.8744H19.8486H19.8227H19.7968H19.7708H19.7448H19.7187H19.6926H19.6664H19.6402H19.6139H19.5876H19.5612H19.5347H19.5082H19.4817H19.455H19.4284H19.4017H19.3749H19.3481H19.3212H19.2942H19.2673H19.2402H19.2131H19.186H19.1587H19.1315H19.1042H19.0768H19.0493H19.0219H18.9943H18.9907C19.0613 26.307 20.5386 24.8813 22.3241 24.8813H25.119ZM25.119 24.0169H22.3241C20.013 24.0169 18.1236 25.9059 18.1236 28.217V28.5166C18.1236 28.7553 18.3171 28.9488 18.5558 28.9488H28.8872C29.1259 28.9488 29.3194 28.7553 29.3194 28.5166V28.217C29.3194 25.9059 27.4301 24.0169 25.119 24.0169ZM21.4422 20.503C21.4422 19.2439 22.4625 18.2235 23.7217 18.2235C24.9809 18.2235 26.0012 19.2439 26.0012 20.503C26.0012 21.7618 24.9805 22.7822 23.7217 22.7822C22.4629 22.7822 21.4422 21.7618 21.4422 20.503ZM9.37772 20.6663V18.7509C9.37772 17.4295 8.83267 16.4382 8.01393 15.7791C7.19645 15.1209 6.10865 14.7955 5.02312 14.7982C3.93758 14.8008 2.84988 15.1314 2.03251 15.7907C1.2139 16.4511 0.66875 17.4397 0.66875 18.7509V20.6663C0.66875 20.905 0.86221 21.0985 1.10092 21.0985H8.9452C9.18385 21.0985 9.37772 20.9051 9.37772 20.6663ZM7.76651 11.633C7.76651 10.1178 6.5381 8.88941 5.02288 8.88941C3.50801 8.88941 2.27961 10.1178 2.27961 11.633C2.27961 13.1465 3.50979 14.3767 5.02288 14.3767C6.5374 14.3767 7.76651 13.1472 7.76651 11.633ZM3.14396 11.633C3.14396 10.5952 3.9851 9.75375 5.02288 9.75375C6.06068 9.75375 6.90216 10.5952 6.90216 11.633C6.90216 12.6719 6.06243 13.5123 5.02288 13.5123C3.9844 13.5123 3.14396 12.6712 3.14396 11.633Z"
                          fill="#0191E7"
                          stroke="#0191E7"
                          stroke-width="0.1"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_360_73">
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
