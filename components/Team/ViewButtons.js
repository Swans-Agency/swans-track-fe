import React from 'react';
import { UserAddOutlined, AppstoreOutlined, TableOutlined } from '@ant-design/icons';

export default function ViewButtons({ setTeamView, showModal }) {
    return (
        <div className='flex justify-end mb-3'>
            {/* <div className='flex gap-x-4'>
                <button onClick={() => setTeamView("Grid")} className='flex gap-x-2 hover:bg-foreignBackground text-textIcons rounded py-[0.4rem] px-3'><AppstoreOutlined className=' pt-1' />Grid View</button>
                <button onClick={() => setTeamView("Table")} className='flex gap-x-2 hover:bg-foreignBackground text-textIcons rounded py-[0.4rem] px-3'><TableOutlined className=' pt-1' />Table View</button>
            </div> */}
            <button onClick={showModal} className='flex gap-x-2 hover:bg-foreignBackground text-textIcons rounded py-[0.4rem] px-3'><UserAddOutlined className=' pt-1' />Add member</button>
        </div>
    );
};