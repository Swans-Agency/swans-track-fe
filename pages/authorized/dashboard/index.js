import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
import { Form } from "antd";
import { getAxiosServer, postAxios } from "@/functions/ApiCalls";
import { getAxios } from "@/functions/ApiCalls";
import Feedback from "@/components/Dashboard/Feedback";

const Dashboard = dynamic(() => import("@/components/Dashboard/Dashboard"), {
  loading: () => <Loading />,
});

export default function index() {
  const [quotes, setQuotes] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getDashboardData();
    checkTestimonials();
  }, []);

  const checkTestimonials = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/check-testimonials/`;
    let res = await getAxios(url);
    setIsModalOpen(res?.result);
  };

  const onFinish = async (values) => {
    const url = `${process.env.DIGITALOCEAN}/account/create-testimonials/`;
    let res = await postAxios(url, values, true, true);
    setIsModalOpen(false);
  };

  const getDashboardData = async () => {
    let quote = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/daily-quote/`
    );
    setQuotes(quote);

    let dashbaordRes = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/dashboard-view/`
    );
    setDashboardData(dashbaordRes);
  };
  return (
    <>
      <div className="">
        <Dashboard
          quotes={quotes}
          dashboardData={dashboardData}
        />
      </div>
      <Feedback
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        onFinish={onFinish}
      />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  try {
    if (accessToken) {
    } else {
      return {
        redirect: {
          destination: "/401",
          permanent: false,
        },
      };
    }
  } catch (e) {
    ;
  }
  return { props: { accessToken, userPermission } };
};
