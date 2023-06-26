import { Button, Result } from 'antd';
import React from 'react';
import { redirect } from '@/functions/GeneralFunctions';


export default function Custom404() {
  return (
      <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
              <button className='border rounded-lg text-lg py-1 px-2 bg-sidebarbg hover:bg-secondbg text-mainbg' onClick={() => {redirect('/')}}>
                Back Home
            </button>
            }
      />

  );
};