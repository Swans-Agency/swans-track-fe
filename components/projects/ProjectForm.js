import React, { useEffect } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import FormButtons from "../ANTD/FormButtons";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import { jobCat, jobStatus, jobStatusNotColored } from "@/functions/GeneralFunctions";

export default function ProjectForm({ setReload, onClose }) {
    const [clientData, setClientData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        searchClient()
    }, []);

    const searchClient = async () => {
        const url = `${process.env.DIGITALOCEAN}/client/get-clients/`;
        const clientSearchData = await getAxios(url);
        const arrData = clientSearchData?.map((item) => ({
            value: item.id,
            label: `${item.firstName} ${item.lastName}`,
        }));
        setClientData(arrData);
    };

    const onFinish = async (data) => {
        setIsLoading(true)
        const url = `${process.env.DIGITALOCEAN}/project/create-project/`;
        let res = await postAxios(url, data, true, true);
        form.resetFields();
        setIsLoading(false)
        setReload(res)
        onClose()
    };

    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
            style={{
                alignContent: "center",
                maxWidth: 600,
            }}
            className="custom-form"
            form={form}
        >
            <div className="flex gap-x-5 w-full">
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]} label="Project Name" name="projectName" className="w-full">
                    <Input size="large" className="rounded-lg" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]} label="Client" name="client" className="w-full">
                    <Select
                        size="large"
                        options={clientData}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    />
                </Form.Item>
            </div>

            <Form.Item
                rules={[
                    {
                        required: true
                    }
                ]} label="Project Summary" name="summary" className="w-full">
                <Input.TextArea maxLength={255} className="rounded-lg" rows={4} />
            </Form.Item>
            <div className="flex gap-x-5 w-full">
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    label="Status"
                    name="status"
                    className="w-full"
                >
                    <Select
                        size="large"
                        style={{ width: "100%", }}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={jobStatusNotColored}
                    />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    label="Category"
                    name="category"
                    className="w-full"
                >
                    <Select
                        size="large"
                        style={{ width: "100%", }}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={jobCat}
                    />
                </Form.Item>
            </div>
            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item>
                    <FormButtons content="Save" isLoading={isLoading} />
                </Form.Item>
            </div>
        </Form>
    );
}
