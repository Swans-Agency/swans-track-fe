import React, { useEffect, useState } from "react";
import { Form, Input} from "antd";
import { postAxios } from "@/functions/ApiCalls";
import FormButtons from "@/components/ANTD/FormButtons";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

export default function InternalNoteForm({ projectId, getInternalNotes, handleCloseModal, path="internal-notes-project" }) {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);


    const onFinish = async (data) => {
        setIsLoading(true)
        const url = `${process.env.DIGITALOCEAN}/project/${path}/${projectId}/`;
        if (path === "internal-notes-project"){
            let res = await postAxios(url, data, true, true);
        } else {
            let res = await axios.post(url, data)
        }
        form.resetFields();
        getInternalNotes();
        handleCloseModal();
        setIsLoading(false)
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
            <Form.Item
            
                rules={[
                    {
                        required: true
                    }
                ]} label="" name="jobNote" className="w-full mb-3">
                <Input.TextArea className="rounded-lg" rows={4} maxLength={1000} />
            </Form.Item>

            <div className="flex gap-x-5 w-full justify-end mt-0">
                <Form.Item>
                    <FormButtons content="Save" isLoading={isLoading} />
                </Form.Item> 
            </div>
        </Form>
    );
}
