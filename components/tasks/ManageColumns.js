import React, { useState, useEffect } from 'react'
import { getAxiosServer, getAxios, postAxios } from "@/functions/ApiCalls";
import { Input, InputNumber, Form } from "antd";
import FormButtons from "@/components/ANTD/FormButtons"
import dynamic from 'next/dynamic';
import Loading from '../Loading/Loading';
import { useRouter } from 'next/router';
import SortableTable from './SortableTable';
import { ArrowLeftOutlined } from '@ant-design/icons';
const ManageColumnsForm = dynamic(() => import("./ManageColumnsForm"), {
  loading: () => <Loading />,
});
export default function ManageColumns({ handleNotifyTeam }) {
  const [columns, setColumns] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(true);
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
        { label: item?.columnName, value: item?.columnName }
      )
    })
    setStatuses(status)
  }

  const onFinish = async (values) => {
    setIsLoading(true)
    let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/`
    await postAxios(url, values, true, true, () => { }, true)
    handleNotifyTeam()
    setIsLoading(false)
    router.reload()
  }


  return (
    <>
      {showTable && <SortableTable columnsData={columns} handleNotifyTeam={handleNotifyTeam} setShowTable={setShowTable} statuses={statuses} />}
      {!showTable && <Form
        form={columnForm}
        layout="vertical"
        onFinish={onFinish}
      >
        <div onClick={() => setShowTable(true)} className='hover:cursor-pointer py-2 px-4 bg-[#282828] rounded-lg flex justify-center items-center gap-x-3 mb-3'><ArrowLeftOutlined />Go back</div>
        <Form.Item label="Column name" name="columnName">
          <Input size="large" placeholder='Column name i.e. QA Testing' />
        </Form.Item>
        <div className="flex justify-end items-center gap-3">
          <FormButtons content={"Add column"} isLoading={isLoading} />
        </div>
      </Form>}
    </>
  )
}
