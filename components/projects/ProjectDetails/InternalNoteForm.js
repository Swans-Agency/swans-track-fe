import React, { useEffect } from "react";
import { Form, Input} from "antd";
import { postAxios } from "@/functions/ApiCalls";
import FormButtons from "@/components/ANTD/FormButtons";
import axios from "axios";

export default function InternalNoteForm({ projectId, getInternalNotes, handleCloseModal, path="internal-notes-project" }) {
    const [form] = Form.useForm();


    const onFinish = async (data) => {

        const url = `${process.env.DIGITALOCEAN}/project/${path}/${projectId}/`;
        if (path === "internal-notes-project"){
            let res = await postAxios(url, data, true, true);
        } else {
            let res = await axios.post(url, data)
        }
        form.resetFields();
        getInternalNotes();
        handleCloseModal();

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
                <Input.TextArea className="rounded" rows={4} maxLength={1000} />
            </Form.Item>

            <div className="flex gap-x-5 w-full justify-start mt-0">
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
