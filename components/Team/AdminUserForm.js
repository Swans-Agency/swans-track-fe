import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Drawer, Form, Input, InputNumber, Modal, Upload } from 'antd';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { patchAxios } from '@/functions/ApiCalls';


export default function AdminUserForm({ isModalOpenUpdate, setIsModalOpenUpdate, updateItem, setUpdateItem, reloadData, setReloadData }) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [userData, setUserData] = useState()
    let initialPicList = []


    useEffect(() => {
        getUserInitialData()
    }, [reloadData])

    const getUserInitialData = () => {
        if (updateItem) {

            let initialData = {
                firstName: updateItem.userProfile.firstName,
                lastName: updateItem?.userProfile?.lastName,
                phoneNumber: updateItem?.userProfile?.phoneNumber,
                position: updateItem?.userProfile?.position,
                bio: updateItem?.userProfile?.bio,
                salary: updateItem?.userProfile?.salary,
                socialSecurityNumber: updateItem?.userProfile?.socialSecurityNumber,
                dob: updateItem?.userProfile?.dob ? dayjs(new Date(updateItem?.userProfile?.dob)) : dayjs("1998-01-01"),
                pfp: updateItem?.userProfile?.pfp ? updateItem?.userProfile?.pfp.split("?")[0] : "",
            }
            if (initialPicList.length < 1) {

                initialPicList.push({
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: initialData?.pfp,
                })
            }
            form.setFieldsValue(initialData)
            setUserData(updateItem?.userProfile?.id)
        }
    }

    const handleOk = () => {
        setIsModalOpenUpdate(false);
        setUpdateItem(null)
    };
    const handleCancel = () => {
        setIsModalOpenUpdate(false);
        setUpdateItem(null)
    };

    const onFinish = async (data) => {
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('bio', data.bio);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('salary', data.salary);
        formData.append('socialSecurityNumber', data.socialSecurityNumber);
        formData.append('dob', moment(new Date(data.dob)).format('YYYY-MM-DD'))
        formData.append('position', data.position);
        if (data.pfp && data.pfp.file) {
            formData.append('pfp', data.pfp.file.originFileObj);
        }
        const url = `${process.env.DIGITALOCEAN}/account/user-profile/${userData}`
        await patchAxios(url, formData, true, true, () => {})
        setUpdateItem(null)
        setReloadData({});
    }

    return (
        <Drawer className='custom-drawer' width="600" placement="right" title="Update Member Profile" open={isModalOpenUpdate} onClose={handleCancel}>
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
                <Form.Item label="Profile picture" className='mt-4' name={"pfp"}>
                    <Upload
                        listType="picture-circle"
                        maxCount={1}
                        defaultFileList={initialPicList}
                    >
                        <div>
                            <PlusOutlined />
                            <div
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
                        <DatePicker className='rounded w-full' placeholder='' />
                    </Form.Item>
                </div>
                <div className='flex gap-x-5 w-full'>
                    <Form.Item label="Salary" name="salary" className='w-full'>
                        <InputNumber min={0} className='rounded w-full' />
                    </Form.Item>
                    <Form.Item label="Social security Number" name="socialSecurityNumber" className='w-full'>
                        <InputNumber min={0} className='rounded w-full' />
                    </Form.Item>

                </div>
                <Form.Item label="Position" name="position" className='w-full'>
                    <Input className='rounded' />
                </Form.Item>
                <div className='flex gap-x-5 w-full justify-end'>
                    <Form.Item>
                        <button htmlType="submit" type='primary' className='hover:bg-foreignBackground text-textIcons rounded py-[0.4rem] px-3 hover:shadow-xl'>
                            Save
                        </button>
                    </Form.Item>
                </div>
            </Form>
        </Drawer>
    );
};