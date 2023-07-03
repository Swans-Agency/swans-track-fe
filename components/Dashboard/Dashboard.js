import React from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
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
import { Card, Statistic } from "antd";

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
  const formatNumber = (number) => {
    if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "m";
    }
    return number?.toString();
  };

  return (
    <div className="grid laptop:grid-cols-[1fr_1fr_1fr] tablet:grid-cols-[1fr_1fr] sm:grid-cols-[1fr] gap-4 mb-4 overflow-hidden">
        
        <Card
        bordered={false}
        hoverable={false}
        className="grid rounded-lg laptop:col-span-3 tablet:col-span-2 items-center text-center bg-gray-100"
      >
        <div className="w-[100%] py-4 px-3 ">
          <svg
            aria-hidden="true"
            class="w-12 h-12 mx-auto mb-0 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <p className="mt-0 italic">{quotes?.quote}</p>
          <p className="font-bold italic">- {quotes?.author} -</p>
        </div>
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Monthly Proposals</p>
        {proposals?.percentChange > 0 ? (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <FileSearchOutlined /> <p>{proposals?.currentMonthProposals}</p>
              </div>
            }
            value={
              typeof formatNumber(proposals?.percentChange) != NaN
                ? formatNumber(proposals?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        ) : (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <FileSearchOutlined /> <p>{proposals?.currentMonthProposals}</p>
              </div>
            }
            value={
              typeof formatNumber(proposals?.percentChange * -1) != NaN
                ? formatNumber(proposals?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        )}
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Monthly Invoice</p>
        {invoices?.percentChange > 0 ? (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <FileDoneOutlined /> <p>{invoices?.currentMonthInvoices}</p>
              </div>
            }
            value={
              typeof formatNumber(invoices?.percentChange) != NaN
                ? formatNumber(invoices?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        ) : (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <FileDoneOutlined /> <p>{invoices?.currentMonthInvoices}</p>
              </div>
            }
            value={
              typeof formatNumber(invoices?.percentChange * -1) != NaN
                ? formatNumber(invoices?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        )}
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Proposals Invoices Ratio</p>
        {successRatio?.successRatio > 0 ? (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <FileSyncOutlined />{" "}
                <p>
                  {successRatio?.invoices}/{successRatio?.proposals}
                </p>
              </div>
            }
            value={
              typeof formatNumber(successRatio?.successRatio) != NaN
                ? formatNumber(successRatio?.successRatio)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        ) : (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <FileSyncOutlined />{" "}
                <p>
                  {successRatio?.invoices}/{successRatio?.proposals}
                </p>
              </div>
            }
            value={
              typeof formatNumber(successRatio?.successRatio * -1) != NaN
                ? formatNumber(successRatio?.successRatio)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        )}
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Customer Aquisition</p>
        {clients?.percentChange > 0 ? (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <UserAddOutlined /> <p>{clients?.currentMonthClients}</p>
              </div>
            }
            value={
              typeof formatNumber(clients?.percentChange) != NaN
                ? formatNumber(clients?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        ) : (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <UserAddOutlined /> <p>{clients?.currentMonthClients}</p>
              </div>
            }
            value={
              typeof formatNumber(clients?.percentChange * -1) != NaN
                ? formatNumber(clients?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        )}
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Monthly Expenses</p>
        {expenses?.percentChange > 0 ? (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <MonitorOutlined /> <p>{expenses?.currentMonthExpenses}</p>
              </div>
            }
            value={
              typeof formatNumber(expenses?.percentChange) != NaN
                ? formatNumber(expenses?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        ) : (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <MonitorOutlined /> <p>{expenses?.currentMonthExpenses}</p>
              </div>
            }
            value={
              typeof formatNumber(expenses?.percentChange * -1) != NaN
                ? formatNumber(expenses?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        )}
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Monthly Income</p>
        {income?.percentChange > 0 ? (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <MoneyCollectOutlined /> <p>{income?.currentMonthIncome}</p>
              </div>
            }
            value={
              typeof formatNumber(income?.percentChange) != NaN
                ? formatNumber(income?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        ) : (
          <Statistic
            title={
              <div className="flex items-center justify-start gap-x-1 text-lg">
                <MoneyCollectOutlined /> <p>{income?.currentMonthIncome}</p>
              </div>
            }
            value={
              typeof formatNumber(income?.percentChange * -1) != NaN
                ? formatNumber(income?.percentChange)
                : "-"
            }
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        )}
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid tablet:col-span-2 laptop:col-span-1 rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Expenses by Category</p>
        <DoughnutChart expensesCategory={expensesCategory} />
        {/* <RoseChart expensesCategory={expensesCategory} /> */}
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid col-span-2 rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Clients by Referral Source</p>
        <BarChart clientsCategory={clientsCategory} />
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid col-span-2 rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Expenses & Income Alltime</p>
        <LineChart
          expenseAlltime={expenseAlltime}
          incomeAlltime={incomeAlltime}
        />
      </Card>

      <Card
        bordered={false}
        hoverable={true}
        className="grid tablet:col-span-2 laptop:col-span-1 rounded-lg bg-gray-100"
      >
        <p className="text-lg font-semibold mb-2">Income by Payment Method</p>
        <DoughnutChart expensesCategory={incomePayment} />
      </Card>

    </div>
  );
}
