import React, { useState, useEffect } from 'react'
import { Input, InputNumber, Form, Select } from "antd";
import FormButtons from "@/components/ANTD/FormButtons"
import { deleteAxios, getAxios, patchAxios } from '@/functions/ApiCalls';
import { useRouter } from "next/router";
import ModalANTD from '../ANTD/ModalANTD';


export default function ManageColumnsForm({ handleNotifyTeam, column, statuses }) {
    const [taskStatuses, setTaskStatuses] = useState(statuses?.filter((item) => item?.value !== column?.columnName))
    const [showModal, setShowModal] = useState(false)
    const [ moveToColumn, setMoveToColumn ] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteColumn = async () => {
        setIsLoading(true)
        let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/${column?.id}/?moveTo=${moveToColumn}`
        await deleteAxios(url, true, true, () => { }, false)
        setIsLoading(false)
    }

    return (
        <>
            
            {taskStatuses && <ModalANTD
                title={"Move task to another column"}
                footer={null}
                isModalOpen={showModal}
                handleOk={() => setShowModal(false)}
                handleCancel={() => setShowModal(false)}
                renderComponent={
                    <>
                        <Form
                            layout="vertical"
                            onFinish={handleDeleteColumn}
                        >
                            <Form.Item label="Task status" name="taskStatus">
                                <Select
                                    size="large"
                                    options={taskStatuses}
                                    placeholder="Select task status"
                                    className="w-full"
                                    onChange={(value) => setMoveToColumn(value)}
                                />
                            </Form.Item>
                            <div className='flex justify-end'>

                            <FormButtons
                                content="Confirm"
                                isLoading={isLoading}
                                />
                                </div>
                        </Form>
                    </>
                }
                customWidth={true}
            />}
        </>
    )
}