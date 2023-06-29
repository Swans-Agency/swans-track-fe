import React from 'react';
import TagANTD from '../ANTD/TagANTD';


export default function ChildrenContent({ itemsOptions, content, handleDownloadReport, classNames }) {
    return (
        <div className='mb-2'>
            <div className='flex justify-start flex-wrap gap-1'>
                {itemsOptions?.map((item, index) => (
                    <div key={index} className={`${classNames} flex gap-x-1`} onClick={() => handleDownloadReport(item, content?.key)}>
                        {item}
                        {/* <TagANTD
                            bordered={true}
                            color="#ACBBC7"
                            text={item}
                        /> */}
                        <p className={`text-textIcons ${index === itemsOptions.length - 1 ? 'hidden' : ''}`}>|</p>
                    </div>
                ))}
            </div>
        </div>

    );
};