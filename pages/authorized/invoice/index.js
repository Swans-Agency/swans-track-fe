import React, { useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const Invoices = dynamic(() => import("@/components/invoice/Invoices"), {
  loading: () => <Loading />,
});

export default function index() {

  return (
    <Invoices />
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
    console.log(e);
  }
  return { props: { accessToken, userPermission } };
};
