import ModalANTD from '@/components/ANTD/ModalANTD';
import AddIcon from '@/pages/authorized/projects/details/icons/AddIcon';
import { Divider } from 'antd';
import React, { useState } from 'react';
import InternalNoteForm from './InternalNoteForm';


export default function ClientNotes({ clientJobNotes, add = false, getProjectInfo, projectId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
        <div className='mt-4 px-2 border rounded-lg max-h-[350px]  pb-2'>
                <div className='flex justify-between items-center bg-white !z-10 '>
                    <p className='font-semibold text-md py-2 px-2'>Client Notes</p>
                    {add && <div onClick={() => setIsModalOpen(true)}><AddIcon /></div>}
                </div>
            <div className='pb-2 px-2 max-h-[275px] overflow-hidden hover:overflow-y-auto'>
                {clientJobNotes?.map((item, index) => {
                    return (
                        <>
                            <div className='text-justify pr-2'>{item?.jobNote}</div>
                            {clientJobNotes?.length !== index + 1 && <Divider className='my-1' />}
                        </>
                    )
                })}
                {!clientJobNotes?.length && <p className='text-sm text-gray-400'>No notes</p>}
            </div>
        </div>
            <ModalANTD
                title="Add Note"
                footer={null}
                isModalOpen={isModalOpen}
                handleOk={() => handleCloseModal()}
                handleCancel={() => handleCloseModal()}
                renderComponent={<InternalNoteForm getInternalNotes={getProjectInfo} projectId={projectId} handleCloseModal={handleCloseModal} path="client-notes-project" />}
                style={{
                    top: 20,
                    // left: 50
                }}
            />
        </>
    );
};