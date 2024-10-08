import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const SupportForm = dynamic(() => import("@/components/Support/SupportForm"), {
  loading: () => <Loading />,
});

export default function Index(props) {
  return (
    <SupportForm />
  );
}
