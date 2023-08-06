import React, { useState } from "react";
import dynamic from "next/dynamic";
import ExoenseForm from "@/components/expenses/ExpenseForm";
import Loading from "@/components/Loading/Loading";
import DrawerANTD from "@/components/ANTD/DrawerANTD";
import { getAxiosServer } from "@/functions/ApiCalls";
const Expenses = dynamic(() => import("@/components/expenses/Expenses"), {
  loading: () => <Loading />,
});

export default function index({ userPermission }) {
  const [reloadData, setReloadData] = useState();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Expenses />
      </div>
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
    console.log(e);
  }
  return { props: { accessToken, userPermission } };
};
