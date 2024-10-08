import CopyIcon from '@/pages/authorized/projects/details/icons/CopyIcon';
import EyeIcon from '@/pages/authorized/projects/details/icons/EyeIcon';
import MailIcon from '@/pages/authorized/projects/details/icons/MailIcon';
import PhoneIcon from '@/pages/authorized/projects/details/icons/PhoneIcon';
import NextCrypto from 'next-crypto';
import React from 'react';


export default function ClientInfo({ projectObj, projectId }) {
    const copyToClipboard = async() => {
        const inviteLink = document.getElementById('inviteLink');
        const textarea = document.createElement('textarea');

        const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
        const encryptedBuffer = await crypto.encrypt(projectId);
        const encodedValue = encodeURIComponent(encryptedBuffer);

        textarea.value = `http://swanstrack.com/client-portal/${encodedValue}/`;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        document.body.removeChild(textarea);

        inviteLink.setAttribute('data-tooltip', 'Copied to clipboard');
        alert('Copied to clipboard');
    }


    const redirectToClientPortal = async() => {
        const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
        const encryptedBuffer = await crypto.encrypt(projectId);
        const encodedValue = encodeURIComponent(encryptedBuffer);

        window.open(`/client-portal/${encodedValue}`, '_blank');
    }

    return (
        <div className='border dark:border-[#282828] rounded-lg w-full px-4  py-4 h-[350px] '>
            <div className='w-full flex flex-col items-center mb-3 px-2'>
                <div className='p-5 flex items-center justify-center w-20 h-20 text-4xl font-bold bg-foreignBackground dark:bg-[#282828] text-white rounded-full'>{projectObj?.clientObj?.firstName[0]}</div>
                <p className='pt-1 text-2xl font-semibold'>{projectObj?.clientObj?.firstName} {projectObj?.clientObj?.lastName}</p>
            </div>
            <div className=''>
                <p className='font-semibold text-sm pb-1 '>Contact Info</p>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'><MailIcon /> <a className='text-blue-500 hover:text-blue-700' href={`mailto:${projectObj?.clientObj?.email}`} target="_blank" rel="noopener noreferrer">{projectObj?.clientObj?.email}</a></div>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'><PhoneIcon /> {projectObj?.clientObj?.phoneNumber}</div>

                <p className='font-semibold text-sm mt-3 pb-1'>Client Portal</p>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'>
                    <EyeIcon />
                    <a onClick={() => redirectToClientPortal()} target='_blank' className='text-blue-500 hover:text-blue-700'>View portal</a>
                </div>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'>
                    <CopyIcon />
                    <p id="inviteLink" onClick={() => copyToClipboard()} className='text-blue-500 hover:text-blue-700 hover:cursor-pointer'>Copy invite URL</p>
                </div>
            </div>
        </div>
    );
};