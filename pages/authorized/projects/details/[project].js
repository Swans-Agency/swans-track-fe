import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookie, { remove } from "react-cookies";
import { getAxios, patchAxios } from '@/functions/ApiCalls';
import ClientInfo from '@/components/projects/ProjectDetails/ClientInfo';
import ClientNotes from '@/components/projects/ProjectDetails/ClientNotes';
import BreadCrumbs from '@/components/projects/ProjectDetails/BreadCrumbs';
import InternalNote from '@/components/projects/ProjectDetails/InternalNote';
import ProjectTodo from '@/components/projects/ProjectDetails/ProjectTodo';
import AdditionalDocs from '@/components/projects/ProjectDetails/AdditionalDocs';
import SharedDocuments from '@/components/projects/ProjectDetails/SharedDocuments';
import ProjectMoney from '@/components/projects/ProjectDetails/ProjectMoney';
import ProjectInvoices from '@/components/projects/ProjectDetails/ProjectInvoices';
import ProjectProposals from '@/components/projects/ProjectDetails/ProjectProposals';



export default function ProjectDetails() {
    const [projectId, setProjectId] = useState(null);
    const [projectCurrency, setProjectCurrency] = useState(null);
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectObj, setProjectObj] = useState({});
    const [clientJobNotes, setClientJobNotes] = useState([]);
    const [internalJobNotes, setInternalJobNotes] = useState([]);
    const [projectTodo, setProjectTodo] = useState([]);
    const [projectAdditionalDocs, setProjectAdditionalDocs] = useState([]);
    const [projectSharedDocs, setProjectSharedDocs] = useState([]);
    const [projectProposals, setProjectProposals] = useState([]);
    const [projectInvoices, setProjectInvoices] = useState([]);
    const router = useRouter();

    const getClientNotes = async () => {
        const url = `${process.env.DIGITALOCEAN}/project/client-notes-project/${router.query.project}/`;
        const projectData = await getAxios(url, false, false, () => { });
        setClientJobNotes(projectData);
    };

    const getInternalNotes = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/internal-notes-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { });
        setInternalJobNotes(projectData2);
    };

    const getProjectTodos = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/todo-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { });
        setProjectTodo(projectData2);
    };

    const getProjectAdditionalDocs = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/additional-docs-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { });
        setProjectAdditionalDocs(projectData2);
    };

    const getProjectSharedDocs = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/shared-docs-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { });
        setProjectSharedDocs(projectData2);
    };

    const getProjectDetails = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/details-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { });
        setProjectDetails(projectData2);
    };

    const getProjectProposals = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/proposal-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { });
        setProjectProposals(projectData2);
    };

    const getProjectInvoices = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/invoice-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { });
        setProjectInvoices(projectData2);
    };

    const handleChangeEdit = async (e, item) => {
        console.log({ e });
        console.log({ item });
        const url2 = `${process.env.DIGITALOCEAN}/project/todo-project/${item?.id}/`;
        const projectData2 = await patchAxios(url2, {
            "checked": e,
        }, false, false, () => { });
        getProjectTodos()
    }

    useEffect(() => {
        if (router.query.project) {
            setProjectId(router.query.project)
            if (typeof window !== 'undefined') {
                setProjectObj(JSON.parse(localStorage.getItem('project')))
            }
            setProjectCurrency(cookie.load("companyCurrency", { path: "/" }))

            getClientNotes();
            getInternalNotes();
            getProjectTodos();
            getProjectAdditionalDocs();
            getProjectSharedDocs();
            getProjectDetails();
            getProjectProposals();
            getProjectInvoices();
        }
    }, [router.query.project]);


    return (
        <div>
            <BreadCrumbs
                router={router}
                projectObj={projectObj}
            />
            <div className='py-5 flex  justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>{projectObj?.projectName}</h1>
                    <p className='text-gray-400 font-light'>{projectObj?.category}</p>
                </div>
                <div className='text-xl font-light'>
                    Project Total: <span className='font-bold text-xl'>{projectDetails ? projectCurrency : ""} {projectDetails?.jobTotal ? parseFloat(projectDetails?.jobTotal).toFixed(2) : 0}</span>
                </div>
            </div>
            <div className='grid grid-cols-[1fr_3fr_1fr] gap-4'>
                <div className=''>
                    <ClientInfo
                        projectObj={projectObj}
                        projectId={projectId}
                    />
                    <ClientNotes
                        clientJobNotes={clientJobNotes}
                    />
                    <InternalNote
                        internalJobNotes={internalJobNotes}
                        projectId={projectId}
                        getInternalNotes={getInternalNotes}
                    />
                </div>
                <div>
                    <ProjectMoney
                        projectDetails={projectDetails}
                        projectCurrency={projectCurrency}
                    />
                    <ProjectInvoices
                        projectInvoices={projectInvoices}
                        getProjectInvoices={getProjectInvoices}
                        projectId={projectId}
                        projectCurrency={projectCurrency}
                        getProjectDetails={getProjectDetails}
                    />
                    <ProjectProposals
                        projectProposals={projectProposals}
                        getProjectProposals={getProjectProposals}
                        projectId={projectId}
                        projectCurrency={projectCurrency}
                        getProjectDetails={getProjectDetails}
                    />

                </div>


                <div className=''>
                    <ProjectTodo
                        projectTodo={projectTodo}
                        handleChangeEdit={handleChangeEdit}
                        getProjectTodos={getProjectTodos}
                        projectId={projectId}
                    />
                    <AdditionalDocs
                        projectAdditionalDocs={projectAdditionalDocs}
                        getProjectAdditionalDocs={getProjectAdditionalDocs}
                        projectId={projectId}
                    />
                    <SharedDocuments
                        projectId={projectId}
                        getProjectSharedDocs={getProjectSharedDocs}
                        projectSharedDocs={projectSharedDocs}
                    />
                </div>
            </div>
        </div>

    );
};