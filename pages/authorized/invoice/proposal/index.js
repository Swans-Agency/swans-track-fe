import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { Drawer } from "antd";
import ProposalForm from "@/components/proposal/ProposalForm";
import { NavCollapse } from "@/context/NavContext";
import Loading from "@/components/Loading/Loading";
const Proposals = dynamic(() => import("@/components/proposal/Proposals"), {
  loading: () => <Loading />,
});

export default function index({ userPermission }) {
  const { collapsed } = useContext(NavCollapse);
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
      <div
        
      >
        <Proposals
          showModal={showDrawer}
          userPermission={userPermission}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      </div>
      <Drawer
        width="600"
        placement="right"
        title="Create New Proposal"
        onClose={onClose}
        open={open}
      >
        <ProposalForm setReloadData={setReloadData} />
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
