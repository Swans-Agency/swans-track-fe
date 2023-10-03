import React from "react";
import SupportForm from "./SupportForm";
import Fozi from "./Fozi";

export default function Support(props) {
  return (
    <div className="grid laptop:grid-cols-2 phone:grid-cols-1 justify-center items-center laptop:px-36 pt-10 gap-x-10">
      <div>
        <SupportForm />
      </div>
      <div className="laptop:block phone:hidden">
        <Fozi />
      </div>
    </div>
  );
}
