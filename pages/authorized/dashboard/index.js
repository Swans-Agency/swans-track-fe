import React from 'react';


export default function index() {
  return (
    <div>dashboard</div>

  );
};


export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"]
  let userPermission = ctx.req.cookies["userPermission"]
  let isConnected = null
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
    console.log({ e });
  }
  return { props: { accessToken, userPermission, isConnected } };
};