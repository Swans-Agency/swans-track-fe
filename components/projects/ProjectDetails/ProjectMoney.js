import { Progress } from 'antd';
import React from 'react';


export default function ProjectMoney({ projectDetails, projectCurrency, Paid="Received"}) {
  return (
      <div className='border rounded-lg h-fit'>
          <div className='flex justify-between px-4 py-2'>
              <div>
                  <p className='font-black'>Total Due</p>
                  <p className='text-3xl font-extralight'>{projectDetails ? projectCurrency : ""} {projectDetails?.jobDue ? parseFloat(projectDetails?.jobDue)?.toFixed(2) : 0}</p>
              </div>
              <div>
                  <p className='font-black'>{Paid}</p>
                  <p className='text-3xl font-extralight'>{projectDetails ? projectCurrency : ""} {projectDetails?.jobReceived ? parseFloat(projectDetails?.jobReceived)?.toFixed(2) : 0}</p>
              </div>
              <div>
                  <Progress size="small" type="circle" percent={projectDetails?.percentageDone ? parseFloat(projectDetails?.percentageDone)?.toFixed(1) : 0} />
              </div>
          </div>
      </div>
  );
};