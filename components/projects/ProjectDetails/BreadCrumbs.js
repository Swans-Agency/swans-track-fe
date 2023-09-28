import HomeIcon from '@/components/Navbar/Icons/HomeIcon';
import ProjectIcons from '@/components/Navbar/Icons/ProjectIcons';
import { Breadcrumb } from 'antd';
import React from 'react';


export default function BreadCrumbs({ router, projectObj}) {
  return (
    <>
        { projectObj && <Breadcrumb
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