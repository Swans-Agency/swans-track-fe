import React, { useState } from "react";
import { Drawer } from "antd";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
import IncomeForm from "@/components/income/IncomeForm";
const Incomes = dynamic(() => import("@/components/income/Incomes"), {
  loading: () => <Loading />,
});

export default function index({ accessToken, userPermission }) {
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
        <Incomes
          showModal={showDrawer}
          userPermission={userPermission}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      </div>
      <Drawer
        width="600"
        placement="right"
        title="Add New Income"
        onClose={onClose}
        open={open}
      >
        <IncomeForm setReloadData={setReloadData} />
      </Drawer>
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
