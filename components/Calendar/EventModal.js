import { deleteAxios } from '@/functions/ApiCalls';
import moment from 'moment';
import React from 'react';
import ModalANTD from '../ANTD/ModalANTD';
import EventModalContent from './EventModalContent';


export default function EventModal({ isModalOpen, handleOk, handleCancel, selectedItem }) {

    const copyText = async (link) => {
        await navigator.clipboard.writeText(link)
        alert("Link copied to clipboard")
    }

    const handleDeleteEvent = async (id) => {
        let url = `${process.env.DIGITALOCEAN}/tasks/create-event/${id}/`
        let res = await deleteAxios(url, true, true, () => { })
        router.reload();
    }

    return (
        <>
            {selectedItem &&
                <ModalANTD
                    title={null}
                    footer={null}
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    renderComponent={
                        <EventModalContent
                            selectedItem={selectedItem}
                            handleCancel={handleCancel}
                            handleDeleteEvent={handleDeleteEvent}
                            copyText={copyText}
                        />
                    }
                />}
        </>
    );
};