import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
const { Meta } = Card;
import { useRouter } from 'next/router';
import axios from 'axios';
import { postAxios } from '@/functions/ApiCalls';

export default function DynamicPage() {
  const [responseData, setResponseData] = useState(null);
  const [userName, setUserName] = useState(null);
  const router = useRouter();


  useEffect(() => {
    console.log({ "dddd": "ppppppp" })
    setUserName(router.query.username)
    if (router.query.username) {
      handleGetData(router.query.username)
    }
  }, [router.query.username])


  const handleGetData = async (username) => {
    const url = `${process.env.DIGITALOCEAN}/account/public-profile/`;
    let data = {
      username: username
    }
    let res = await axios.post(url, data)
    setResponseData(res?.data)
    console.log({ res })
  }

  return (
    <div className='w-full flex flex-col justify-center items-center py-12 px-10'>
      {responseData ? <Card
        hoverable
        className='shadow-xl'
        style={{
          width: "100%",
        }}
        cover={<img alt="User profile" src={responseData?.pfp?.split("?")[0]} />}
      >
        <Meta title={`${responseData?.firstName} ${responseData?.lastName}`} description={
          <div>
            <p><span className='font-bold'>E-mail:</span> {router.query.username}</p>
            {responseData?.phoneNumber && <p><span className='font-bold'>Phone number:</span> {responseData?.phoneNumber}</p>}
            {responseData?.position && <p><span className='font-bold'>Position:</span> {responseData?.position}</p>}
            <p className='pt-2 text-justify'>{responseData?.bio} </p>
          </div>
        } />
      </Card> :
        <div className='pt-[15rem] font-semibold'>
          <p>The requested profile isn't available</p>
        </div>
      }
      <div className=' flex flex-col justify-center items-center py-4'>
        <img src="/Dark Logo (1).png" width="50" />
      <a
        className='underline text-blue-600 underline-offset-2'
        href="https://www.swanstrack.com/"
        target="_blank"
      >
        Swans Track © 2023</a>
      </div>
    </div>
  );
};

