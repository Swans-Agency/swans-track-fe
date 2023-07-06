import { redirect } from "@/functions/GeneralFunctions";
import { Result } from "antd";

export default function UnauthorizedPage() {
  return (
    <Result
      status="403"
      title={<div className="text-textIcons font-black text-[5rem]">403</div>}
      subTitle={
        <div className="text-textIcons text-xl">
          Sorry, you are not authorized to view this page.
        </div>
      }
      extra={
        <button
          className="rounded-lg text-lg py-2 px-4 bg-foreignBackground hover:bg-sidebar text-textIcons"
          onClick={() => {
            redirect("/");
          }}
        >
          Back Home
        </button>
      }
    />
  );
}
