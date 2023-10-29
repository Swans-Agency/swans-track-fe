import { Checkbox, Form, Select, TimePicker } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import InnerFormItem from './InnerFormItem';
import cookie from "react-cookies";

export default function WeekDays({ day, fullDay, classStyle, form }) {
    const [checked, setChecked] = useState(false);
    const [countfields, setCountFields] = useState(1);
    const [errorTime, setErrorTime] = useState(false);
    const [timeOptions, setTimeOptions] = useState([
        { value: "0.00", label: "00:00" },
        { value: "0.15", label: "00:15" },
        { value: "0.30", label: "00:30" },
        { value: "0.45", label: "00:45" },
        { value: "1.00", label: "01:00" },
        { value: "1.15", label: "01:15" },
        { value: "1.30", label: "01:30" },
        { value: "1.45", label: "01:45" },
        { value: "2.00", label: "02:00" },
        { value: "2.15", label: "02:15" },
        { value: "2.30", label: "02:30" },
        { value: "2.45", label: "02:45" },
        { value: "3.00", label: "03:00" },
        { value: "3.15", label: "03:15" },
        { value: "3.30", label: "03:30" },
        { value: "3.45", label: "03:45" },
        { value: "4.00", label: "04:00" },
        { value: "4.15", label: "04:15" },
        { value: "4.30", label: "04:30" },
        { value: "4.45", label: "04:45" },
        { value: "5.00", label: "05:00" },
        { value: "5.15", label: "05:15" },
        { value: "5.30", label: "05:30" },
        { value: "5.45", label: "05:45" },
        { value: "6.00", label: "06:00" },
        { value: "6.15", label: "06:15" },
        { value: "6.30", label: "06:30" },
        { value: "6.45", label: "06:45" },
        { value: "7.00", label: "07:00" },
        { value: "7.15", label: "07:15" },
        { value: "7.30", label: "07:30" },
        { value: "7.45", label: "07:45" },
        { value: "8.00", label: "08:00" },
        { value: "8.15", label: "08:15" },
        { value: "8.30", label: "08:30" },
        { value: "8.45", label: "08:45" },
        { value: "9.00", label: "09:00" },
        { value: "9.15", label: "09:15" },
        { value: "9.30", label: "09:30" },
        { value: "9.45", label: "09:45" },
        { value: "10.00", label: "10:00" },
        { value: "10.15", label: "10:15" },
        { value: "10.30", label: "10:30" },
        { value: "10.45", label: "10:45" },
        { value: "11.00", label: "11:00" },
        { value: "11.15", label: "11:15" },
        { value: "11.30", label: "11:30" },
        { value: "11.45", label: "11:45" },
        { value: "12.00", label: "12:00" },
        { value: "12.15", label: "12:15" },
        { value: "12.30", label: "12:30" },
        { value: "12.45", label: "12:45" },
        { value: "13.00", label: "13:00" },
        { value: "13.15", label: "13:15" },
        { value: "13.30", label: "13:30" },
        { value: "13.45", label: "13:45" },
        { value: "14.00", label: "14:00" },
        { value: "14.15", label: "14:15" },
        { value: "14.30", label: "14:30" },
        { value: "14.45", label: "14:45" },
        { value: "15.00", label: "15:00" },
        { value: "15.15", label: "15:15" },
        { value: "15.30", label: "15:30" },
        { value: "15.45", label: "15:45" },
        { value: "16.00", label: "16:00" },
        { value: "16.15", label: "16:15" },
        { value: "16.30", label: "16:30" },
        { value: "16.45", label: "16:45" },
        { value: "17.00", label: "17:00" },
        { value: "17.15", label: "17:15" },
        { value: "17.30", label: "17:30" },
        { value: "17.45", label: "17:45" },
        { value: "18.00", label: "18:00" },
        { value: "18.15", label: "18:15" },
        { value: "18.30", label: "18:30" },
        { value: "18.45", label: "18:45" },
        { value: "19.00", label: "19:00" },
        { value: "19.15", label: "19:15" },
        { value: "19.30", label: "19:30" },
        { value: "19.45", label: "19:45" },
        { value: "20.00", label: "20:00" },
        { value: "20.15", label: "20:15" },
        { value: "20.30", label: "20:30" },
        { value: "20.45", label: "20:45" },
        { value: "21.00", label: "21:00" },
        { value: "21.15", label: "21:15" },
        { value: "21.30", label: "21:30" },
        { value: "21.45", label: "21:45" },
        { value: "22.00", label: "22:00" },
        { value: "22.15", label: "22:15" },
        { value: "22.30", label: "22:30" },
        { value: "22.45", label: "22:45" },
        { value: "23.00", label: "23:00" },
        { value: "23.15", label: "23:15" },
        { value: "23.30", label: "23:30" },
        { value: "23.45", label: "23:45" },
    ]);
    const [times, setTimes] = useState([])



    const handleSelectTime = (value, type, key) => {



        let newArr = []
        form.getFieldValue(["weeklySchedule", fullDay, "schedule"])?.map((item) => {
            Object?.values(item)?.map((key) => {
                { key?.start && newArr.push(Number(key?.start)) }
                { key?.end && newArr.push(Number(key?.end)) }
            })
        })


        let index;
        if (type == "start") {
            index = key * 2
        } else {
            index = key * 2 + 1
        }

        if (index < 0 || index >= newArr.length) {
            return
        }

        for (let i = 0; i < index; i++) {
            if (newArr[i] >= value) {
                setErrorTime(true)
                return;
            }
        }
        for (let i = index + 1; i < newArr.length; i++) {
            if (newArr[i] <= value) {
                setErrorTime(true)
                return;
            }
        }
        setErrorTime(false)

    }


    const onChange = (e) => {
        ;
        setChecked(e.target.checked);
    };

    const handleDelete = (remove, field, value) => {
        remove(field.name)
        setCountFields(countfields - 1)
        times.splice(value * 2, 2)
        setTimes(times)
    }

    const handleAdd = (add) => {
        add()
        setCountFields(countfields + 1)
    }

    useEffect(() => {
        setChecked(form.getFieldValue(["weeklySchedule", fullDay, "check"]))
    }, [fullDay, checked])

    return (
        <div className={`grid tablet:grid-cols-4 phone:grid-cols-1 justify-start items-center py-3 ${classStyle}`}>
            <Form.Item
                name={["weeklySchedule", fullDay, "check"]}
                valuePropName="checked"
                className='col-span-1 !m-0'
            >
                <Checkbox onChange={onChange}>
                    {day}
                </Checkbox>
            </Form.Item>
            <div className='col-span-3'>

                {form.getFieldValue(["weeklySchedule", fullDay, "check"]) ?
                    <Form.List name={["weeklySchedule", fullDay, "schedule"]} className=' !m-0'>
                        {(fields, { add, remove }) => (
                            <div className='grid tablet:grid-cols-3 phone:grid-cols-4 gap-8 '>
                                {setCountFields(fields.length)}
                                {countfields ? <div className='tablet:col-span-2 phone:col-span-3'>
                                    {fields?.map((field, key) => (
                                        <InnerFormItem
                                            key={key}
                                            field={field}
                                            remove={remove}
                                            handleDelete={handleDelete}
                                            fullDay={fullDay}
                                            timeOptions={timeOptions}
                                            handleSelectTime={handleSelectTime}
                                            errorTime={errorTime}
                                        />
                                    ))}
                                </div> : ""}
                                <div className='col-span-1 m-auto'>
                                    <PlusOutlined className='text-lg' onClick={() => {
                                        handleAdd(add)
                                    }} />
                                </div>
                            </div>
                        )}
                    </Form.List>
                    : <div className='text-gray-400 col-span-3'>Unavailable</div>}
            </div>
        </div>
    );
};