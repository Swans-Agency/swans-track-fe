
import Calendar from '@/components/Calendar/Calendar';
import { getAxiosServer } from '@/functions/ApiCalls';
import React, { useEffect } from 'react';


export default function index({ isConnected }) {

    return (
        <Calendar
            isConnected={isConnected}
        />
    );
};

export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"]
    let userPermission = ctx.req.cookies["userPermission"]
    let isConnected = null
    try {
        if (accessToken) {
            isConnected = await getAxiosServer(`${process.env.DIGITALOCEAN}/tasks/check-google/`, accessToken, false)
        } else {
            return {
                redirect: {
                    destination: '/401',
                    permanent: false,
                }
            }
        }
    } catch (e) {
        console.log({ e });
    }
    return { props: { accessToken, userPermission, isConnected } };
};