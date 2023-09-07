import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { postAxios } from "@/functions/ApiCalls";
import FormButtons from "@/components/ANTD/FormButtons";

export default function ProjectTodoForm({ projectId, getProjectTodos, handleCloseModal }) {
    const [form] = Form.useForm();


    const onFinish = async (data) => {
        const url = `${process.env.DIGITALOCEAN}/project/todo-project/${projectId}/`;
        let res = await postAxios(url, data, true, true);
        form.resetFields();
        getProjectTodos();
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
                ]} label="" name="todo" className="w-full mb-3">
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
