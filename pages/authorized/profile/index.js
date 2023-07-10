import React from "react";
import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
import { getAxiosServer } from "@/functions/ApiCalls";
const Profile = dynamic(() => import("@/components/Profile/Profile"), {
  loading: () => <Loading />,
});

export default function index() {
  return <Profile />;
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let authorized = null;
  try {
    if (accessToken) {
      authorized = await getAxiosServer(
        `${process.env.DIGITALOCEAN}/validateToken/`,
        accessToken,
        false
      );
      if (authorized.status === 200) {
      } else {
        accessToken = null;
      }
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
  return { props: { accessToken, userPermission } };
};
