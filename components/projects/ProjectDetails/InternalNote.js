import React, { useState } from 'react';
import ModalANTD from '@/components/ANTD/ModalANTD';
import AddIcon from '@/pages/authorized/projects/details/icons/AddIcon';
import { Divider } from 'antd';
import InternalNoteForm from './InternalNoteForm';


export default function InternalNote({ internalJobNotes, getInternalNotes, projectId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    return (
        <div className='mt-4 px-2 border rounded-lg max-h-[350px]  pb-2'>
            <div className='flex justify-between items-center bg-white !z-10 '>
                <p className='font-semibold text-md py-2 px-2'>Internal Notes</p>
                <div onClick={() => setIsModalOpen(true)}><AddIcon /></div>
            </div>
            <div className='pb-2 px-2  max-h-[275px] overflow-hidden hover:overflow-y-auto '>
                {internalJobNotes?.map((item, index) => {
                    return (
                        <>
                            <div className='text-justify'>{item?.jobNote}</div>
                            {internalJobNotes.length !== index + 1 && <Divider className='my-1' />}
                        </>
                    )
                })}
                {!internalJobNotes.length && <p className='text-sm text-gray-400'>No notes</p>}
            </div>
            <ModalANTD
                title="Add Internal Note"
                footer={null}
                isModalOpen={isModalOpen}
                handleOk={() => handleCloseModal()}
                handleCancel={() => handleCloseModal()}
                renderComponent={<InternalNoteForm getInternalNotes={getInternalNotes} projectId={projectId} handleCloseModal={handleCloseModal} />}
                style={{
                    top: 20,
                    left: 50
                }}
            />
        </div>
    );
};