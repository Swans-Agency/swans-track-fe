import React from "react";
import SupportForm from "./SupportForm";
import Fozi from "./Fozi";

export default function Support(props) {
  return (
    <div className="grid grid-cols-2 justify-center items-center p-36 gap-x-10">
      <div>
        <SupportForm />
      </div>
      <div>
        <Fozi />
      </div>
    </div>
  );
}
