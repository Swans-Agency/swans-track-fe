import { Divider, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { getAxios, postAxios } from '@/functions/ApiCalls';
import FormButtons from '@/components/ANTD/FormButtons';
import ProposalForm from '@/components/proposal/ProposalForm';
import InvoiceForm from '@/components/invoice/InvoiceForm';

export default function LinkInvoiceForm({ projectId, getProjectInvoices, projectCurrency, getProjectDetails }) {
    const [proposalData, setProposalData] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        getAllInvoices()
    }, []);

    const getAllInvoices = async () => {
        const url = `${process.env.DIGITALOCEAN}/invoice/get-all-invoices/`;
        const proposalSearchData = await getAxios(url);
        const arrData = proposalSearchData?.map((item) => ({
            value: item.id,
            label: `${item?.invoiceNo} | ${Number(item?.invoiceTotal).toFixed(2)} ${projectCurrency}`,
        }));
        setProposalData(arrData);
    };

    const searchProposal = async (value) => {
        const url = `${process.env.DIGITALOCEAN}/search/invoice/?search=${value}`;
        const proposalSearchData = await getAxios(url);
        const arrData = proposalSearchData?.map((item) => ({
            value: item.id,
            label: `${item?.invoiceNo} | ${Number(item?.invoiceTotal).toFixed(2)} ${projectCurrency}`,
        }));
        setProposalData(arrData);
    };

    const onFinish = async (data) => {

        setIsLoading(true)
        const url = `${process.env.DIGITALOCEAN}/project/invoice-project/${projectId}/`;
        await postAxios(url, data, true, true);
        getProjectInvoices()
        getProjectDetails()
        setIsLoading(false)
    }

    return (
        <>
            {open1 ? (
                <div>
                    <div
                        onClick={() => {
                            setOpen1(false);
                        }}
                        className="hover:cursor-pointer py-2 px-4 bg-[#282828] text-white rounded-lg flex justify-center items-center gap-x-3 mb-3"
                    >
                        <ArrowLeftOutlined />
                        Back to invoice selection
                    </div>
                    <InvoiceForm
                        setReload={() => { }}
                        getAllInvoices={getAllInvoices}
                        onClose={() => {
                            setOpen1(false);
                        }}
                    />
                </div>
            ) : (
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        alignContent: "center",
                        maxWidth: 600,
                    }}
                    className="custom-form"
                    form={form}
                    requiredMark={true}
                >
                    <div className='grid laptop:grid-cols-[1fr_1fr] gap-x-5 w-full '>
                        <Form.Item
                            label="Invoice Status"
                            name="status"
                            className="w-full"
                        >
                            <Select
                                size="large"
                                defaultValue=""
                                style={{
                                    width: "100%",
                                }}
                                onChange={(e) => {
                                    form.setFieldValue("status", e);
                                }}
                                allowClear={true}
                                options={[
                                    { label: "Pending", value: "Pending" },
                                    { label: "Paid", value: "Paid" },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Link to existing invoice"
                            name="invoice"
                            className="w-full"
                        >
                            <div className="flex items-center gap-1">
                                <Select
                                    size="large"
                                    showSearch
                                    defaultValue=""
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(e) => {
                                        form.setFieldValue("invoice", e);
                                    }}
                                    allowClear={true}
                                    filterOption={false}
                                    onSearch={searchProposal}
                                    options={proposalData}
                                />
                                <button
                                        className="p-[0.75rem] flex rounded-lg items-center bg-foreignBackground hover:bg-mainBackground hover:dark:bg-[#141414] dark:bg-[#282828] text-white"
                                    onClick={() => {
                                        setOpen1(true)
                                    }}
                                    title="Create new invoice"
                                >
                                    <PlusOutlined />
                                </button>
                            </div>
                        </Form.Item>
                    </div>
                    <Divider />
                    <div className="flex gap-x-5 w-full justify-end">
                        <Form.Item>
                            <FormButtons content="Save" isLoading={isLoading} />
                        </Form.Item>
                    </div>
                </Form>
            )}
        </>

    );
};