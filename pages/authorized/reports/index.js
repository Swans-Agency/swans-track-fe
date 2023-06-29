import React from 'react';
import IndexReport from '@/components/Reports/IndexReport';


export default function index() {
    return (
        <IndexReport />
    );
};
export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"]
    let userPermission = ctx.req.cookies["userPermission"]

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
    return { props: { accessToken, userPermission } };
};