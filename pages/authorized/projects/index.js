import Loading from '@/components/Loading/Loading';
// import ProjectsView from '@/components/projects/ProjectsView';
import dynamic from 'next/dynamic';
import React from 'react';
const ProjectsView = dynamic(() => import("@/components/projects/ProjectsView"), {
    loading: () => <Loading />,
});

export default function index() {
    return (
        <ProjectsView />
    );
};