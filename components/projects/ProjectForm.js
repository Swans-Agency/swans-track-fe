import React, { useEffect } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import FormButtons from "../ANTD/FormButtons";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import { jobStatus } from "@/functions/GeneralFunctions";

export default function ProjectForm({ setReload, onClose }) {
    const [clientData, setClientData] = React.useState([]);
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

        const url = `${process.env.DIGITALOCEAN}/project/create-project/`;
        let res = await postAxios(url, data, true, true);
        form.resetFields();
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
                    <Input className="rounded" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]} label="Client" name="client" className="w-full">
                    <Select
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
                <Input.TextArea maxLength={255} className="rounded" autoSize={{
                    minRows: 3,
                    maxRows: 3,
                }} />
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
                        style={{ width: "100%", }}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={jobStatus}
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
                        style={{ width: "100%", }}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            { label: "Web Development and Design", value: "Web Development and Design" },
                            { label: "Writing and Content", value: "Writing and Content" },
                            { label: "Digital Marketing", value: "Digital Marketing" },
                            { label: "Data Entry and Virtual Assistance", value: "Data Entry and Virtual Assistance" },
                            { label: "Translation and Language Services", value: "Translation and Language Services" },
                            { label: "IT and Software", value: "IT and Software" },
                            { label: "Sales and Marketing", value: "Sales and Marketing" },
                            { label: "Video and Animation", value: "Video and Animation" },
                            { label: "Customer Support and Service", value: "Customer Support and Service" },
                            { label: "Consulting and Business Services", value: "Consulting and Business Services" },
                            { label: "Engineering and Architecture", value: "Engineering and Architecture" },
                            { label: "E-commerce", value: "E-commerce" },
                            { label: "Video and Audio Services", value: "Video and Audio Services" },
                            { label: "Marketing and Sales", value: "Marketing and Sales" },
                            { label: "Education and Training", value: "Education and Training" },
                            { label: "Healthcare and Medical Services", value: "Healthcare and Medical Services" },
                            { label: "Legal Services", value: "Legal Services" },
                            { label: "Accounting and Finance", value: "Accounting and Finance" },
                            { label: "Photography and Videography", value: "Photography and Videography" },
                            { label: "Gaming", value: "Gaming" },
                            { label: "Art and Illustration", value: "Art and Illustration" },
                            { label: "Travel and Lifestyle", value: "Travel and Lifestyle" },
                            { label: "Science and Research", value: "Science and Research" },
                            { label: "Manufacturing and Product Design", value: "Manufacturing and Product Design" },
                            { label: "Human Resources", value: "Human Resources" },
                            { label: "Real Estate", value: "Real Estate" },
                            { label: "Blockchain and Cryptocurrency", value: "Blockchain and Cryptocurrency" },
                            { label: "Food and Culinary", value: "Food and Culinary" },
                            { label: "Environmental and Sustainability", value: "Environmental and Sustainability" },
                            { label: "Nonprofit and Social Services", value: "Nonprofit and Social Services" }
                        ]}
                    />
                </Form.Item>
            </div>
            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]}>
                    <FormButtons content="Save" />
                </Form.Item>
            </div>
        </Form>
    );
}
