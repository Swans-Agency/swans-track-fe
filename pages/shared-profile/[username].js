import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function DynamicPage() {
  const [responseData, setResponseData] = useState(null);
  const [userName, setUserName] = useState(null);
  const router = useRouter();


  useEffect(() => {

    setUserName(router.query.username)
    // if (router.query.username) {
    //   handleGetData(router.query.username)
    // }
  }, [router.query.username])

  useEffect(() => {
    //      
    // setUserName(router.query.username)
    if (userName) {
      handleGetData(userName)
    }
  }, [userName])


  const handleGetData = async (username) => {
    const url = `${process.env.DIGITALOCEAN}/account/public-profile/`;
    let data = {
      username: username
    }
    let res = await axios.post(url, data)
    setResponseData(res?.data)

  }

  return (
    <div className='w-full flex flex-col justify-baseline bg-gray-100 h-[100vh] items-center py-12 px-8'>
      {responseData ?
        <div className='rounded-lg  py-4 px-4 w-full bg-gray-50'>
          <div className='w-24 h-24 rounded-full mx-auto' style={{
            backgroundImage: `url(${responseData?.pfp?.split("?")[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          </div>
          <p className='pt-2 font-bold text-center min-w-full'>{`${responseData?.firstName} ${responseData?.lastName}`}</p>
          {responseData?.bio && responseData?.bio != 'null' && <p className='pt-2 pb-4 font-light text-xs text-center'>{responseData?.bio} </p>}

          {responseData?.company && responseData?.company != 'null' && <p className='pt-2  font-bold text-xs text-center'>Book a meeting</p>}
          {responseData?.company && responseData?.company != 'null' && <a target="_blank" href={`https://www.swanstrack.com/swans-track/${responseData?.company}`} className='w-full mt-2 bg-gray-300 py-1 px-4 rounded flex gap-x-5 justify-center items-center'>
            <img src={"/calendar.svg"} width="30px" height="30px" />

          </a>}
          {userName && userName != 'null' && <p className='pt-2  font-bold text-xs text-center'>Contact me!</p>}
          {responseData?.phoneNumber && responseData?.phoneNumber != "null" &&
            <a href={`whatsapp://send?phone=${responseData?.phoneNumber}`} className='w-full bg-[#2cb742]  mt-2 py-1 px-4 rounded flex gap-x-5 justify-center items-center'>
              <img src={"/whatsapp.svg"} width="30px" height="30px" />
            </a>}
          {userName && userName != "null" &&
            <a href={`mailto:${userName}`} className='w-full bg-[#f8c795]  mt-2 py-1 px-4 rounded flex gap-x-5 justify-center items-center'>
              <img src={"/email.svg"} width="30px" height="30px" />
            </a>}
          {responseData?.company && responseData?.company != 'null' && <p className='pt-2  font-bold text-xs text-center'>Get to know me more!</p>}

          {responseData?.facebook && responseData?.facebook != 'null' && <a target="_blank" href={`https://www.facebook.com/${responseData?.facebook}`} className=' mt-2 w-full bg-[#1877f2] py-1 px-4 rounded flex justify-center'>
            <img src={"/facebook.svg"} width="30px" height="30px" />
          </a>}
          {responseData?.instagram && responseData?.instagram != 'null' && <a target="_blank" href={`https://www.instagram.com/${responseData?.instagram}`} className=' mt-2 w-full bg-[#da195f] py-1 px-4 rounded flex justify-center'>
            <img src={"/instagram.svg"} width="30px" height="30px" />
          </a>}

          {responseData?.linkedin && responseData?.linkedin != 'null' && <a target="_blank" href={`https://www.linkedin.com/in/${responseData?.linkedin}`} className=' mt-2 w-full bg-[#0077b5] py-1 px-4 rounded flex justify-center'>
            <img src={"/linkedin.svg"} width="30px" height="30px" />
          </a>}
          {responseData?.twitter && responseData?.twitter != 'null' && <a target="_blank" href={`https://twitter.com/${responseData?.twitter}`} className=' mt-2 w-full bg-[#1da1f2] py-1 px-4 rounded flex justify-center'>
            <img src={"/twitter.svg"} width="30px" height="30px" />
          </a>}

        </div>
        :
        <div className='pt-[15rem] font-semibold'>
          <p>The requested profile isn't available</p>
        </div>
      }

      <div className=' flex flex-col justify-center items-center py-4'>
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

