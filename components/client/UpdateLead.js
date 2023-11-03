import { patchAxios } from "@/functions/ApiCalls";
import { Form, Input, Modal, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import FormButtons from "../ANTD/FormButtons";
import { LoadingOutlined } from "@ant-design/icons";
import CustomEditor from "../Tiny/Editor";
import SunEditorComponent from "../WYSWUG/SunEditorComponent";

export default function UpdateModal({
    updateClient,
    setReload,
    handleOk
}) {
    const [clientId, setClientId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        updateClient["createdAt"] = dayjs(new Date(updateClient["createdAt"]));
        form.setFieldsValue(updateClient);
        setClientId(updateClient["id"]);
    }, []);

    const onFinish = async (data) => {
        setIsLoading(true);
        // data["createdAt"] = moment(new Date(data["createdAt"])).format(
            // "YYYY-MM-DD"
        // );
        const url = `${process.env.DIGITALOCEAN}/client/edit-lead/${clientId}/`;
        let res = await patchAxios(url, data, true, true);
        setReload(res);
        handleOk()
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
                    tooltip="Category of the lead, will be displayed in the dashboard charts and analytics."
                    rules={[
                        {
                            required: true
                        }
                    ]} label="Referral Source" name="referralSource" className="w-full"  >
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
                {/* <CustomEditor form={form} fieldName="description" /> */}
                <SunEditorComponent
                    form={form}
                    fieldName="description"
                    defaultValue={form.getFieldValue("description")}
                />
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        required: true
                    }
                ]}
                tooltip="To weather determine if the form is active to receive new leads or not."
                label="Status"
                name="active"
                className="w-full"
            >
                <Select options={[{ value: "Active", label: "Active"}, {value: "Unactive", label: "Unactive" }]} size="large" className="rounded-lg" />
            </Form.Item>

            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item>
                    <FormButtons content="Save" isLoading={isLoading} />
                </Form.Item>
            </div>
        </Form>
    );
}
