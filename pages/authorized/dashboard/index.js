import React, {useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
import { Form, Modal, Input } from "antd";
import { postAxios } from "@/functions/ApiCalls";
import { getAxios } from "@/functions/ApiCalls";
import Feedback from "@/components/Dashboard/Feedback";

const Dashboard = dynamic(() => import("@/components/Dashboard/Dashboard"), {
  loading: () => <Loading />,
});

export default function index() {
  const [proposals, setProposals] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expensesCategory, setExpensesCategory] = useState([]);
  const [clientsCategory, setClientsCategory] = useState([]);
  const [successRatio, setSuccessRatio] = useState([]);
  const [income, setIncome] = useState([]);
  const [incomePayment, setIncomePayment] = useState([]);
  const [incomeAlltime, setIncomeAlltime] = useState([]);
  const [expenseAlltime, setExpenseAlltime] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getDashboardData();
    checkTestimonials();
  }, []);

  const checkTestimonials = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/check-testimonials/`;
    let res = await getAxios(url);
    console.log(res, "ssssss");
    setIsModalOpen(res?.result);
  };

  const onFinish = async (values) => {
    const url = `${process.env.DIGITALOCEAN}/account/create-testimonials/`;
    let res = await postAxios(url, values);
  };

  const getDashboardData = async () => {
    let quote = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/daily-quote/`
    );
    setQuotes(quote);
    let proposal = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/proposals/`
    );
    setProposals(proposal);
    let invoice = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/invoices/`
    );
    setInvoices(invoice);
    let successRatios = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/pi-ratio/`
    );
    setSuccessRatio(successRatios);
    let client = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/clients/`
    );
    setClients(client);
    let expense = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/expenses/`
    );
    setExpenses(expense);
    let incomes = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/income/`
    );
    setIncome(incomes);
    let expensesCategories = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/expenses-referral/`
    );
    setExpensesCategory(expensesCategories);
    let clientsCategories = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/clients-referral/`
    );
    setClientsCategory(clientsCategories);
    let incomeAlltimes = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/income-alltime/`
    );
    setIncomeAlltime(incomeAlltimes);
    let expenseAlltimes = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/expense-alltime/`
    );
    setExpenseAlltime(expenseAlltimes);
    let incomePayments = await getAxios(
      `${process.env.DIGITALOCEAN}/company/dashboard/income-type/`
    );
    setIncomePayment(incomePayments);
  };
  return (
    <>
      <div>
        <Dashboard
          quotes={quotes}
          proposals={proposals}
          invoices={invoices}
          successRatio={successRatio}
          clients={clients}
          expenses={expenses}
          income={income}
          expensesCategory={expensesCategory}
          clientsCategory={clientsCategory}
          expenseAlltime={expenseAlltime}
          incomeAlltime={incomeAlltime}
          incomePayment={incomePayment}
        />
      </div>
      <Feedback
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        onFinish={onFinish}
      />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let isConnected = null;
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
    console.log({ e });
  }
  return { props: { accessToken, userPermission, isConnected } };
};
