import React, { useState } from 'react';
import ModalANTD from '@/components/ANTD/ModalANTD';
import AddIcon from '@/pages/authorized/projects/details/icons/AddIcon';
import AdditionalDocsForm from './AdditionalDocsForm';
import SharedDocsForm from './SharedDocsForm';


export default function SharedDocuments({ projectId, getProjectSharedDocs, projectSharedDocs, add = true, classes ='grid-cols-[1fr_1fr]' }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    return (
        <div className='px-2 mt-4 border rounded-lg max-h-[350px]  pb-2'>
            <div className='flex justify-between items-center bg-white !z-10'>
                <p className='font-semibold text-md py-2 px-2'>Shared Documents</p>
                {add && <div onClick={() => setIsModalOpen(true)}><AddIcon /></div>}
            </div>
            <div className={`pb-2 grid ${classes} gap-2 max-h-[275px] overflow-hidden hover:overflow-y-auto px-2`}>
                {projectSharedDocs?.map((item, index) => {
                    return (
                        <div className="relative w-full h-0 hover:cursor-pointer" style={{ paddingTop: "100%" }} onClick={() => window.open(item?.doc?.split("?")[0])}>
                            <img
                                src={item?.doc?.split("?")[0] || "/docs.png"}
                                className="absolute top-0 left-0 w-full h-full object-cover border rounded-lg shadow"
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = "/docs.png"; // Replace with a fallback image or set a default
                                    e.target.classList.add("p-5")
                                    // You can also handle other actions, like showing an error message, here.
                                }}
                            />
                            <div style={{ backdropFilter: "blur(10px)", }} className='absolute text-xs text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full py-1 text-center overflow-x-hidden'>
                                {item?.docName}
                            </div>
                        </div>
                    )
                })}
                {!projectSharedDocs?.length && <p className='text-sm text-gray-400'>No documents</p>}
            </div>
            <ModalANTD
                title="Add Shared Documents"
                footer={null}
                isModalOpen={isModalOpen}
                handleOk={() => handleCloseModal()}
                handleCancel={() => handleCloseModal()}
                renderComponent={<SharedDocsForm projectId={projectId} getProjectSharedDocs={getProjectSharedDocs} handleCloseModal={handleCloseModal} />}
                style={{
                    top: 20,
                    // left: 50
                }}
            />
        </div>
    );
};