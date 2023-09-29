import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload } from "antd";
import { postAxios } from "@/functions/ApiCalls";
import FormButtons from "@/components/ANTD/FormButtons";
import { NotificationError } from "@/functions/Notifications";


export default function AdditionalDocsForm({ projectId, getProjectAdditionalDocs, handleCloseModal }) {
    const [form] = Form.useForm();



    const onFinish = async (data) => {

        const formData = new FormData();
        formData.append("docName", data?.docName);

        if (data.doc) {
            data?.doc?.fileList?.forEach((item) => {
                if (item.originFileObj) {
                    formData.append("doc", item.originFileObj);
                }
            })
        }

        const url = `${process.env.DIGITALOCEAN}/project/additional-docs-project/${projectId}/`;
        let res = await postAxios(url, formData, true, true, () => { });
        form.resetFields();
        getProjectAdditionalDocs()
        handleCloseModal()
    };
    const checkFileSize = (file) => {
        const maxSize = 1024 * 1024; // 1MB in bytes
        if (file.size > maxSize) {
            NotificationError("File size must be less than 1MB");
            // message.error('File size must be less than 1MB');
            return false; // Prevent upload
        }
        return true; // Allow upload
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
            requiredMark={true}
        >
            <Form.Item
                required
                rules={[
                    {
                        required: true,
                        message: "Please upload document(s)",
                    },
                ]}
                label="Document(s)" className="" name={"doc"}>
                <Upload listType="picture-card" multiple accept="*/*" beforeUpload={checkFileSize}>
                    <div>
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            Upload
                        </div>
                    </div>
                </Upload>
            </Form.Item>

            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item>
                    <FormButtons content="Save" />
                </Form.Item>
            </div>
        </Form>
    );
}
