import { Avatar, Card, Popconfirm } from 'antd';
const { Meta } = Card;
import moment from 'moment';
import React from 'react';
import { EditOutlined, UserDeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';


export default function GridMembers({ teamMembers, deleteTeamMember, showModal }) {
    return (
        <div className='grid laptop:grid-cols-3 tablet:grid-cols-1  gap-3 mt-2 flex-wrap'>
            {teamMembers?.results?.map((item) => {
                return (
                    <Card
                        style={{
                            width: '100%',
                        }}
                        actions={[
                            <EditOutlined key="edit" style={{ color: "#3b82f6" }} onClick={() => showModal(item)} />,
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
                                <UserDeleteOutlined key="delete" style={{ color: "red" }} />
                            </Popconfirm>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={item?.userProfile?.pfp?.split("?")[0]} />}
                            title={`${item?.username}`}
                            description={
                                <>
                                    <p><strong>Full name: </strong>{item?.userProfile?.firstName} {item?.userProfile?.lastName} </p>
                                    <p><strong>Phone number: </strong>{item?.userProfile?.phoneNumber}</p>
                                    <p><strong>Position: </strong>{item?.userProfile?.position}</p>
                                    <p><strong>Permission: </strong>{item?.permission}</p>
                                    <p><strong>Employement Date: </strong>{moment.utc(item?.date_joined).local().format('MMMM DD, YYYY, h:mm A')}</p>
                                </>
                            }
                        />
                    </Card>
                )
            })}
        </div>

    );
};