import CopyIcon from '@/pages/authorized/projects/details/icons/CopyIcon';
import EyeIcon from '@/pages/authorized/projects/details/icons/EyeIcon';
import MailIcon from '@/pages/authorized/projects/details/icons/MailIcon';
import PhoneIcon from '@/pages/authorized/projects/details/icons/PhoneIcon';
import React from 'react';


export default function ClientInfo({ projectObj, projectId }) {
    const copyToClipboard = () => {
        const inviteLink = document.getElementById('inviteLink');
        const inviteUrl = inviteLink.getAttribute('href');

        // Create a temporary textarea element to hold the URL
        const textarea = document.createElement('textarea');
        textarea.value = inviteUrl;
        document.body.appendChild(textarea);

        // Select and copy the URL from the textarea
        textarea.select();
        document.execCommand('copy');

        // Clean up: remove the textarea
        document.body.removeChild(textarea);

        // Optionally provide feedback to the user (e.g., a tooltip)
        inviteLink.setAttribute('data-tooltip', 'Copied to clipboard');
        alert('Copied to clipboard');
    }
    return (
        <div className='border rounded-lg w-full px-4  py-4 max-h-[350px] '>
            <div className='w-full flex flex-col items-center mb-3 px-2'>
                <div className='p-5 flex items-center justify-center w-20 h-20 text-3xl font-bold bg-foreignBackground text-white rounded-full'>{projectObj?.client?.firstName[0]}</div>
                <p className='pt-1 text-2xl font-semibold'>{projectObj?.client?.firstName} {projectObj?.client?.lastName}</p>
            </div>
            <div className='overflow-scroll'>
                <p className='font-semibold text-sm pb-1 '>Contact Info</p>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'><MailIcon /> <a className='text-blue-500 hover:text-blue-700' href={`mailto:${projectObj?.client?.email}`} target="_blank" rel="noopener noreferrer">{projectObj?.client?.email}</a></div>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'><PhoneIcon /> {projectObj?.client?.phoneNumber}</div>

                <p className='font-semibold text-sm mt-3 pb-1'>Client Portal</p>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'><EyeIcon /> <a href={`/client-portal/${projectId}`} target='_blank' className='text-blue-500 hover:text-blue-700'>View portal</a></div>
                <div className='flex items-center justify-start gap-x-2 text-sm py-1'><CopyIcon /> <p id="inviteLink" onClick={() => copyToClipboard()} href={`https://www.swanstrack.com/client-portal/${projectId}/`} className='text-blue-500 hover:text-blue-700 hover:cursor-pointer'>Copy invite URL</p></div>
            </div>
        </div>
    );
};