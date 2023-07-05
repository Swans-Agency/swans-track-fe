import React from "react";
import {
  UserAddOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  MoneyCollectOutlined,
  MonitorOutlined,
} from "@ant-design/icons";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import CardPercent from "./CardPercent";
import Quote from "./Quote";
import Circular from "./circular";
import LinearChart from "./LinearChart";

export default function Dashboard({
  quotes,
  proposals,
  invoices,
  successRatio,
  clients,
  expenses,
  income,
  expensesCategory,
  clientsCategory,
  expenseAlltime,
  incomeAlltime,
  incomePayment,
}) {
  return (
    <div className="grid laptop:grid-cols-[1fr_1fr_1fr] tablet:grid-cols-[1fr_1fr] sm:grid-cols-[1fr] gap-4 mb-4 overflow-hidden">
      <Quote quotes={quotes} />

      <CardPercent
        title="Monthly Proposals"
        main={proposals?.percentChange}
        percent={proposals?.percentChange}
        icon={
          <>
            <FileSearchOutlined /> {proposals?.currentMonthProposals}
          </>
        }
      />
      <CardPercent
        title="Monthly Invoice"
        main={invoices?.percentChange}
        percent={invoices?.percentChange}
        icon={
          <>
            <FileDoneOutlined /> {invoices?.currentMonthInvoices}
          </>
        }
      />

      <CardPercent
        title="Proposals Invoices Ratio"
        main={successRatio?.successRatio}
        percent={successRatio?.successRatio}
        icon={
          <>
            <FileSyncOutlined /> {successRatio?.invoices}/
            {successRatio?.proposals}
          </>
        }
      />

      <CardPercent
        title="Customer Aquisition"
        main={clients?.percentChange}
        percent={clients?.percentChange}
        icon={
          <>
            <UserAddOutlined /> {clients?.currentMonthClients}
          </>
        }
      />

      <CardPercent
        title="Monthly Expenses"
        main={expenses?.percentChange}
        percent={expenses?.percentChange}
        icon={
          <>
            <MonitorOutlined /> {expenses?.currentMonthExpenses}
          </>
        }
      />

      <CardPercent
        title="Monthly Income"
        main={income?.percentChange}
        percent={income?.percentChange}
        icon={
          <>
            <MoneyCollectOutlined /> {income?.currentMonthIncome}
          </>
        }
      />

      <LinearChart
        title="Expenses & Income Alltime"
        chart={
          <LineChart
            expenseAlltime={expenseAlltime}
            incomeAlltime={incomeAlltime}
          />
        }
        classs={"col-span-2"}
      />
      <Circular
        title="Expenses by Category"
        chart={<DoughnutChart expensesCategory={expensesCategory} />}
      />

      <Circular
        title="Income by Payment Method"
        chart={<DoughnutChart expensesCategory={incomePayment} />}
      />

      <LinearChart
        title="Clients by Referral Source"
        chart={<BarChart clientsCategory={clientsCategory} />}
        classs={"col-span-2"}
      />
    </div>
  );
}
