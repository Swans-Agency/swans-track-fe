import { redirect } from "@/functions/GeneralFunctions";
import { Result } from "antd";


export default function UnauthorizedPage() {

    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<button className='border rounded-lg text-lg py-1 px-2 bg-sidebarbg hover:bg-secondbg text-mainbg' onClick={() => { redirect('/') }}>
                    Back Home
                </button>}
            />
        </>
    )
}