import { Form, Input, Modal } from 'antd';
import React from 'react';
import FormButtons from '../ANTD/FormButtons';


export default function Feedback({ isModalOpen, handleOk, handleCancel, form, onFinish }) {
    return (
        <Modal
            title="Help us grow and improve?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <p className="mb-6">
                Hey, hope you are enjoying Swan Track so far as we enjoy you being a
                part of the Swans. Your feedback is important for us !
            </p>
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
                <div className="flex gap-x-5 w-full mt-0">
                    <Form.Item label="" name="testimonial" className="w-full" required>
                        <Input.TextArea rows={4} className="rounded" />
                    </Form.Item>
                </div>
                <div className="flex gap-x-5 w-full justify-end">
                    <Form.Item>
                        <FormButtons content="Save" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};