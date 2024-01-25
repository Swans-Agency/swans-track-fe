import React from 'react';


export default function ListHeader({ columns, tasks}) {
  return (
      <div className={`text font-bold rounded text-center p-1 mb-2 sticky inset-0 `}>
          <div className="flex justify-start items-center gap-x-2">
              {columns?.title}
              <div className="border dark:border-0 rounded px-2 py-[0.15rem] text-[0.75rem] bg-gray-50 dark:bg-[#141414]">
                  {tasks?.length}
              </div>
          </div>
          <p className={`mt-1 w-full h-[0.1rem] bg-gray-500 `}></p>
      </div>

  );
};