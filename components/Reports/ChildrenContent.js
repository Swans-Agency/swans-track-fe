import React from 'react';


export default function ChildrenContent({ itemsOptions, content, handleDownloadReport, classNames}) {
  return (
      <div className='mb-2'>
          <div className='flex flex-wrap pl-2 gap-x-1'>
              {itemsOptions?.map((item, index) => (
                  <div key={index} className={classNames} onClick={() => handleDownloadReport(item, content?.key)}>
                      {item}
                      <p className={`text-textIcons ${index === itemsOptions.length - 1 ? 'hidden' : ''}`}>|</p>
                  </div>
              ))}
          </div>
      </div>

  );
};