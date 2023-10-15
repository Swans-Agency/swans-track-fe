import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import WeekDays from './WeekDays';
import FormButtons from '../ANTD/FormButtons';
import { getAxios, postAxios } from '@/functions/ApiCalls';
import { NotificationError } from '@/functions/Notifications';
import { LoadingOutlined } from '@ant-design/icons';


export default function SchedSettingsForm() {
    const [form] = Form.useForm();
    const [initialData, setInitialData] = useState({});
    const [initialFormData, setInitialFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const weekDays = [
        { shortName: "MON", fullName: "Monday" },
        { shortName: "TUE", fullName: "Tuesday" },
        { shortName: "WED", fullName: "Wednesday" },
        { shortName: "THU", fullName: "Thursday" },
        { shortName: "FRI", fullName: "Friday" },
        { shortName: "SAT", fullName: "Saturday" },
        { shortName: "SUN", fullName: "Sunday" },
    ]

    const monthsBooking = [
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
    ]

    const meetingDuration = [
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
    ]

    const breakDuration = [
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
        // const url = `${process.env.DIGITALOCEAN}/calendy/sched/`
        const url = `${process.env.DIGITALOCEAN}/calendy/sched/settings/`
        let res = await getAxios(url, false, false)
        setInitialData(res?.settings)
        form.setFieldsValue(res?.settings)
    }

    const validateTimes = async (schedule) => {
        for (const day in schedule) {
            console.log(day, schedule[day])
            if (schedule.hasOwnProperty(day)) {
                const daySchedule = schedule[day].schedule;
                const dayCheck = schedule[day].check;
                if (dayCheck) {
                    if (daySchedule.length > 1) {
                        for (let i = 1; i < daySchedule.length; i++) {
                            const previousSchedule = daySchedule[i - 1][day];
                            const currentSchedule = daySchedule[i][day];

                            const previousEnd = parseFloat(previousSchedule.end); // smallest
                            const previousStart = parseFloat(previousSchedule.start); // bigger

                            const currentStart = parseFloat(currentSchedule.start); // biggest
                            const currentEnd = parseFloat(currentSchedule.end); // the biggest one

                            if (previousEnd < previousStart || currentEnd < currentStart || previousEnd > currentStart) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true
    }
    7
    const onFinish = async (data) => {
        setIsLoading(true)
        console.log(data.weeklySchedule)
        let isValed = await validateTimes(data.weeklySchedule)
        if (!isValed) {
            NotificationError("Invalid schedule")
        } else {
            // const url = `${process.env.DIGITALOCEAN}/calendy/sched/`
            const url = `${process.env.DIGITALOCEAN}/calendy/sched/settings/`
            let res = await postAxios(url, data, true, true)
            if (res) {
                getInitialData()
            }
        }
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
            form={form}
            initialValues={initialData}
        >
            <Form.Item label={<div>
                <p>Date range</p>
                <p>Invitees can schedule...</p>
            </div>} name="dateRange" className="w-full">
                <Select
                    options={monthsBooking}
                    size='large'
                    placeholder="Invitees can schedule a meeting in the next..."
                />
            </Form.Item>
            <Form.Item label="Duration" name="duration" className="w-full">
                <Select
                    options={meetingDuration}
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
                                form={form}
                            />
                        )
                    })
                }
            </Form.Item>
            <Form.Item label="Want to add break after your events?" name="breakDuration" className="w-full">
                <Select
                    options={breakDuration}
                    size='large'
                    placeholder="Want to add break after your events?"
                />
            </Form.Item>
            <div className="flex gap-x-5 w-full justify-end">
                <Form.Item>
                    <FormButtons content="Save" isLoading={isLoading} />
                </Form.Item>
            </div>
        </Form>
    );
};