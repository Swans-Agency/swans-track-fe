import { patchAxios, postAxios } from '@/functions/ApiCalls';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';


export default function NewEventForm({ getEvents, handleClose, instance, setSelectedEvent, clickedDate }) {
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;

    useEffect(() => {
        if (instance) {
            form.setFieldsValue({
                eventTime: [dayjs(instance?.start), dayjs(instance?.end)],
                title: instance?.title,
                location: instance?.location,
                discription: instance?.discription
            })
        }
    }, [instance])

    useEffect(() => {
        if (clickedDate) {
            form.setFieldsValue({eventTime: [dayjs(clickedDate), dayjs(clickedDate).add(1, 'hour')],})
        }
    }, [clickedDate])

    const onFinish = async (values) => {
        console.log({ values })
        let data = {}
        data.title = values.title
        data.location = values.location
        data.discription = values.discription
        data.start = values.eventTime[0].format('YYYY-MM-DDTHH:mmZ')
        data.end = values.eventTime[1].format('YYYY-MM-DDTHH:mmZ')

        if (instance) {
            let url = `${process.env.DIGITALOCEAN}/calendar/update/${instance?.id}/`
            await patchAxios(url, data, true, true, () => { getEvents(); handleClose() })

        } else {
            let url = `${process.env.DIGITALOCEAN}/calendar/`
            await postAxios(url, data, true, true, () => { getEvents(); handleClose() })
        }
        setSelectedEvent(null)
        form.resetFields()
    }
    
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
            <div className="flex gap-x-5 w-full mt-0">
                <Form.Item
                    label="Event name"
                    name="title"
                    className="w-full"
                >
                    <Input size="large" className="rounded-lg w-full" />
                </Form.Item>
                <Form.Item label="Event Location" name="location" className="w-full">
                    <Input size="large" className="rounded-lg w-full" />
                </Form.Item>
            </div>
            <Form.Item
                label="Event description"
                name="discription"
                className="w-full"
            >
                <Input.TextArea className="rounded-lg w-full" rows={4} />
            </Form.Item>

            <Form.Item
                label="Event Time"
                name="eventTime"
                className="w-full"
            >
                <RangePicker
                    size="large"
                    className='w-full'
                    showTime={{
                        format: 'HH:mm',
                        minuteStep: 5,
                    }}
                />
            </Form.Item>
            <Divider />
            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item>
                    <button
                        htmlType="submit"
                        type="primary"
                        className="bg-mainBackground hover:bg-foreignBackground text-textButtons rounded py-[0.5rem] px-4 "
                    >
                        {instance ? "Edit" : "Create"}
                    </button>
                </Form.Item>
            </div>
        </Form>

    );
};