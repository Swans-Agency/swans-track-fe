import React from "react";

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
        number={<>{proposals?.currentMonthProposals}</>}
        color={"bg-[#947404]"}
        icon={
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 19V15.5C26 14.3065 25.5259 13.1619 24.682 12.318C23.8381 11.4741 22.6935 11 21.5 11H19.5C19.1022 11 18.7206 10.842 18.4393 10.5607C18.158 10.2794 18 9.89782 18 9.5V7.5C18 6.30653 17.5259 5.16193 16.682 4.31802C15.8381 3.47411 14.6935 3 13.5 3H11M11 20H21M11 24H16M14 3H7.5C6.672 3 6 3.672 6 4.5V27.5C6 28.328 6.672 29 7.5 29H24.5C25.328 29 26 28.328 26 27.5V15C26 11.8174 24.7357 8.76516 22.4853 6.51472C20.2348 4.26428 17.1826 3 14 3Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
      <CardPercent
        title="Monthly Invoice"
        main={invoices?.percentChange}
        percent={invoices?.percentChange}
        number={<>{invoices?.currentMonthInvoices}</>}
        icon={
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 3H7.5C6.672 3 6 3.672 6 4.5V27.5C6 28.328 6.672 29 7.5 29H24.5C25.328 29 26 28.328 26 27.5V15.5M13.5 3H14C17.1826 3 20.2348 4.26428 22.4853 6.51472C24.7357 8.76516 26 11.8174 26 15V15.5M13.5 3C14.6935 3 15.8381 3.47411 16.682 4.31802C17.5259 5.16193 18 6.30653 18 7.5V9.5C18 10.328 18.672 11 19.5 11H21.5C22.6935 11 23.8381 11.4741 24.682 12.318C25.5259 13.1619 26 14.3065 26 15.5M12 20L15 23L20 16"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
        color={"bg-[#00736C]"}
      />

      <CardPercent
        title="Proposals Invoices Ratio"
        main={successRatio?.successRatio}
        percent={successRatio?.successRatio}
        number={
          <>
            {successRatio?.invoices}/{successRatio?.proposals}
          </>
        }
        color={"bg-[#630073]"}
        icon={
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 19V15.5C26 14.3065 25.5259 13.1619 24.682 12.318C23.8381 11.4741 22.6935 11 21.5 11H19.5C19.1022 11 18.7206 10.842 18.4393 10.5607C18.158 10.2794 18 9.89782 18 9.5V7.5C18 6.30653 17.5259 5.16193 16.682 4.31802C15.8381 3.47411 14.6935 3 13.5 3H11M12 22V23M16 19V23M20 16V23M14 3H7.5C6.672 3 6 3.672 6 4.5V27.5C6 28.328 6.672 29 7.5 29H24.5C25.328 29 26 28.328 26 27.5V15C26 11.8174 24.7357 8.76516 22.4853 6.51472C20.2348 4.26428 17.1826 3 14 3Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />

      <CardPercent
        title="Customer Aquisition"
        main={clients?.percentChange}
        percent={clients?.percentChange}
        number={<>{clients?.currentMonthClients}</>}
        color={"bg-[#002073]"}
        icon={
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 8C21 9.32608 20.4732 10.5979 19.5355 11.5355C18.5979 12.4732 17.3261 13 16 13C14.6739 13 13.4022 12.4732 12.4645 11.5355C11.5268 10.5979 11 9.32608 11 8C11 6.67392 11.5268 5.40215 12.4645 4.46447C13.4022 3.52678 14.6739 3 16 3C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8ZM6.00134 26.824C6.04419 24.2005 7.11646 21.6989 8.98691 19.8587C10.8574 18.0186 13.3761 16.9873 16 16.9873C18.6239 16.9873 21.1427 18.0186 23.0131 19.8587C24.8836 21.6989 25.9558 24.2005 25.9987 26.824C22.8619 28.2624 19.4509 29.0047 16 29C12.432 29 9.04534 28.2213 6.00134 26.824Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />

      <CardPercent
        title="Monthly Expenses"
        main={expenses?.percentChange * -1}
        percent={expenses?.percentChange * -1}
        number={<>{expenses?.currentMonthExpenses }</>}
        color={"bg-[#730000]"}
        icon={
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 4H4.848C5.528 4 6.12133 4.45733 6.29733 5.11333L6.808 7.02933M6.808 7.02933C14.2355 6.82118 21.6559 7.64687 28.856 9.48267C27.7573 12.7547 26.452 15.9333 24.9573 19H10M6.808 7.02933L10 19M10 19C8.93913 19 7.92172 19.4214 7.17157 20.1716C6.42143 20.9217 6 21.9391 6 23H27M8 27C8 27.2652 7.89464 27.5196 7.70711 27.7071C7.51957 27.8946 7.26522 28 7 28C6.73478 28 6.48043 27.8946 6.29289 27.7071C6.10536 27.5196 6 27.2652 6 27C6 26.7348 6.10536 26.4804 6.29289 26.2929C6.48043 26.1054 6.73478 26 7 26C7.26522 26 7.51957 26.1054 7.70711 26.2929C7.89464 26.4804 8 26.7348 8 27ZM25 27C25 27.2652 24.8946 27.5196 24.7071 27.7071C24.5196 27.8946 24.2652 28 24 28C23.7348 28 23.4804 27.8946 23.2929 27.7071C23.1054 27.5196 23 27.2652 23 27C23 26.7348 23.1054 26.4804 23.2929 26.2929C23.4804 26.1054 23.7348 26 24 26C24.2652 26 24.5196 26.1054 24.7071 26.2929C24.8946 26.4804 25 26.7348 25 27Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />

      <CardPercent
        title="Monthly Income"
        main={income?.percentChange}
        percent={income?.percentChange}
        number={<>{income?.currentMonthIncome}</>}
        color={"bg-[#00732E]"}
        icon={
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 25C10.1141 24.9942 17.1973 25.9363 24.0627 27.8013C25.032 28.0653 26 27.3453 26 26.34V25M5 6V7C5 7.26522 4.89464 7.51957 4.70711 7.70711C4.51957 7.89464 4.26522 8 4 8H3M3 8V7.5C3 6.672 3.672 6 4.5 6H27M3 8V20M27 6V7C27 7.552 27.448 8 28 8H29M27 6H27.5C28.328 6 29 6.672 29 7.5V20.5C29 21.328 28.328 22 27.5 22H27M3 20V20.5C3 20.8978 3.15804 21.2794 3.43934 21.5607C3.72064 21.842 4.10218 22 4.5 22H5M3 20H4C4.26522 20 4.51957 20.1054 4.70711 20.2929C4.89464 20.4804 5 20.7348 5 21V22M27 22V21C27 20.7348 27.1054 20.4804 27.2929 20.2929C27.4804 20.1054 27.7348 20 28 20H29M27 22H5M20 14C20 15.0609 19.5786 16.0783 18.8284 16.8284C18.0783 17.5786 17.0609 18 16 18C14.9391 18 13.9217 17.5786 13.1716 16.8284C12.4214 16.0783 12 15.0609 12 14C12 12.9391 12.4214 11.9217 13.1716 11.1716C13.9217 10.4214 14.9391 10 16 10C17.0609 10 18.0783 10.4214 18.8284 11.1716C19.5786 11.9217 20 12.9391 20 14ZM24 14H24.0107V14.0107H24V14ZM8 14H8.01067V14.0107H8V14Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
