import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";


export default function InnerFormItem({ field, remove, handleDelete, fullDay, timeOptions, handleSelectTime, errorTime }) {

    return (
        <div className='flex gap-5 !m-0' key={field.key}>
            <div className='flex gap-x-2'>
                <Form.Item
                    {...field}
                    name={[field.name, fullDay, "start"]}
                    rules={[
                        {
                            required: true,
                            message: 'Missing start time',
                        },
                    ]}
                    validateStatus={errorTime ? 'error' : ''}
                    help={errorTime ? <p className='absolute min-w-max'>Error in time range</p> : ''}
                    className='w-[100%] min-w-[90px] !m-0 !mb-2'
                    >
                    <Select
                        options={timeOptions}
                        size='large'
                        onChange={(value) => handleSelectTime(value, 'start', field.key)}
                        />
                </Form.Item>
                <p>_</p>
                <Form.Item
                    {...field}
                    name={[field.name, fullDay, "end"]}
                    rules={[
                        {
                            required: true,
                            message: 'Missing end time',
                        },
                    ]}
                    validateStatus={errorTime ? 'error' : ''}
                    className='w-[100%] min-w-[90px] !m-0  !mb-2'
                >
                    <Select
                        options={timeOptions}
                        size='large'
                        onChange={(value) => handleSelectTime(value, 'end', field.key)}
                    />
                </Form.Item>
            </div>
            <div className='m-auto'>
                <DeleteOutlined className='text-lg' onClick={() => {
                    handleDelete(remove, field, field.key)
                }} />
            </div>
        </div>
    );
};