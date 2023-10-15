import React from "react";
import { getAxios } from "@/functions/ApiCalls";
import { NotificationLoading } from "@/functions/Notifications";
import CardANTD from "../ANTD/CardANTD";
import ChildrenContent from "./ChildrenContent";
import TrendingDown from "../Navbar/Icons/TrendingDown";
import TrendingUp from "../Navbar/Icons/TrendingUp";
import Proposal from "../Navbar/Icons/Proposal";
import Invoice from "../Navbar/Icons/Invoice";
import Tasks from "../Navbar/Icons/Tasks";
import Clients from "../Navbar/Icons/Clients";
export default function ReportComponent() {
  const classNames =
    "text-linkColor hover:text-linkColorHover hover:cursor-pointer";
  const itemsOptions = [
    "this year",
    "previous year",
    "this month",
    "previous month",
  ];

  const panels = [
    {
      icon: <TrendingDown />,
      header: "Expense Transactions",
      key: "expense",
    },
    {
      icon: <TrendingUp />,
      header: "Income Transactions",
      key: "income",
    },
    {
      icon: <Proposal />,
      header: "Proposals",
      key: "proposal",
    },
    {
      icon: <Tasks />,
      header: "Proposal Items",
      key: "proposal-items",
    },
    {
      icon: <Invoice />,
      header: "Invoices",
      key: "invoice",
    },
    {
      icon: <Tasks />,
      header: "Invoice Items",
      key: "invoice-items",
    },

    {
      icon: <Clients />,
      header: "Clients",
      key: "clients",
    },
  ];

  const handleDownloadReport = async (e, path) => {
    NotificationLoading();
    console.log(e);
    const URL = `${process.env.DIGITALOCEAN}/reports/${path}/?search=${e}`;
    let resData = await getAxios(URL);
    if (resData) {
      var url = window.URL.createObjectURL(new Blob([resData]));
      var a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex flex-wrap flex-grow items-center desktop:justify-start phone:justify-center gap-4">
      {panels?.map((content, index) => {
        return (
          <CardANTD
          className=""
            key={index}
            title={
              <div className="flex gap-x-2 items-center">
                {content?.icon}
                {content?.header}
              </div>
            }
            children={
              <ChildrenContent
                itemsOptions={itemsOptions}
                content={content}
                handleDownloadReport={handleDownloadReport}
                classNames={classNames}
              />
            }
          />
        );
      })}
    </div>
  );
}
