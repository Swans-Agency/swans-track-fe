import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload } from "antd";
import { postAxios } from "@/functions/ApiCalls";
import FormButtons from "@/components/ANTD/FormButtons";
import { NotificationError } from "@/functions/Notifications";
import { useRouter } from "next/router";


export default function AdditionalDocsForm({ projectId, getProjectAdditionalDocs, handleCloseModal }) {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showUploadList, setShowUploadList] = useState(true);
    const router = useRouter()


    const onFinish = async (data) => {
        setIsLoading(true)
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
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        let res = await postAxios(url, formData, true, true, () => { }, pathname);
        form.resetFields();
        getProjectAdditionalDocs()
        handleCloseModal()
        setIsLoading(false)
    };
    const checkFileSize = (file) => {
        const maxSize = 1024 * 1024 * 20; // 1MB in bytes
        if (file.size > maxSize) {
            NotificationError("File size must be less than 20MB");
            setShowUploadList(false);
            // message.error('File size must be less than 1MB');
            form.setFieldValue("doc", null);
            return false; // Prevent upload
        }
        setShowUploadList(true);
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
                <Upload listType="picture-card" multiple accept="*/*" beforeUpload={checkFileSize} showUploadList={showUploadList} >
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
                    <FormButtons content="Save" isLoading={isLoading} />
                </Form.Item>
            </div>
        </Form>
    );
}
