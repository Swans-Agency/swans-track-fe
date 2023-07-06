import React, { useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
import IncomeForm from "@/components/income/IncomeForm";
import DrawerANTD from "@/components/ANTD/DrawerANTD";
const Incomes = dynamic(() => import("@/components/income/Incomes"), {
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
        <Incomes
          showModal={showDrawer}
          userPermission={userPermission}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      </div>
      <DrawerANTD
        title="Add New Income"
        onClose={onClose}
        open={open}
        children={<IncomeForm setReloadData={setReloadData} />}
      />
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
