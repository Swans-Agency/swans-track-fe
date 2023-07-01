import React from 'react';


export default function FormButtons({content}) {
    return (
        <button htmlType="submit" type='primary' className='bg-foreignBackground hover:bg-sidebar text-textIcons rounded py-[0.4rem] px-3'>
            {content}
        </button>
    );
};