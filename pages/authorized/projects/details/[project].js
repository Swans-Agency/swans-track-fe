import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookie, { remove } from "react-cookies";
import { getAxios, patchAxios, postAxios } from '@/functions/ApiCalls';
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
import { getObjectsFromLocalStorage } from '@/functions/GeneralFunctions';
import AddIcon from './icons/AddIcon';
import TasksComponent from '@/components/tasks/TasksComponent';
import { FloatButton, Form, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import ProjectTasksBoard from '@/components/projects/ProjectDetails/ProjectTasksBoard';
import ModalANTD from '@/components/ANTD/ModalANTD';
import FormButtons from '@/components/ANTD/FormButtons';
import { NotificationError } from '@/functions/Notifications';



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
    const [projectRoute, setProjectRoute] = useState(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showBoard, setShowBoard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const initialData = {
        tasks: {
        },
        columnOrder: ["toDo", "inProgress", "completed", "idle"],
    };
    const [tasksData, setTasksData] = useState();
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
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        const projectData2 = await getAxios(url2, false, false, () => { }, pathname);
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
        ;
        ;
        const url2 = `${process.env.DIGITALOCEAN}/project/todo-project/${item?.id}/`;
        const projectData2 = await patchAxios(url2, {
            "checked": e,
        }, true, true, () => { });
        getProjectTodos()
    }

    useEffect(() => {
        if (router.query.project) {
            setProjectId(router.query.project)
            if (typeof window !== 'undefined') {
                setProjectObj(JSON.parse(localStorage.getItem('project')))
            }
            setProjectCurrency(getObjectsFromLocalStorage("companyPreferences")?.currency)

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

    const handleShowBoard = () => {
        setProjectRoute(
            {
                title: <div className='flex justify-center items-center gap-x-1 '><p>Tasks Board</p></div>,
            },
        )
        setShowBoard(true)
    }
    const handleHideBoard = () => {
        setProjectRoute(null)
        setShowBoard(false)
    }

    const getTasks = async () => {
        let companyTasks = await getAxios(`${process.env.DIGITALOCEAN}/tasks/active-tasks/?project=${projectId}`, false, false)
        setTasksData(companyTasks)
    }
    useEffect(() => {
        if (projectId) {
            getTasks()
        }

    }, [showBoard])

    useEffect(() => {

        for (let i = 0; i < tasksData?.length; i++) {
            tasksData[i].start = new Date(tasksData[i]?.start)
            tasksData[i].end = new Date(tasksData[i]?.end)
        }
    }, [tasksData])

    const [form] = Form.useForm();

    const inviteToProject = async (data) => {
        setIsLoading(true)
        const url = `${process.env.DIGITALOCEAN}/project/project-invite/`;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let isValid = emailRegex.test(data?.email);

        if (isValid) {
            data.projectId = projectId;
            console.log({ data })
            let res = await postAxios(url, data, true, true);
            form.resetFields();
        } else {
            NotificationError("Please enter a valid email address")
        }
        setIsLoading(false)
    }

    return (
        <div className='bg-white dark:bg-[#141414] dark:text-white'>
            <BreadCrumbs
                router={router}
                projectObj={projectObj}
                obj={projectRoute}
                handleHideBoard={handleHideBoard}
            />
            {!showBoard ? <>
                <div className='py-5 flex justify-between'>
                    <div>
                        <h1 className='laptop:text-3xl phone:text-sm font-bold'>{projectObj?.projectName}</h1>
                        <p className='text-gray-400  phone:text-sm font-light'>{projectObj?.category}</p>
                    </div>
                    <div className='laptop:text-xl font-light phone:text-sm '>
                        <p>
                            Project Total: {" "}
                            <span className='font-bold laptop:text-xl phone:text-sm'>
                                {projectDetails ? projectCurrency : ""} {projectDetails?.jobTotal ? parseFloat(projectDetails?.jobTotal).toFixed(2) : 0}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='grid laptop:grid-cols-[1fr_3fr_1fr] gap-4'>
                    <div className='laptop:block phone:hidden'>
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
                        <div className='laptop:hidden phone:block phone:mt-4'>
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
                        <ProjectTasksBoard
                            handleShowBoard={handleShowBoard}
                        />
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

                <ModalANTD
                    title="Invite a user to this project"
                    footer={null}
                    isModalOpen={showInviteModal}
                    handleOk={() => { setShowInviteModal(false) }}
                    handleCancel={() => { setShowInviteModal(false) }}
                    renderComponent={
                        <div>
                            <Form
                                layout="vertical"
                                form={form}
                                onFinish={inviteToProject}
                            >
                                <div className="flex gap-x-1 w-full justify-start">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input an email!',
                                            },
                                        ]}
                                        className='w-full m-0'
                                    >
                                        <Input type="email" name="email" id="email" size='large' placeholder='Enter an E-mail address to invite' />
                                    </Form.Item>
                                    <Form.Item>
                                        <FormButtons content="Invite" isLoading={isLoading} />
                                    </Form.Item>
                                </div>
                            </Form>
                            <p className='text-xs font-light text-gray-400'>By inviting a user, you are granting him access for 30 days to your project tasks, checklist, additional documents, shared documents, client notes, and internal notes.</p>

                        </div>
                    }
                />


                <FloatButton
                    icon={<UserAddOutlined />}
                    type="primary"
                    title="Invite a user to this project"
                    style={{
                        right: 24,
                        bottom: 24,
                    }}
                    onClick={() => { setShowInviteModal(true) }}
                />

            </> :
                <TasksComponent companyTasks={tasksData} initialData={initialData} projectId={projectId} />
            }
        </div>

    );
};