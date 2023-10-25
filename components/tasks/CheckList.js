import { CheckSquareOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import React from 'react';


export default function CheckList({ item, handleDeleteChecklist}) {
    return (
        <div className="font-semibold flex gap-x-2 items-center justify-between mb-2 border-b pb-1">
            <div className="flex gap-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>

                <p>
                    {item?.checklistName}
                </p>
            </div>
            <Popconfirm
                className="hover:cursor-pointer"
                title={<p className="text-white">Delete this list?</p>}
                onConfirm={() => handleDeleteChecklist(item?.id)}
                okText="Yes"
                cancelText={<p className="text-white hover:text-white">No</p>}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </Popconfirm>
        </div>

    );
};