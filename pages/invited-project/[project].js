
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Calendly/Navbar';
import TasksComponent from '@/components/tasks/TasksComponent';
import { useRouter } from 'next/router';
import ClientNotes from '@/components/projects/ProjectDetails/ClientNotes';
import InternalNote from '@/components/projects/ProjectDetails/InternalNote';
import ProjectTasksBoard from '@/components/projects/ProjectDetails/ProjectTasksBoard';
import ProjectTodo from '@/components/projects/ProjectDetails/ProjectTodo';
import AdditionalDocs from '@/components/projects/ProjectDetails/AdditionalDocs';
import SharedDocuments from '@/components/projects/ProjectDetails/SharedDocuments';
import { getAxios, patchAxios, postAxios } from '@/functions/ApiCalls';
import InvitedBreadCrumbs from '@/components/projects/ProjectDetails/InvitedBreadCrumbs';
import { Form, Input } from 'antd';
import Image from 'next/image';
import FormButtons from '@/components/ANTD/FormButtons';
import cookie from "react-cookies";
import axios from 'axios';
import { NotificationError, NotificationLoading, NotificationSuccess } from '@/functions/Notifications';

export default function Invitedproject() {
    const [projectId, setProjectId] = useState(null);
    const [projectObj, setProjectObj] = useState({});
    const [clientJobNotes, setClientJobNotes] = useState([]);
    const [internalJobNotes, setInternalJobNotes] = useState([]);
    const [projectTodo, setProjectTodo] = useState([]);
    const [projectAdditionalDocs, setProjectAdditionalDocs] = useState([]);
    const [projectSharedDocs, setProjectSharedDocs] = useState([]);
    const [projectRoute, setProjectRoute] = useState(null);
    const [showBoard, setShowBoard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const initialData = {
        tasks: {
        },
        columnOrder: ["toDo", "inProgress", "completed", "idle"],
    };
    const [tasksData, setTasksData] = useState();
    const router = useRouter();
    const [form] = Form.useForm();

    const getCProjectInfo = async () => {
        const url = `${process.env.DIGITALOCEAN}/project/project-info/${router.query.project}/`;
        const projectData = await getAxios(url, false, false, () => { }, true);
        setProjectObj(projectData);
    };

    const getClientNotes = async () => {
        const url = `${process.env.DIGITALOCEAN}/project/client-notes-project/${router.query.project}/`;
        const projectData = await getAxios(url, false, false, () => { }, true);
        setClientJobNotes(projectData);
    };

    const getInternalNotes = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/internal-notes-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { }, true);
        setInternalJobNotes(projectData2);
    };

    const getProjectTodos = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/todo-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { }, true);
        setProjectTodo(projectData2);
    };

    const getProjectAdditionalDocs = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/additional-docs-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { }, true);
        setProjectAdditionalDocs(projectData2);
    };

    const getProjectSharedDocs = async () => {
        const url2 = `${process.env.DIGITALOCEAN}/project/shared-docs-project/${router.query.project}/`;
        const projectData2 = await getAxios(url2, false, false, () => { }, true);
        setProjectSharedDocs(projectData2);
    };

    const handleChangeEdit = async (e, item) => {
        const url2 = `${process.env.DIGITALOCEAN}/project/todo-project/${item?.id}/`;
        const projectData2 = await patchAxios(url2, {
            "checked": e,
        }, true, true, () => { }, true);
        getProjectTodos()
    }

    const handleShowBoard = () => {
        setProjectRoute(
            {
                title: <div className='flex justify-center items-center gap-x-1 '><p>Tasks Board</p></div>,
            },
        )
        setShowBoard(true)
    }

    const getTasks = async () => {
        let companyTasks = await getAxios(`${process.env.DIGITALOCEAN}/tasks/active-tasks/?project=${projectId}`, false, false, ()=>{}, true)
        setTasksData(companyTasks)
    }

    const handleHideBoard = () => {
        setProjectRoute(null)
        setShowBoard(false)
    }

    const logInInvited = (values) => {
        setIsLoading(true)
        NotificationLoading()
        let url = `${process.env.DIGITALOCEAN}/project/project-invited-validate/`;
        values.projectId = router.query.project

        axios.post(url, values).then(
            (res) => {
                setIsAuth(true)
                cookie.save("invited-email", res?.data?.email, {
                    path: "/",
                });
                cookie.save("invited-project", res?.data?.projectId, {
                    path: "/",
                });
                NotificationSuccess()
            }
        ).catch(
            (err) => {
                setIsAuth(false)
                NotificationError("Invalid email or password, or perhaps you don't have permission to access this project. Contact your project manager for more information.")
            }
        ).finally(
            () => {
                setIsLoading(false)
            }
        )
    }

    useEffect(() => {
        if (router.query.project) {
            setProjectId(router.query.project)
            if (isAuth) {
                getCProjectInfo();
                getClientNotes();
                getInternalNotes();
                getProjectTodos();
                getProjectAdditionalDocs();
                getProjectSharedDocs();
            }
        }
    }, [router.query.project, isAuth]);

    useEffect(() => {
        if (router.query.project) {
            let invitedEmail = cookie.load("invited-email", { path: "/" });
            let invitedProjectId = cookie.load("invited-project", { path: "/" });
            if (invitedEmail && invitedProjectId) {
                setIsAuth(true)
            }
        }
    }, [router.query.project])

    useEffect(() => {
        if (projectId) {
            if (isAuth) {
                getTasks()
            }
        }
    }, [showBoard, isAuth])

    useEffect(() => {
        for (let i = 0; i < tasksData?.length; i++) {
            tasksData[i].start = new Date(tasksData[i]?.start)
            tasksData[i].end = new Date(tasksData[i]?.end)
        }
    }, [tasksData, isAuth])

    return (
        <>
            {isAuth ? <>
                <Navbar content='Sign Up' />
                <div className='px-[9.5rem] py-[2rem] text-white'>
                    <InvitedBreadCrumbs
                        router={router}
                        projectObj={projectObj}
                        obj={projectRoute}
                        handleHideBoard={handleHideBoard}
                    />
                    {!showBoard ? <>
                        <div className='pb-5 flex justify-start'>
                            <div>
                                <h1 className='laptop:text-3xl phone:text-sm font-bold'>{projectObj?.projectName}</h1>
                                <p className='text-gray-400  phone:text-sm font-light'>{projectObj?.category}</p>
                            </div>
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
                            <ClientNotes
                                clientJobNotes={clientJobNotes}
                            />
                            <InternalNote
                                internalJobNotes={internalJobNotes}
                                projectId={projectId}
                                getInternalNotes={getInternalNotes}
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



                    </> :
                        <div className='pt-[1rem]'>
                            <TasksComponent companyTasks={tasksData} initialData={initialData} projectId={projectId} />
                        </div>
                    }
                </div>
            </> :
                <div className='py-[3rem] flex justify-center w-full'>
                    <div className='min-w-[400px]'>

                        <Form
                            form={form}
                            onFinish={logInInvited}
                            layout="vertical"
                        >
                            <Image
                                src='/LogoWhite.svg'
                                width={150}
                                height={150}
                                className='mx-auto'
                            />
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input
                                    placeholder="Enter your email"
                                    name='email'
                                    size='large'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    name='password'
                                    size='large'
                                />
                            </Form.Item>
                            <Form.Item>
                                <FormButtons
                                    content={'Sign In'}
                                    classNames='w-full py-[0.55rem]'
                                    isLoading={isLoading}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            }

        </>

    );
};