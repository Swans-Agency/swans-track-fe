import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const LeadsView = dynamic(() => import("@/components/client/LeadsView"), {
  loading: () => <Loading />,
});

export default function index() {
  return (
    <LeadsView />
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
