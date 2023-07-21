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
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Your payment was successful and your subscription is now active. Thank you for your subscription."
          extra={[
              <Button type="primary" key="console" onClick={() => { router.push('/authorized/settings')}}>
                  Go Console
              </Button>,
          ]}
      />
  );
};