import React, { useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const Proposals = dynamic(() => import("@/components/proposal/Proposals"), {
  loading: () => <Loading />,
});

export default function index() {

  return (
    <Proposals />
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
