import React from 'react';
import ReportComponent from './ReportComponent';


export default function IndexReport() {
  return (
      <div>
          <h1 className='text-3xl font-light tracking-tight text-textIcons'>Reports</h1>
          <div className='pt-10'>
              <ReportComponent />
          </div>
      </div>

  );
};