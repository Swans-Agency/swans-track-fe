import { Popconfirm } from 'antd';
import { EditOutlined, UserDeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';
import TableANTD from '../ANTD/TableANTD';


export default function TableMembers({ deleteTeamMember, showModal }) {
    const columns = [
        {
            title: "E-mail",
            dataIndex: 'username',
            key: 'username',
            render: ((_, item) => (<div className='text-left'>{item?.username}</div>)),
            width: '20%',
        },
        {
            title: 'First name',
            dataIndex: 'name',
            key: 'name',
            render: ((_, item) => (<div>{item?.userProfile?.firstName}</div>)),
            width: '10%'
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: ((_, item) => (<>{item?.userProfile?.phoneNumber}</>)),
            width: '10%'
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            render: ((_, item) => (<>{item?.userProfile?.dob}</>)),
            width: '10%'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: ((_, item) => (<>{item?.userProfile?.position}</>)),
            width: '20%'
        },
        {
            title: 'Permission',
            dataIndex: 'permission',
            key: 'permission',
            width: '10%'
        },
        {
            title: 'Join date',
            dataIndex: 'date_joined',
            key: 'date_joined',
            render: ((_, item) => (<>{moment.utc(item?.date_joined).local().format('MMMM DD, YYYY')}</>)),
            width: '10%'
        },
        {
            title: <div className='flex justify-center'>Edit</div>,
            dataIndex: 'edit',
            key: 'edit',
            render: ((_, item) => {
                return (
                    <div className='flex items-center justify-center'>
                        <EditOutlined key="edit" style={{ color: "#3b82f6" }} onClick={() => showModal(item)} />
                    </div>
                )
            }),
            width: '5%'
        },
        {
            title: <div className='flex justify-center'>Delete</div>,
            dataIndex: 'delete',
            key: 'delete',
            render: ((_, item) => {
                return (
                    <div className='flex items-center justify-center'>
                        <Popconfirm
                            title="Delete"
                            description={`Are you sure you want to delete ${item?.userProfile?.firstName}?`}
                            onConfirm={() => deleteTeamMember(item)}
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            okButtonProps={{
                                danger: true,
                            }}
                        >
                            <UserDeleteOutlined key="delete" style={{ color: "red" }} className='hover:cursor-pointer' />
                        </Popconfirm>
                    </div>
                )
            }),
            width: '5%'
        },
    ];

    return (
        <div className='mt-2'>
            <TableANTD
                columns={columns}
                url={`${process.env.DIGITALOCEAN}/account/list-employees/`}
            />
        </div>

    );
};