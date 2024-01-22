import FormButtons from '@/components/ANTD/FormButtons';
import CustomEditor from '@/components/Tiny/Editor';
import SunEditorComponent from '@/components/WYSWUG/SunEditorComponent';
import { patchAxios, postAxios } from '@/functions/ApiCalls';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';


export default function NewEventForm({ getEvents, handleClose, instance, setSelectedEvent, clickedDate }) {
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;
    const [isLoading, setIsLoading] = useState(false);

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
        if (clickedDate && !instance) {
            form.setFieldsValue({
                eventTime: [dayjs(clickedDate), dayjs(clickedDate).add(1, 'hour')],
            })
        }
    }, [clickedDate])

    const onFinish = async (values) => {
        setIsLoading(true)

        let data = {}
        data.title = values?.title
        data.location = values?.location
        data.discription = values?.discription
        data.start = values?.eventTime[0]?.format('YYYY-MM-DDTHH:mm')
        data.end = values?.eventTime[1]?.format('YYYY-MM-DDTHH:mm')

        if (instance) {
            let url = `${process.env.DIGITALOCEAN}/calendar/update/${instance?.id}/`
            await patchAxios(url, data, true, true, () => { getEvents(); handleClose() })

        } else {
            let url = `${process.env.DIGITALOCEAN}/calendar/`
            await postAxios(url, data, true, true, () => { getEvents(); handleClose() })
        }
        setSelectedEvent(null)
        setIsLoading(false)
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
            requiredMark={false}
        >
            <Form.Item
                label="Event Name"
                name="title"
                className="w-full"
                required={true}
                rules={[
                    {
                        required: true,
                        message: 'Please input the event name!',
                    },
                ]}
            >
                <Input size="large" className="rounded-lg  w-full" />
            </Form.Item>
            <Form.Item label="Event Location" name="location" className="w-full">
                <Input size="large" className="rounded-lg w-full" />
            </Form.Item>
            <div className="flex gap-x-5 w-full mt-0">
            </div>
            <Form.Item
                label="Event Description"
                name="discription"
                className="w-full"
            >
                {/* <CustomEditor form={form} fieldName={"discription"} /> */}
                <SunEditorComponent
                    form={form}
                    fieldName="discription"
                    // defaultValue={form.getFieldValue("discription")}
                />
            </Form.Item>

            <Form.Item
                label="Event Time"
                name="eventTime"
                className="w-full"
                rules={[
                    {
                        required: true,
                        message: 'Please choose event time',
                    },
                ]}
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
                    <FormButtons content={instance ? "Edit" : "Create"} isLoading={isLoading} />
                </Form.Item>
            </div>
        </Form>

    );
};