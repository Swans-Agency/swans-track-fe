import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const TeamTable = dynamic(() => import("@/components/teamMembers/TeamTable"), {
  loading: () => <Loading />,
});

export default function index() {
  return (
    <>
      <div>
        <TeamTable />
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  try {
    if (accessToken) {
      if (userPermission != "Supervisor") {
        return {
          redirect: {
            destination: "/401",
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
    console.log(e);
  }
  return { props: { accessToken, userPermission } };
};
