import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const TeamView = dynamic(() => import("@/components/Team/TeamView"), {
  loading: () => <Loading />,
});

export default function index() {
  return <TeamView />;
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let isConnected = null;
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
    console.log({ e });
  }
  return { props: { accessToken, userPermission, isConnected } };
};
