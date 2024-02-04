import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Calendly/Navbar';
import ProjectMoney from '@/components/projects/ProjectDetails/ProjectMoney';
import ProjectInvoices from '@/components/projects/ProjectDetails/ProjectInvoices';
import ProjectProposals from '@/components/projects/ProjectDetails/ProjectProposals';
import SharedDocuments from '@/components/projects/ProjectDetails/SharedDocuments';
import ClientNotes from '@/components/projects/ProjectDetails/ClientNotes';
import NextCrypto from 'next-crypto';


export default function ClientProtal() {
    const [projectId, setProjectId] = useState(null);
    const [projectInfo, setProjectInfo] = useState(null);
    const [projectSharedDocs, setProjectSharedDocs] = useState(null);
    const router = useRouter();

    const saveProjectId = async (id) => {
        if (id) {
            const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
            const decodedValue = decodeURIComponent(id);
            const decrypted = await crypto.decrypt(decodedValue);
            setProjectId(decrypted);
        }
    }

    useEffect(() => {
        saveProjectId(router.query.project)
    }, [router.query.project]);

    useEffect(() => {
        if (projectId) {
            getProjectInfo();
        }
    }, [projectId]);


    const getProjectInfo = async () => {
        const url = `${process.env.DIGITALOCEAN}/project/client-project/${projectId}/`;
        const projectData = await axios.get(url);
        setProjectInfo(projectData?.data);
        getProjectSharedDocs()
    };

    const downloadPdf = async (id) => {
        NotificationLoading();
        let response = await axios.get(
            `${process.env.DIGITALOCEAN}/invoice/download-invoice/${id}`
        );
        ;
        let base64Data = response?.data?.invoice;
        const byteString = atob(base64Data?.split(",")[1]);
        const mimeString = base64Data?.split(",")[0]?.split(":")[1]?.split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString?.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString?.length; i++) {
            uint8Array[i] = byteString?.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: mimeString });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "filename.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const getProjectSharedDocs = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/shared-docs-project-client/${projectId}/`;
        const projectData2 = await axios.get(url2);
        setProjectSharedDocs(projectData2?.data);
    };


    return (
        <>
            <Navbar content="Join the swans" />
            <div className='px-[10%] py-6 dark:text-white'>
                <div className='py-5 flex  justify-between'>
                    <div>
                        <h1 className='laptop:text-3xl phone:text-sm font-bold'>{projectInfo?.projectName}</h1>
                        <p className='text-gray-400 phone:text-sm font-light'>{projectInfo?.category}</p>
                    </div>
                    <div className='laptop:text-xl phone:text-sm font-light'>
                        Project Total: <span className='font-bold laptop:text-xl phone:text-sm'>{projectInfo ? projectInfo?.projectCurrency : ""} {projectInfo?.projectDetails[0]?.jobTotal ? parseFloat(projectInfo?.projectDetails[0]?.jobTotal).toFixed(2) : 0}</span>
                    </div>
                </div>
                <ProjectMoney
                    projectDetails={projectInfo?.projectDetails[0]}
                    projectCurrency={projectInfo?.projectCurrency}
                    Paid="Paid"
                />
                <ProjectInvoices
                    projectInvoices={projectInfo?.projectInvoices}
                    getProjectInvoices={() => { }}
                    projectId={projectId}
                    projectCurrency={projectInfo?.projectCurrency}
                    getProjectDetails={getProjectInfo}
                    downloadPdf={downloadPdf}
                    add={false}
                />
                <ProjectProposals
                    projectProposals={projectInfo?.projectProposals}
                    getProjectProposals={() => { }}
                    projectId={projectId}
                    projectCurrency={projectInfo?.projectCurrency}
                    getProjectDetails={getProjectInfo}
                    downloadPdf={downloadPdf}
                    add={false}
                />
                <SharedDocuments
                    projectId={projectId}
                    getProjectSharedDocs={getProjectSharedDocs}
                    projectSharedDocs={projectSharedDocs}
                    add={true}
                    classes={'grid-cols-6'}
                />
                <ClientNotes
                    clientJobNotes={projectInfo?.clientNotes}
                    getProjectInfo={getProjectInfo}
                    projectId={projectId}
                    add={true}
                />
            </div>
        </>
    );
};