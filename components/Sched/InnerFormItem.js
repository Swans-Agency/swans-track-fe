import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";


export default function InnerFormItem({ field, remove, handleDelete, fullDay, timeOptions, handleSelectTime, errorTime }) {

    return (
        <>
            <div className='flex gap-5' key={field.key}>
                <div className='flex gap-x-2'>
                    <Form.Item
                        {...field}
                        name={[field.name, fullDay, "start"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        validateStatus={errorTime ? 'error' : ''}
                        help={errorTime ? <p className='absolute min-w-max'>Error in time range</p> : ''}
                        className='w-[85px]'
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
                            },
                        ]}
                        validateStatus={errorTime ? 'error' : ''}
                        className='w-[85px]'
                    >
                        <Select

                            options={timeOptions}
                            size='large'
                            onChange={(value) => handleSelectTime(value, 'end', field.key)}
                        />
                    </Form.Item>
                </div>
                <div>
                    <DeleteOutlined className='text-lg' onClick={() => {
                        handleDelete(remove, field, field.key)
                    }} />
                </div>
            </div>
        </>
    );
};