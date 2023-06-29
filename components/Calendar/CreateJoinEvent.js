import React from 'react';
import CreateEvent from './CreateEvent';
import Image from 'next/image';


export default function CreateJoinEvent({ form, onFinish, isConnected }) {
    return (
        <>
            {isConnected?.details ? <CreateEvent
                form={form}
                onFinish={onFinish}
            /> : <div className='flex flex-col items-center justify-center text-center'>
                <Image src="/connection.gif" width={150} height={150} />
                <p className='text-lg font-light'>Connect with Google Calendar to create events</p>
            </div>}
        </>
    );
};