import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Upload } from 'antd';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { getAxios, patchAxios, postAxios } from '@/functions/ApiCalls';
import FormButtons from '../ANTD/FormButtons';


export default function Profile() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [userData, setUserData] = useState()
    const [userCreateDate, setUserCreateDate] = useState()
    let initialPicList = []


    useEffect(() => {
        getUserInitialData()

    }, [])

    const getUserInitialData = async () => {
        const url = `${process.env.DIGITALOCEAN}/account/get-profile/`
        let data = await getAxios(url)
        if (data) {
            data.dob = data?.dob ? dayjs(new Date(data?.dob)) : dayjs("2000-01-01");
            data.pfp = data?.pfp?.split("?")[0]
            if (initialPicList.length < 1) {
                initialPicList.push({
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: data?.pfp,
                })
            }
            setUserCreateDate(moment.utc(data?.createdAt[0]?.date_joined).local().format('MMMM DD, YYYY, h:mm A'))
            form.setFieldsValue(data)
            setUserData(data)
        }
    }


    const onFinish = async (data) => {
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('bio', data.bio);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('dob', moment(new Date(data?.dob)).format('YYYY-MM-DD'))
        formData.append('position', data.position);
        if (data.pfp && data.pfp.file) {
            formData.append('pfp', data.pfp.file.originFileObj);
        }
        const url = `${process.env.DIGITALOCEAN}/account/user-profile/${userData.id}`
        await patchAxios(url, formData, true, true, () => { })
    }

    const onFinishPassword = async (data) => {
        const url = `${process.env.DIGITALOCEAN}/account/update-password/`
        await postAxios(url, data, true, true, () => { })
    }

    return (
        <div className='text-textIcons'>
            <h1 className='text-2xl font-bold text-maincl'>Profile</h1>
            <Form
                onFinish={onFinish}
                layout="vertical"
                style={{
                    alignContent: "center",
                    // maxWidth: 600,
                }}
                className="custom-form  desktop:max-w-[600px]"
                form={form}
            >
                <Form.Item label="Profile picture" className='mt-4' name={"pfp"}>
                    <Upload
                        listType="picture-circle"
                        maxCount={1}
                        defaultFileList={initialPicList}
                    >
                        <div>
                            <PlusOutlined className='text-textIcons' />
                            <div
                                className='text-textIcons'
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <div className='flex gap-x-5 w-full'>
                    <Form.Item label="First name" name="firstName" className='w-full'>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label="Last name" name="lastName" className='w-full'>
                        <Input className='rounded' />
                    </Form.Item>
                </div>
                <Form.Item label="Bio" name="bio" className='w-full' >
                    <Input.TextArea rows={3} className='rounded' />
                </Form.Item>
                <div className='flex gap-x-5 w-full'>
                    <Form.Item label="Phone number" name="phoneNumber" className='w-full'>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label="Date of birth" className='w-full' name="dob">
                        <DatePicker
                            className='rounded w-full custom-date-picker'
                            placeholder=''
                            popupClassName='custom-date-picker'
                            getPopupContainer={(trigger) => {
                                const parent = trigger.parentElement;
                                parent.classList.add("custom-date-picker");
                                return parent;
                            }}
                        />
                    </Form.Item>
                </div>
                <Form.Item label="Position" name="position" className='w-full'>
                    <Input className='rounded' disabled />
                </Form.Item>
                <p className='text-textIcons'>This account was created on {userCreateDate}</p>
                <Divider />
                <div className='flex gap-x-5 w-full justify-end'>
                    <Form.Item>
                        <FormButtons content="Save" />
                    </Form.Item>
                </div>
            </Form>
            <Divider />
            <h1 className='text-2xl font-bold text-maincl'>Login Credentials</h1>
            <Form
                onFinish={onFinishPassword}
                layout="vertical"
                style={{
                    alignContent: "center",
                    // maxWidth: 600,
                }}
                className="custom-form desktop:max-w-[600px]"
                form={passwordForm}
            >
                <Form.Item label="New password" name="password" className='w-full mt-4'>
                    <Input type='password' className='rounded' />
                </Form.Item>
                <Form.Item label="Confirm password" name="password2" className='w-full'>
                    <Input type='password' className='rounded' />
                </Form.Item>
                <Divider />
                <div className='flex gap-x-5 w-full justify-end'>
                    <Form.Item>
                        <FormButtons content="Save" />
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};