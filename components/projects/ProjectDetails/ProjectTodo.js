import { Checkbox, Divider } from 'antd';
import React, { useState } from 'react';
import ProjectTodoForm from './ProjectTodoForm';
import AddIcon from '@/pages/authorized/projects/details/icons/AddIcon';
import ModalANTD from '@/components/ANTD/ModalANTD';


export default function ProjectTodo({ projectTodo, handleChangeEdit, projectId, getProjectTodos }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    return (
        <div className='px-2 mt-4 border dark:border-[#282828] rounded-lg max-h-[350px]  pb-2'>
            <div className='flex justify-between items-center  !z-10 '>
                <p className='font-semibold text-md py-2 px-2'>Checklist</p>
                <div onClick={() => setIsModalOpen(true)}><AddIcon /></div>
            </div>
            <div className='pb-2  max-h-[275px] overflow-y-auto px-2 '>
                {projectTodo?.map((item, index) => {
                    return (
                        <>
                            <Checkbox
                                className={`pb-1 ${item?.checked ? 'line-through' : ''} `}
                                onChange={(e) => handleChangeEdit(e?.target?.checked, item)}
                                checked={item?.checked}
                            >
                                <span className={`!pt-0 !mt-0 !inset-0 ${item?.checked ? "text-gray-400" : ""} `}>{item?.todo}</span>
                            </Checkbox>
                        </>
                    )
                })}
                {!projectTodo?.length && <p className='text-sm text-gray-400'>No to dos</p>}
            </div>
            <ModalANTD
                title="Add Job Todo"
                footer={null}
                isModalOpen={isModalOpen}
                handleOk={() => handleCloseModal()}
                handleCancel={() => handleCloseModal()}
                renderComponent={<ProjectTodoForm getProjectTodos={getProjectTodos} projectId={projectId} handleCloseModal={handleCloseModal} />}
                style={{
                    top: 20,
                }}
            />
        </div>
    );
};