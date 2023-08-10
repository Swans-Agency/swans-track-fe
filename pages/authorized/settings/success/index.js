import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import {  useRouter } from 'next/router';


export default function index() {
    const router = useRouter()

    useEffect(() => {
        console.log(router.query)
    }, [])
  return (
      <Result
        status="success"
        title="Successfully Subscribed!"
        subTitle="Your payment was successful and your subscription is now active. Thank you for your subscription."
        extra={
        <button className='py-2 px-4 border rounded-lg bg-foreignBackground text-white hover:bg-mainBackground' type="primary" key="console" onClick={() => { router.push('/authorized/settings')}}>
            Go Console
        </button>
        }
      />
    );
};