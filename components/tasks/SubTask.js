import { Checkbox, Popconfirm } from 'antd';
import React, { useState } from 'react';


export default function SubTask({ itemTask, handleCheckTask, handleDeleteTask}) {
    const [mouseOver, setMouseOver] = useState(false)
    const [lineThrough, setLineThrough] = useState(false)

    

  return (
      <div className="flex justify-between hover:bg-gray-100 dark:hover:bg-[#141414] rounded py-1 px-7" onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} >
          <div className="flex justify-start items-center gap-2">
              <Checkbox className={`${itemTask?.status ? "text-gray-400 line-through" : ""}`} checked={itemTask?.status} onChange={(e) => { handleCheckTask(itemTask)}}>{itemTask?.itemName}</Checkbox> 
          </div>

              <Popconfirm
              className="hover:cursor-pointer"
              title={<p className="text-white">Delete this task?</p>}
                  onConfirm={() => handleDeleteTask(itemTask?.id)}
              okText="Yes"
              cancelText={<p className="text-white hover:text-white">No</p>}
          >
              {mouseOver && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          }
          </Popconfirm>

      </div>

  );
};