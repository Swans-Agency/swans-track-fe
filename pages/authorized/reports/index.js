import React from "react";
import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
const IndexReport = dynamic(() => import("@/components/Reports/IndexReport"), {
  loading: () => <Loading />,
});

export default function index() {
  return <IndexReport />;
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
