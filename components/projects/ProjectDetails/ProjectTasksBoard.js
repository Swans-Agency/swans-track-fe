import React from 'react';


export default function ProjectTasksBoard({ handleShowBoard}) {
  return (
      <div className='px-2 border dark:border-[#282828] rounded-lg max-h-[350px] pb-2'>
          <div className='flex justify-between items-center !z-10 '>
              <p className='font-semibold text-md py-2 px-2'>Tasks Board</p>
              <div onClick={() => { handleShowBoard() }} >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer hover:bg-foreignBackground hover:dark:bg-[#282828] hover:text-white rounded-full p-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
              </div>
          </div>
          <p className='text-sm text-gray-400 px-2 '>Expand to view relative tasks and schedule</p>
      </div>

  );
};