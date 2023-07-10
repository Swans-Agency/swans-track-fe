import React, { useState } from "react";
import dynamic from "next/dynamic";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import Loading from "@/components/Loading/Loading";
import DrawerANTD from "@/components/ANTD/DrawerANTD";
import { getAxiosServer } from "@/functions/ApiCalls";
const Invoices = dynamic(() => import("@/components/invoice/Invoices"), {
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
      <Invoices
        showModal={showDrawer}
        userPermission={userPermission}
        reloadData={reloadData}
        setReloadData={setReloadData}
      />
      <DrawerANTD
        title="Create New Invoice"
        onClose={onClose}
        open={open}
        children={<InvoiceForm setReloadData={setReloadData} />}
      />
    </>
  );
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
    console.log(e);
  }
  return { props: { accessToken, userPermission } };
};
