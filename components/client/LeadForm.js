import React, { useState } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import FormButtons from "../ANTD/FormButtons";
import { postAxios } from "@/functions/ApiCalls";
import { LoadingOutlined } from "@ant-design/icons";
import CustomEditor from "../Tiny/Editor";
import SunEditorComponent from "../WYSWUG/SunEditorComponent";

export default function LeadForm({ setReload, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (data) => {
        setIsLoading(true);

        const url = `${process.env.DIGITALOCEAN}/client/get-leads/`;
        let res = await postAxios(url, data, true, true);
        form.resetFields()
        setReload(res)
        onClose()
        setIsLoading(false);
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
                    ]}
                    tooltip="This text will be the header of your form, and visible for potential clients when filling the form."
                    label="Title" name="title" className="w-full">
                    <Input size="large" className="rounded-lg" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]} label="Referral Source" name="referralSource" className="w-full">
                    <Input size="large" className="rounded-lg" />
                </Form.Item>
            </div>



            <Form.Item
                rules={[
                    {
                        required: true
                    }
                ]}
                tooltip="This text will be visible for potential clients when filling the form."
                label="Description"
                name="description"
                className="w-full"
            >
                <SunEditorComponent
                    form={form}
                    fieldName="description"
                    defaultValue={form.getFieldValue("description")}
                />
            </Form.Item>



            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item>
                    <FormButtons content="Save" isLoading={isLoading} />
                </Form.Item>
            </div>
        </Form>
    );
}
