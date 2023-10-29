import { Divider, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { getAxios, postAxios } from '@/functions/ApiCalls';
import FormButtons from '@/components/ANTD/FormButtons';
import ProposalForm from '@/components/proposal/ProposalForm';

export default function LinkProposalForm({ projectId, getProjectProposals, projectCurrency, getProjectDetails }) {
    const [proposalData, setProposalData] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        getAllProposal()
    }, []);

    const getAllProposal = async () => {
        const url = `${process.env.DIGITALOCEAN}/invoice/get-proposals-all/`;
        const proposalSearchData = await getAxios(url);
        const arrData = proposalSearchData?.map((item) => ({
            value: item.id,
            label: `${item?.proposalNo} | ${Number(item?.proposalTotal).toFixed(2)} ${projectCurrency}`,
        }));
        setProposalData(arrData);
    };

    const searchProposal = async (value) => {
        const url = `${process.env.DIGITALOCEAN}/search/proposal/?search=${value}`;
        const proposalSearchData = await getAxios(url);
        const arrData = proposalSearchData?.map((item) => ({
            value: item.id,
            label: `${item?.proposalNo} | ${Number(item?.proposalTotal).toFixed(2)} ${projectCurrency}`,
        }));
        setProposalData(arrData);
    };

    const onFinish = async (data) => {
        setIsLoading(true)
        const url = `${process.env.DIGITALOCEAN}/project/proposal-project/${projectId}/`;

        await postAxios(url, data, true, true);
        getProjectProposals()
        getProjectDetails()
        setIsLoading(false)
    }

    return (
        <>
            {open1 ? (
                <div>
                    <button
                        onClick={() => {
                            setOpen1(false);
                        }}
                        className="flex gap-3 items-center mb-5 bg-foreignBackground hover:bg-mainBackground text-white px-2 py-1 -lg"
                    >
                        <ArrowLeftOutlined />
                        Back to proposal selection
                    </button>
                    <ProposalForm
                        setReload={() => { }}
                        getAllProposals={getAllProposal}
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
                            label="Proposal Status"
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
                                    { label: "Accepted", value: "Accepted" },
                                    { label: "Rejected", value: "Rejected" },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Link to existing proposal"
                            name="proposal"
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
                                        form.setFieldValue("proposal", e);
                                    }}
                                    allowClear={true}
                                    filterOption={false}
                                    onSearch={searchProposal}
                                    options={proposalData}
                                />
                                <button
                                    className="p-[0.75rem] flex rounded-lg items-center bg-foreignBackground hover:bg-mainBackground text-white"
                                    onClick={() => {
                                        setOpen1(true)
                                    }}
                                    title="Create new proposal"
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