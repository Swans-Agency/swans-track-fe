import React, { useState, useEffect } from 'react'
import { Input, InputNumber, Form, Select } from "antd";
import FormButtons from "@/components/ANTD/FormButtons"
import { deleteAxios, getAxios, patchAxios } from '@/functions/ApiCalls';
import { useRouter } from "next/router";
import ModalANTD from '../ANTD/ModalANTD';


export default function ManageColumnsForm({ handleNotifyTeam, column, statuses }) {
    const [index, setIndex] = useState(0)
    const [taskStatuses, setTaskStatuses] = useState(statuses?.filter((item) => item?.value !== column?.columnName))
    const [showModal, setShowModal] = useState(false)
    const [ moveToColumn, setMoveToColumn ] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const router = useRouter()

    const updateIndex = async (id) => {
        setUpdateLoading(true)
        let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/${id}/`
        await patchAxios(url, { index: index }, true, true, () => { }, false)
        setUpdateLoading(false)
        router.reload()
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }
    const handleDeleteColumn = async () => {
        setIsLoading(true)
        let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/${column?.id}/?moveTo=${moveToColumn}`
        await deleteAxios(url, true, true, () => { }, false)
        setIsLoading(false)
        router.reload()
    }

    return (
        <>
            <Form
                layout="vertical"
                className="border rounded-lg border-[#282828] mb-3 p-3"
            >
                <Form.Item label="Column name" name="columnName">
                    <Input size="large" defaultValue={column?.columnName} disabled />
                </Form.Item>
                <Form.Item label="Column index" name="index">
                    <InputNumber className="w-full" size="large" min={0} defaultValue={column?.index} onChange={(index) => setIndex(index)} />
                </Form.Item>
                <div className="flex justify-end items-center gap-3">
                    {/* <button className="bg-[#282828] rounded-lg py-[0.6rem] px-4" onClick={() => updateIndex(column?.id)}>
                        Edit
                    </button> */}
                    <div onClick={() => updateIndex(column?.id)} >
                    <FormButtons 
                        content="Edit"
                        isLoading={updateLoading}
                        
                    />
                    </div>
                    <button className="bg-[#dc2625] rounded-lg py-[0.6rem] px-4" onClick={()=>handleOpenModal()}>
                        Delete
                    </button>
                </div>
            </Form>
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
                            // className="border rounded-lg border-[#282828] mb-3 p-3"
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