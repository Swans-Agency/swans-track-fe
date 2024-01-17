import React, { useState, useEffect } from 'react'
import { getAxiosServer, getAxios, postAxios } from "@/functions/ApiCalls";
import { Input, InputNumber, Form } from "antd";
import FormButtons from "@/components/ANTD/FormButtons"
import dynamic from 'next/dynamic';
import Loading from '../Loading/Loading';
import { useRouter } from 'next/router';
const ManageColumnsForm = dynamic(() => import("./ManageColumnsForm"), {
  loading: () => <Loading />,
});
export default function ManageColumns({ handleNotifyTeam }) {
  const [columns, setColumns] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [columnForm] = Form.useForm();
  const router = useRouter()
  useEffect(() => {
    getColumns()
  }, [])

  const getColumns = async () => {
    setStatuses([])
    setColumns([])
    let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/`
    let data = await getAxios(url, false, false, (data) => { setColumns(data) }, false)
    let status = data?.map((item) => {
      return (
        {label: item?.columnName, value: item?.columnName}
      )
    })
    setStatuses(status)
  }

  const onFinish = async (values) => {
    setIsLoading(true)
    let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/`
    await postAxios(url, values, true, true, () => { }, true)
    handleNotifyTeam()
    // getColumns()
    // columnForm.resetFields()
    setIsLoading(false)
    router.reload()
  }
  
  
  return (
    <>
      {
        columns?.map((column) => {
          return (
            <>
              <ManageColumnsForm column={column} statuses={statuses} />
            </>
          )
        }) 
      }
      <Form
        form={columnForm}
        layout="vertical"
        className="border rounded-lg border-[#282828] mb-3 p-3"
        onFinish={onFinish}
      >
        <Form.Item label="Column name" name="columnName">
          <Input size="large" placeholder='Column name i.e. QA Testing' />
        </Form.Item>
        <Form.Item label="Column index" name="index">
          <InputNumber className="w-full" size="large" min={0} placeholder='0' />
        </Form.Item>
        <div className="flex justify-end items-center gap-3">
          
          <FormButtons content={"Add column"} isLoading={isLoading} />
        </div>
      </Form>
    </>
  )
}
