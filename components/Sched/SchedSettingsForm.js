import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import WeekDays from './WeekDays';
import FormButtons from '../ANTD/FormButtons';
import { getAxios, postAxios } from '@/functions/ApiCalls';


export default function SchedSettingsForm() {
    const [form] = Form.useForm();
    const [disableSave, setDisableSave] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [initialFormData, setInitialFormData] = useState({})

    const weekDays = [
        { shortName: "MON", fullName: "Monday" },
        { shortName: "TUE", fullName: "Tuesday" },
        { shortName: "WED", fullName: "Wednesday" },
        { shortName: "THU", fullName: "Thursday" },
        { shortName: "FRI", fullName: "Friday" },
        { shortName: "SAT", fullName: "Saturday" },
        { shortName: "SUN", fullName: "Sunday" },
    ]

    useEffect(() => {
        getInitialData()
    }, []);

    useEffect(() => {
        console.log({ initialData })
        let weekData = {}
        initialData?.roznamiDaya?.map((day) => {
            weekData[day?.day] = {
                check: day?.available,
                schedule: day?.dayScheduleRange?.map((range) => {
                    let dayName = {}
                    dayName[day?.day] = {
                        start: parseFloat(range?.fromHour).toFixed(2),
                        end: parseFloat(range?.toHour).toFixed(2)
                    }
                    return (
                        dayName
                    )
                })
            }
        })
        form.setFieldsValue({
            dateRange: initialData?.dateRange,
            duration: parseFloat(initialData?.duration) || initialData?.duration,
            breakDuration: parseFloat(initialData?.breakDuration) || initialData?.breakDuration,
            weeklySchedule: weekData,
        })
        setInitialFormData({
            dateRange: initialData?.dateRange,
            duration: parseFloat(initialData?.duration),
            breakDuration: parseFloat(initialData?.breakDuration),
            weeklySchedule: weekData,
        })
    }, [initialData]);

    const getInitialData = async () => {
        const url = `${process.env.DIGITALOCEAN}/calendy/sched/`
        let res = await getAxios(url, false, false)
        setInitialData(res)
    }

    const onFinish = async (data) => {
        console.log({ data })
        const url = `${process.env.DIGITALOCEAN}/calendy/sched/`
        let res = await postAxios(url, data, true, true)

        if (res) {
            getInitialData()
        }
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
            initialValues={initialData}
        >
            <Form.Item label={<div>
                <p>Date range</p>
                <p>Invitees can schedule...</p>
            </div>} name="dateRange" className="w-full">
                <Select
                    options={[
                        {
                            value: "this month",
                            label: "Only this current month",
                        },
                        {
                            value: "one month",
                            label: "One month ahead",
                        },
                        {
                            value: "three months",
                            label: "Three months ahead",
                        },
                    ]}
                    size='large'
                    placeholder="Invitees can schedule a meeting in the next..."
                />
            </Form.Item>
            <Form.Item label="Duration" name="duration" className="w-full">
                <Select
                    options={[
                        {
                            value: 0.15,
                            label: "15 min",
                        },
                        {
                            value: 0.30,
                            label: "30 min",
                        },
                        {
                            value: 0.45,
                            label: "45 min",
                        },
                        {
                            value: 1,
                            label: "60 min",
                        },
                    ]}
                    size='large'
                    placeholder="Your meetings generally last..."
                />
            </Form.Item>
            <Form.Item label="Set your weekly hours" name={["weeklySchedule"]} className="w-full">
                {
                    weekDays?.map((day, index) => {
                        return (
                            <WeekDays
                                key={index}
                                day={day?.shortName}
                                fullDay={day?.fullName}
                                classStyle={`py-5 ${index % 2 !== 0 ? "border-b bg-gray-50" : "border-b "}`}
                                setDisableSave={setDisableSave}
                                form={form}
                            />
                        )
                    })
                }
            </Form.Item>
            <Form.Item label="Want to add break after your events?" name="breakDuration" className="w-full">
                <Select
                    options={[
                        {
                            value: "0",
                            label: "No breaks",
                        },
                        {
                            value: 0.15,
                            label: "15 min",
                        },
                        {
                            value: 0.3,
                            label: "30 min",
                        },
                        {
                            value: 0.45,
                            label: "45 min",
                        },
                        {
                            value: 1,
                            label: "60 min",
                        },
                    ]}
                    size='large'
                    placeholder="Want to add break after your events?"
                />
            </Form.Item>
            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item>
                    <FormButtons content="Save" disable={disableSave} />
                </Form.Item>
            </div>
        </Form>
    );
};