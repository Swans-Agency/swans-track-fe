import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const TeamView = dynamic(() => import("@/components/Team/TeamView"), {
  loading: () => <Loading />,
});

export default function index({ userPermission }) {
  return <TeamView
    userPermission={userPermission}
  />;
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  try {
    if (accessToken) {
      let allowedPermissions = ["Admin", "Supervisor"]
      if (userPermission && !allowedPermissions.includes(userPermission)) {
        return {
          redirect: {
            destination: "/authorized/dashboard",
            permanent: false,
          },
        };
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
    ;
  }
  return { props: { accessToken, userPermission } };
};
