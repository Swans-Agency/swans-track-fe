import { redirect } from '@/functions/GeneralFunctions';
import React, { useState } from 'react';


export default function MenuItem({ item, index }) {
    const [showChildren, setShowChildren] = useState(false);

    const handleClick = (item) => {
        if (item?.key) {
            redirect(`/authorized/${item?.key}`)
        } else {
            setShowChildren(!showChildren);
        }
    }

    return (
        <div key={index}>
            <div
                className='flex justify-between gap-x-3 items-center text-[1rem] hover:bg-mainBackground hover:cursor-pointer px-2 py-2 rounded-lg'
                onClick={() => handleClick(item)}
            >
                <div className='flex gap-x-3 items-center'>
                    {item?.icon}
                    <p>{item?.label}</p>
                </div>
                <div className='text-sm'>
                    {item?.arrow}
                </div>
            </div>
            <div className={`${!showChildren ? "hidden" : ""} bg-mainBackground rounded-lg my-1`}>
                {
                    item?.children?.map((child, cIndex) => {
                        return (
                            <div
                                key={cIndex}
                                className='flex gap-x-3 items-center text-[1rem] hover:bg-foreignBackground hover:text-textIcons hover:cursor-pointer pl-8 px-2 py-2 rounded-lg'
                                onClick={() => handleClick(child)}
                            >
                                {child?.icon}
                                <p>{child?.label}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};