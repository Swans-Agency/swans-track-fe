import HomeIcon from '@/components/Navbar/Icons/HomeIcon';
import ProjectIcons from '@/components/Navbar/Icons/ProjectIcons';
import { Breadcrumb } from 'antd';
import React from 'react';


export default function BreadCrumbs({ router, projectObj, obj = null, handleHideBoard }) {
  return (
    <>
        { projectObj && obj && <Breadcrumb
            items={[
                {
                    title: <div className='flex justify-center items-center gap-x-1'><HomeIcon width="w-4" height="h-4" /> <p>Swans Track</p></div>,
                },
                {
                    href: '/authorized/projects/',
                    title: <div className='flex justify-center items-center gap-x-1 '><ProjectIcons width="w-4" height="h-4" /> <p>Projects</p></div>,
                },
                {
                    title: <div onClick={() => handleHideBoard()} className=' hover:bg-gray-100 px-[0.15rem] hover:dark:bg-[#414040] hover:dark:text-white  rounded hover:cursor-pointer hover:text-black '><p>{projectObj?.projectName}</p></div>,
                },
                  obj
            ]}
        />}
          {projectObj && !obj && <Breadcrumb
            items={[
                {
                    title: <div className='flex justify-center items-center gap-x-1'><HomeIcon width="w-4" height="h-4" /> <p>Swans Track</p></div>,
                },
                {
                    href: '/authorized/projects/',
                    title: <div className='flex justify-center items-center gap-x-1 '><ProjectIcons width="w-4" height="h-4" /> <p>Projects</p></div>,
                },
                {
                    href: `/authorized/projects/details/${router.query.project}`,
                    title: <div className='flex justify-center items-center gap-x-1 '><p>{projectObj?.projectName}</p></div>,
                },
            ]}
        />}
    </>
  );
};