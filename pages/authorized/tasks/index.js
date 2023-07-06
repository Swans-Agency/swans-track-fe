import React from 'react';
import TasksComponent from '@/components/tasks/TasksComponent';
import TasksHeader from '@/components/tasks/TasksHeader';


export default function index() {
    return (
        <>
            <TasksHeader />
            <TasksComponent />
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"]
    let userPermission = ctx.req.cookies["userPermission"]
    let userId = ctx.req.cookies["userId"]
    try {
        if (accessToken) {

        } else {
            return {
                redirect: {
                    destination: '/401',
                    permanent: false,
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    return { props: { accessToken, userPermission, userId } };
};